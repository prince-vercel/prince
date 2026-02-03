/* eslint-disable @typescript-eslint/no-explicit-any */


import React, { useState, useRef, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { ChatbotStep } from '../../../types/types';
import styles from '../../../styles/admin.module.css'
import LanguageSelector from '../../LanguageSelector'
import { getCollectionName } from '../../../lib/localization'



const ContentAdmin: React.FC = () => {
  // Sayfa açıldığında Firestore'dan soruları çek

  const [selectedLanguage, setSelectedLanguage] = useState<'tr' | 'en' | 'fr' | 'es' | 'ar' | 'ru'>('tr');
  const [questions, setQuestions] = useState<ChatbotStep[]>([]);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set())
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    import('firebase/firestore').then(({ collection, getDocs }) => {
      getDocs(collection(db, getCollectionName('travelchatbotQuestions', selectedLanguage)))
        .then(snapshot => {
          const data = snapshot.docs.map(docSnap => {
            const d = docSnap.data();
            return {
              id: typeof d.id === 'string' ? d.id : '',
              text: typeof d.text === 'string' ? d.text : '',
              options: Array.isArray(d.options) ? d.options : [],
              redirect: d.redirect && typeof d.redirect === 'object' ? d.redirect : undefined
            };
          });
          setQuestions(data);
          // Tüm soruları genişlet
          setExpandedQuestions(new Set(data.map((_, idx) => idx)));
        })
        .catch(() => {
          setQuestions([]);
          setExpandedQuestions(new Set());
        });
    });
  }, [selectedLanguage]);
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
        if (q.redirect && typeof q.redirect !== 'object') {
          setImportError('JSON formatı hatalı: redirect alanı obje olmalı.');
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
    const newIndex = questions.length
    setQuestions([
      ...questions,
      { id: generateId(), text: '', options: [{ label: '', next: '' }], redirect: undefined }
    ])
    setExpandedQuestions(prev => new Set(prev).add(newIndex))
    // Scroll to bottom
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100)
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

  // Update redirect
  const handleRedirectChange = (qIdx: number, field: 'type' | 'value', value: string) => {
    const updated = [...questions];
    if (!updated[qIdx].redirect) {
      updated[qIdx].redirect = { type: 'url', value: '' };
    }
    if (field === 'type') {
      updated[qIdx].redirect!.type = value as 'route' | 'whatsapp' | 'instagram' | 'url';
    } else {
      updated[qIdx].redirect!.value = value;
    }
    setQuestions(updated);
  };

  // Remove redirect
  const handleRemoveRedirect = (qIdx: number) => {
    const updated = [...questions];
    updated[qIdx].redirect = undefined;
    setQuestions(updated);
  };

  // Toggle question expansion
  const toggleQuestionExpansion = (idx: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(idx)) {
      newExpanded.delete(idx);
    } else {
      newExpanded.add(idx);
    }
    setExpandedQuestions(newExpanded);
  };

  // Save questions to Firestore
  const handleSave = async () => {
    setSaving(true)
    try {
      // Validation
      for (const q of questions) {
        if (!q.id || !q.text) {
          alert('Boş ID veya soru metni var')
          return
        }
      }

      const ids = questions.map(q => q.id)
      if (new Set(ids).size !== ids.length) {
        alert('Aynı ID birden fazla var')
        return
      }

      for (const q of questions) {
        for (const opt of q.options || []) {
          if (!opt.label || !opt.next) {
            alert('Boş seçenek alanı var')
            return
          }
          if (!questions.some(x => x.id === opt.next)) {
            alert(`Geçersiz next ID: ${opt.next}`)
            return
          }
        }
      }

      const collectionName = getCollectionName('travelchatbotQuestions', selectedLanguage)
      await Promise.all(
        questions.map(q => {
          const dataToSave = { ...q };
          if (dataToSave.redirect === undefined) {
            delete dataToSave.redirect;
          }
          return setDoc(doc(db, collectionName, q.id), dataToSave);
        })
      );
      alert('Kaydedildi');
    } finally {
      setSaving(false)
    }
  };

  // Download current questions as JSON
  const handleExport = () => {
    const dataStr = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', 'travelchatbotQuestions.json');
    dlAnchor.click();
  };

  return (
    <div className={styles.adminChatbotBox}>
      <h2 className={styles.adminChatbotTitle} style={{color:'#d7b76e'}}>Chatbot Soruları Yönetimi</h2>
      <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={(lang) => {
        setSelectedLanguage(lang);
        // Reload questions
        import('firebase/firestore').then(({ collection, getDocs }) => {
          getDocs(collection(db, getCollectionName('travelchatbotQuestions', lang)))
            .then(snapshot => {
              const data = snapshot.docs.map(docSnap => {
                const d = docSnap.data();
                return {
                  id: typeof d.id === 'string' ? d.id : '',
                  text: typeof d.text === 'string' ? d.text : '',
                  options: Array.isArray(d.options) ? d.options : [],
                  redirect: d.redirect && typeof d.redirect === 'object' ? d.redirect : undefined
                };
              });
              setQuestions(data);
              // Reload expanded
              setExpandedQuestions(new Set(data.map((_, idx) => idx)));
            })
            .catch(() => {
              setQuestions([]);
              setExpandedQuestions(new Set());
            });
        });
      }} />
        <div style={{marginBottom: 20, padding: 16, background: '#f0f5fa8d', borderRadius: 8, border: '1px solid #f0f5fa'}}>
        <h3 style={{margin: 0, color: '#000', fontSize: 16}}>Hızlı Başlangıç Rehberi</h3>
        <ol style={{marginTop: 8, paddingLeft: 20, color: '#000'}}>
          <li><b>Dil Seçin:</b> Üstteki dil seçiciden chatbot&apos;un dilini belirleyin.</li>
          <li><b>Soru Ekleyin:</b> &quot;Yeni Soru Ekle&quot; butonuna tıklayarak yeni bir adım oluşturun.</li>
          <li><b>Adım ID&apos;sini Ayarlayın:</b> Her adım için benzersiz bir ID girin (örn: start, adim1).</li>
          <li><b>Soru Metnini Yazın:</b> Kullanıcıya gösterilecek soruyu girin.</li>
          <li><b>Seçenekler Ekleyin:</b> Her seçenek için buton metni ve sonraki adım ID&apos;sini belirtin.</li>
          <li><b>Yönlendirme Ekleyin (İsteğe Bağlı):</b> Sohbet bittiğinde kullanıcıyı yönlendirmek için.</li>
          <li><b>Kaydedin:</b> Değişiklikleri Firestore&apos;a kaydetmek için &quot;Kaydet&quot; butonuna tıklayın.</li>
        </ol>
        <p style={{marginTop: 8, fontSize: 14, color: '#666'}}>İpucu: &quot;start&quot; ID&apos;li adım sohbetin başlangıç noktasıdır. Tüm ID&apos;ler eşsiz olmalı ve seçeneklerdeki &quot;Sonraki adım ID&quot; ile eşleşmelidir.</p>
      </div>
      <div style={{marginBottom: 16, color: '#000', fontSize: 15}}>
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
          [...questions].map((q, originalIdx) => ({ q, originalIdx })).sort((a, b) => {
            if (a.q.id === 'start') return -1;
            if (b.q.id === 'start') return 1;
            return a.q.id.localeCompare(b.q.id);
          }).map(({ q, originalIdx }) => (
            <div key={originalIdx} className={styles.adminChatbotItem}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', borderRadius: 8, padding: 8, marginBottom: 4, background: '#f0f0f0' }}>
                <div style={{ width: 140 }}>
                  <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 2 }}>Adım ID</label>
                  <input
                    className={`${styles.adminChatbotId} ${styles.adminInputCustom}`}
                    value={q.id}
                    placeholder="örn: start"
                    onChange={e => handleQuestionChange(originalIdx, 'id', e.target.value)}
                    style={{ fontWeight: 600, color: '#d7b76e' }}
                    title="Bu adımın benzersiz anahtarı."
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 2 }}>Soru Metni</label>
                  <input
                    className={`${styles.adminChatbotText} ${styles.adminInputCustom}`}
                    value={q.text}
                    placeholder="Kullanıcıya gösterilecek metin"
                    onChange={e => handleQuestionChange(originalIdx, 'text', e.target.value)}
                    title="Kullanıcıya gösterilecek metin."
                    style={{ minWidth: '400px' }}
                  />
                </div>
                <button className={styles.adminChatbotBtn} onClick={() => toggleQuestionExpansion(originalIdx)} style={{backgroundColor:'#d7b76e', marginRight: 8 }}>
                  {expandedQuestions.has(originalIdx) ? '▲' : '▼'}
                </button>
                <button className={styles.adminChatbotBtn} style={{backgroundColor:'#d7b76e'}} onClick={() => handleRemoveQuestion(originalIdx)} title="Soruyu Sil">Sil</button>
              </div>
              {expandedQuestions.has(originalIdx) && (
                <>
                  <div style={{ marginLeft: 12, marginTop: 6, background: '#f9f9fb', borderRadius: 6, padding: 8 }}>
                    <b>Seçenekler (Butonlar):</b>
                    <ul className={styles.adminChatbotOptions}>
                      {q.options && q.options.length > 0 ? (
                        q.options.map((opt, oIdx) => (
                          <li key={oIdx} style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
                            <div style={{ width: 140 }}>
                              <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 2 }}>Buton Metni</label>
                              <input
                                className={styles.adminInputCustom}
                                value={opt.label}
                                placeholder="örn: Evet"
                                onChange={e => handleOptionChange(originalIdx, oIdx, 'label', e.target.value)}
                                title="Butonun üstünde gözükecek metin."
                              />
                            </div>
                            <div style={{ width: 140 }}>
                              <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 2 }}>Sonraki Adım ID</label>
                              <select
                                className={styles.adminInputCustom}
                                value={opt.next}
                                onChange={e => handleOptionChange(originalIdx, oIdx, 'next', e.target.value)}
                              >
                                <option value="">Adım seç</option>
                                {[...questions].sort((a, b) => a.id.localeCompare(b.id)).map(q => (
                                  <option key={q.id} value={q.id}>{q.id}</option>
                                ))}
                              </select>
                            </div>
                            <button className={styles.adminChatbotBtn} onClick={() => handleRemoveOption(originalIdx, oIdx)} title="Seçeneği Sil" style={{ backgroundColor:'#d7b76e',marginTop: 18 }}>Sil</button>
                          </li>
                        ))
                      ) : (
                        <li style={{ color: '#888' }}>Henüz seçenek eklenmemiş.</li>
                      )}
                    </ul>
                    <button className={styles.adminChatbotBtn} onClick={() => handleAddOption(originalIdx)} style={{backgroundColor:'#d7b76e', marginTop: 4 }}>Seçenek Ekle</button>
                    <div style={{ color: '#888', fontSize: 13, marginTop: 2 }}>Her seçenek için buton metni ve sonraki adım ID&apos;sini belirtin.</div>
                  </div>
                  <div style={{ marginLeft: 12, marginTop: 6, background: '#f0f0f0', borderRadius: 6, padding: 8 }}>
                    <b>Yönlendirme (İsteğe Bağlı):</b>
                    {q.redirect ? (
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 4 }}>
                        <select
                          className={styles.adminInputCustom}
                          value={q.redirect.type}
                          onChange={e => handleRedirectChange(originalIdx, 'type', e.target.value)}
                          style={{ width: 120 }}
                          title="Yönlendirme türünü seçin"
                        >
                          <option value="route">Sayfa Route</option>
                          <option value="whatsapp">WhatsApp</option>
                          <option value="instagram">Instagram</option>
                          <option value="url">URL</option>
                        </select>
                        <input
                          className={styles.adminInputCustom}
                          value={q.redirect.value}
                          placeholder="Yönlendirme değeri girin"
                          onChange={e => handleRedirectChange(originalIdx, 'value', e.target.value)}
                          style={{ flex: 1 }}
                          title="Seçilen türe göre değer girin"
                        />
                        <button className={styles.adminChatbotBtn}  style={{backgroundColor:'#d7b76e'}} onClick={() => handleRemoveRedirect(originalIdx)} title="Yönlendirmeyi Sil">Sil</button>
                      </div>
                    ) : (
                      <button className={styles.adminChatbotBtn} onClick={() => handleRedirectChange(originalIdx, 'type', 'url')} style={{ backgroundColor:'#d7b76e',marginTop: 4 }}>Yönlendirme Ekle</button>
                    )}
                    <div style={{ color: '#888', fontSize: 13, marginTop: 2 }}>Bu adımda sohbet bittiğinde yönlendirme butonu göster.</div>
                    <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>
                      <b>Route:</b> İç sayfa yolu (örn: /contact)<br/>
                      <b>WhatsApp:</b> Telefon numarası (örn: 905457709777)<br/>
                      <b>Instagram:</b> Kullanıcı adı (örn: @princemedical.tr)<br/>
                      <b>URL:</b> Tam web adresi (örn: https://example.com)
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div>Henüz soru yok.</div>
        )}
      </div>
      <div style={{ display: 'flex', marginTop: 16 }}>
        <button className={styles.adminChatbotBtn} onClick={handleAddQuestion} style={{ backgroundColor:'#d7b76e' }}>Yeni Soru Ekle</button>
        <div style={{ flex: 1 }}></div>
        <button className={styles.adminChatbotBtn} style={{ backgroundColor:'#d7b76e' }} onClick={handleSave} disabled={saving}>
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>

      <div style={{marginTop: 18, color: '#888', fontSize: 13}}>
        <b>İpucu:</b> <br/>
        <span>&quot;start&quot; ID&apos;li bir adım varsa sohbet bu adımla başlar. <br/>Her adımın ID&apos;si eşsiz olmalı ve seçeneklerdeki &quot;Sonraki adım ID&quot; ile eşleşmelidir.</span>
      </div>
    </div>
  );
};

export default ContentAdmin;
