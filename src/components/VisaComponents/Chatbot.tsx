import React, { useEffect, useState } from 'react';

import { db } from '@/src/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useSafeTranslation } from '../../hooks/useSafeTranslation';
import { getCollectionName } from '../../lib/localization';
import '../../i18n';

interface ChatStep {
    id: string;
    text: string;
    options?: { label: string; next: string }[];
}

const Chatbot: React.FC = () => {
    const { t, isReady, i18n } = useSafeTranslation();
    const [questions, setQuestions] = useState<ChatStep[]>([]);
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState<string[]>(['start']);

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            const lang = (i18n.language || 'tr') as any;
            const collectionName = getCollectionName('visachatbotQuestions', lang);
            console.log('Fetching from collection:', collectionName);
            const snapshot = await getDocs(collection(db, collectionName));
            console.log('Snapshot docs:', snapshot.docs.length);
            const data: ChatStep[] = snapshot.docs.map(doc => {
                console.log('Doc data:', doc.data());
                return doc.data() as ChatStep;
            });
            console.log('Questions data:', data);
            setQuestions(data);
            setLoading(false);
        };
        fetchQuestions();
    }, [i18n.language]);

    const currentStep = questions.find(q => q.id === history[history.length - 1]);

    const handleOption = (next: string) => {
        setHistory([...history, next]);
    };

    if (loading) {
        return (
            <div className="visa-chatbotBox">
                <div className="visa-chatWindow" suppressHydrationWarning>
                    {isReady ? t('visa.homePage.chatbot.loading') : ''}
                </div>
            </div>
        );
    }

    return (
        <div className="visa-chatbotBox">
            <div className="visa-chatWindow">
                {history.map((stepId, idx) => {
                    const step = questions.find(q => q.id === stepId);
                    if (!step) return null;
                    return (
                        <div key={stepId + idx} className="visa-chatMessage">
                            <div className="visa-bot">{step.text}</div>
                            {idx === history.length - 1 && step.options && (
                                <div className="visa-options">
                                    {step.options.map(opt => (
                                        <button key={opt.next} onClick={() => handleOption(opt.next)} className="visa-optionBtn">
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
