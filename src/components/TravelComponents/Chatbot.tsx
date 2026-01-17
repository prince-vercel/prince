/* eslint-disable react-hooks/immutability */
import { db } from '@/src/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

interface ChatStep {
  id: string;
  text: string;
  options?: { label: string; next: string }[];
  redirect?: {
    type: 'route' | 'whatsapp' | 'instagram' | 'url';
    value: string;
  };
}

const Chatbot: React.FC = () => {
  const [questions, setQuestions] = useState<ChatStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<string[]>(['start']);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const snapshot = await getDocs(collection(db, 'travelchatbotQuestions'));
      const data: ChatStep[] = snapshot.docs.map(doc => doc.data() as ChatStep);
      setQuestions(data);
      setLoading(false);
    };
    fetchQuestions();
  }, []);

  const currentStep = questions.find(q => q.id === history[history.length - 1]);

  const handleOption = (next: string) => {
    setHistory([...history, next]);
  };

  const handleRedirect = (redirect: { type: string; value: string }) => {
    if (redirect.type === 'route') {
      window.location.href = redirect.value;
    } else if (redirect.type === 'whatsapp') {
      window.open(`https://wa.me/${redirect.value}`, '_blank');
    } else if (redirect.type === 'instagram') {
      window.open(`https://instagram.com/${redirect.value}`, '_blank');
    } else if (redirect.type === 'url') {
      window.open(redirect.value, '_blank');
    }
  };

  if (loading) {
    return <div className="chatbotBox"><div className="chatWindow">Yükleniyor...</div></div>;
  }

  return (
    <div className="chatbotBox">
      <div className="chatWindow">
        {history.map((stepId, idx) => {
          const step = questions.find(q => q.id === stepId);
          if (!step) return null;
          return (
            <div key={stepId + idx} className="chatMessage">
              <div className="bot">{step.text}</div>
              {idx === history.length - 1 && (step.options || step.redirect) && (
                <div className="options">
                  {step.options && step.options.map(opt => (
                    <button key={opt.next} style={{ backgroundColor: '#d7b76e' }} onClick={() => handleOption(opt.next)} className="optionBtn">
                      {opt.label}
                    </button>
                  ))}
                  {step.redirect && (
 <button
                        onClick={() => step.redirect && handleRedirect(step.redirect)}
                        className="optionBtn redirectBtn"
                        style={{ backgroundColor: '#d7b76e' }}
                      >                     <i className="bi bi-arrow-right"></i>
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chatbot;
