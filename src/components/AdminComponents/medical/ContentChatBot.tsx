/* eslint-disable @typescript-eslint/no-explicit-any */


import React, { useState, useRef, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { ChatbotStep } from '../../../types/types';
import styles from '../../../styles/admin.module.css'



const ContentAdmin: React.FC = () => {
  // Sayfa açıldığında Firestore'dan soruları çek
  useEffect(() => {
    import('firebase/firestore').then(({ collection, getDocs }) => {
      getDocs(collection(db, 'medicalchatbotQuestions'))
        .then(snapshot => {
          const data = snapshot.docs.map(docSnap => {
            const d = docSnap.data();
            return {
              id: typeof d.id === 'string' ? d.id : '',
              text: typeof d.text === 'string' ? d.text : '',
              options: Array.isArray(d.options) ? d.options : []
            };
          });
          setQuestions(data);
        })
        .catch(() => setQuestions([]));
    });
  }, [])
  const [questions, setQuestions] = useState<ChatbotStep[]>([]);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Import questions from JSON file
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      let text = await file.text();
      // BOM ve baştaki boşlukları temizle
      text = text.replace(/^\uFEFF/, '').trim();
      const imported = JSON.parse(text);
      if (!Array.isArray(imported)) {
        setImportError('JSON formatı hatalı: Dizi bekleniyor.');
        return;
      }
      for (const q of imported) {
        if (typeof q.id !== 'string' || typeof q.text !== 'string') {
          setImportError('JSON formatı hatalı: Her soruda id ve text alanı olmalı.');
          return;
        }
      }
      setQuestions(imported);
    } catch (err: any) {
      setImportError('Geçersiz JSON dosyası: ' + (err?.message || 'Bilinmeyen hata'));
    }
  };

  // Add new question
  // Benzersiz id üretici
  const generateId = () => {
    const base = 'adim';
    let i = 1;
    while (questions.some(q => q.id === `${base}${i}`)) i++;
    return `${base}${i}`;
  };

  // Yeni soru ekle
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { id: generateId(), text: '', options: [{ label: '', next: '' }] }
    ]);
  };

  // Update a question
  const handleQuestionChange = (idx: number, field: 'id' | 'text', value: string) => {
    const updated = [...questions];
    updated[idx][field] = value;
    setQuestions(updated);
  };

  // Remove a question
  const handleRemoveQuestion = (idx: number) => {
    const updated = [...questions];
    updated.splice(idx, 1);
    setQuestions(updated);
  };

  // Add option to a question
  const handleAddOption = (qIdx: number) => {
    const updated = [...questions];
    if (!updated[qIdx].options) updated[qIdx].options = [];
    updated[qIdx].options!.push({ label: '', next: '' });
    setQuestions(updated);
  };

  // Update option
  const handleOptionChange = (qIdx: number, oIdx: number, field: 'label' | 'next', value: string) => {
    const updated = [...questions];
    if (!updated[qIdx].options) updated[qIdx].options = [];
    updated[qIdx].options![oIdx][field] = value;
    setQuestions(updated);
  };

  // Remove option
  const handleRemoveOption = (qIdx: number, oIdx: number) => {
    const updated = [...questions];
    if (!updated[qIdx].options) return;
    updated[qIdx].options!.splice(oIdx, 1);
    setQuestions(updated);
  };

  // Save questions to Firestore
  const handleSave = async () => {
    if (!questions.length) return;
    await Promise.all(
      questions.map(q => setDoc(doc(db, 'medicalchatbotQuestions', q.id), q))
    );
    alert('Sorular kaydedildi!');
  };

  // Download current questions as JSON
  const handleExport = () => {
    const dataStr = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', 'medicalchatbotQuestions.json');
    dlAnchor.click();
  };

  return (
    <div className={styles.adminChatbotBox}>
      <h2 className={styles.adminChatbotTitle}>Chatbot Soruları Yönetimi</h2>
      <div style={{marginBottom: 16, color: '#205a8c', fontSize: 15}}>
        <b>Adım ID:</b> Her sorunun benzersiz anahtarıdır. <br/>
        <b>Soru metni:</b> Kullanıcıya gösterilecek metin.<br/>
        <b>Seçenekler:</b> Her butonun metni ve tıklanınca geçilecek adımın ID&apos;si.<br/>
        <span style={{color:'#888'}}>Yeni soru eklediğinizde ID otomatik gelir, isterseniz değiştirebilirsiniz.</span>
      </div>
      <div className={styles.adminChatbotActions}>
        <input
          type="file"
          accept="application/json"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImport}
        />

      </div>
      {importError && <div className={styles.adminChatbotError}>{importError}</div>}
      <div className={styles.adminChatbotList}>
        {Array.isArray(questions) && questions.length > 0 ? (
          questions.map((q, qIdx) => (
            <div key={qIdx} className={styles.adminChatbotItem}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', borderRadius: 8, padding: 8, marginBottom: 4 }}>
                <input
                  className={styles.adminChatbotId}
                  value={q.id}
                  placeholder="Benzersiz adım ID (örn: start, adim1)"
                  onChange={e => handleQuestionChange(qIdx, 'id', e.target.value)}
                  style={{ width: 140, fontWeight: 600, color: '#205a8c' }}
                  title="Bu adımın benzersiz anahtarı."
                />
                <input
                  className={styles.adminChatbotText}
                  value={q.text}
                  placeholder="Kullanıcıya gösterilecek soru/metin"
                  onChange={e => handleQuestionChange(qIdx, 'text', e.target.value)}
                  style={{ flex: 1 }}
                  title="Kullanıcıya gösterilecek metin."
                />
                <button className={styles.adminChatbotBtn} onClick={() => handleRemoveQuestion(qIdx)} title="Soruyu Sil">Sil</button>
              </div>
              <div style={{ marginLeft: 12, marginTop: 6, background: '#f9f9fb', borderRadius: 6, padding: 8 }}>
                <b>Seçenekler (Butonlar):</b>
                <ul className={styles.adminChatbotOptions}>
                  {q.options && q.options.length > 0 ? (
                    q.options.map((opt, oIdx) => (
                      <li key={oIdx} style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 2 }}>
                        <input
                          value={opt.label}
                          placeholder="Buton metni (örn: Evet, Hayır)"
                          onChange={e => handleOptionChange(qIdx, oIdx, 'label', e.target.value)}
                          style={{ width: 140 }}
                          title="Butonun üstünde gözükecek metin."
                        />
                        <input
                          value={opt.next}
                          placeholder="Sonraki adım ID (örn: adim2)"
                          onChange={e => handleOptionChange(qIdx, oIdx, 'next', e.target.value)}
                          style={{ width: 140 }}
                          title="Tıklanınca geçilecek adımın ID'si."
                        />
                        <button className={styles.adminChatbotBtn} onClick={() => handleRemoveOption(qIdx, oIdx)} title="Seçeneği Sil">Sil</button>
                      </li>
                    ))
                  ) : (
                    <li>Seçenek yok.</li>
                  )}
                </ul>
                <button className={styles.adminChatbotBtn} onClick={() => handleAddOption(qIdx)} style={{ marginTop: 4 }}>Seçenek Ekle</button>
                <div style={{ color: '#888', fontSize: 13, marginTop: 2 }}>Buton metni ve tıklanınca geçilecek adım ID&apos;si girin.</div>
              </div>
            </div>
          ))
        ) : (
          <div>Henüz soru yok. JSON ile içe aktarabilirsiniz.</div>
        )}
      </div>
      <div style={{ display: 'flex', marginTop: 16 }}>
        <button className={styles.adminChatbotBtn} onClick={handleAddQuestion}>Yeni Soru Ekle</button>
        <div style={{ flex: 1 }}></div>
        <button className={styles.adminChatbotBtn} onClick={handleSave}>Kaydet</button>
      </div>

      <div style={{marginTop: 18, color: '#888', fontSize: 13}}>
        <b>İpucu:</b> <br/>
        <span>&quot;start&quot; ID&apos;li bir adım varsa sohbet bu adımla başlar. <br/>Her adımın ID&apos;si eşsiz olmalı ve seçeneklerdeki &quot;Sonraki adım ID&quot; ile eşleşmelidir.</span>
      </div>
    </div>
  );
};

export default ContentAdmin;
