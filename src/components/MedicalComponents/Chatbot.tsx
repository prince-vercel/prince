import React, { useState, useEffect } from 'react';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';

interface ChatStep {
  id: string;
  text: string;
  options?: { label: string; next: string }[];
}

const Chatbot: React.FC = () => {
  const [questions, setQuestions] = useState<ChatStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<string[]>(['start']);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const snapshot = await getDocs(collection(db, 'medicalchatbotQuestions'));
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
              {idx === history.length - 1 && step.options && (
                <div className="options">
                  {step.options.map(opt => (
                    <button key={opt.next} onClick={() => handleOption(opt.next)} className="optionBtn">
                      {opt.label}
                    </button>
                  ))}
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
