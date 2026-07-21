import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, MessageSquare, Sparkles, ChevronRight, Phone, Globe, BookOpen, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const QUICK_ACTIONS = [
    { label: 'IELTS/PTE Coaching', icon: <BookOpen className="w-4 h-4" />, query: 'ielts details' },
    { label: 'UK Study Visa', icon: <Globe className="w-4 h-4" />, query: 'uk scholarship' },
    { label: 'Free Assessment', icon: <GraduationCap className="w-4 h-4" />, query: 'apply now' },
    { label: 'Office Locations', icon: <Phone className="w-4 h-4" />, query: 'contact' },
];

const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Assalam-o-Alaikum! I am your **FTI Smart Guide**, powered by AI. I can provide detailed info on IELTS batches, study visas (UK, USA, Canada, Australia), and university admissions. How can I assist you today?",
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages, isTyping]);

    const getAIResponse = (input: string): string => {
        const q = input.toLowerCase();

        // 1. GREETINGS & SMALL TALK
        if (q.match(/\b(hi|hello|hey|salam|aola|asalam|hi there|yo)\b/)) {
            return "Greetings from **FTI Journey**! I'm here to help you navigate your international education path. Are you looking for information regarding **IELTS/PTE classes** or **Study Visa** options?";
        }

        // 2. IELTS / PTE COACHING
        if (q.includes('ielts') || q.includes('pte') || q.includes('test') || q.includes('english') || q.includes('training')) {
            return "FTI is a **Platinum Partner** of the British Council and IDP. Our coaching program includes:\n\n• **Certified Trainers:** Expert guidance from high-achieving instructors.\n• **Flexible Batches:** Morning (10 AM), Afternoon (2 PM), and Evening (6 PM).\n• **Free Mock Tests:** Regular assessments to track your progress.\n• **IELTS:** Official Cambridge testing materials and same venue testing at our AEO Testing Center.\n• **PTE:** Pearson Registration Center with an AI-powered practice system and fast results.\n\nWould you like to register for a **Free Demo Class**?";
        }

        // 3. STUDY DESTINATIONS - UK
        if (q.includes('uk') || q.includes('london') || q.includes('united kingdom') || q.includes('england')) {
            return "The **United Kingdom** is one of our specialty destinations! \n\nWe represent over **160+ Universities**. Key benefits:\n• 2-Year Post-Study Work Visa.\n• Scholarships up to £5,000.\n• High Visa Success Rate (90%+).\n• Gap accepted up to 10 years for some programs.\n\nDo you want to check the university list for your specific course?";
        }

        // 4. STUDY DESTINATIONS - CANADA
        if (q.includes('canada') || q.includes('toronto') || q.includes('vancouver') || q.includes('sds')) {
            return "Thinking about **Canada**? Excellent choice!\n\n• **Direct SDS Processing:** Faster visa outcomes.\n• **University Partners:** 100+ institutions across all provinces.\n• **Post-Grad Work Permit (PGWP):** Up to 3 years.\n• **PR Options:** High probability through Express Entry.\n\nAre you looking for Masters (PG) or Bachelors (UG) programs?";
        }

        // 5. STUDY DESTINATIONS - AUSTRALIA
        if (q.includes('australia') || q.includes('sydney') || q.includes('melbourne')) {
            return "**Australia** offers top-tier education and a great lifestyle. \n\n• **PSW Visa:** Up to 4 years post-study work rights.\n• **Scholarships:** Up to 50% for high achievers.\n• **Intakes:** February and July are prime.\n\nDo you have your IELTS result (6.0-6.5 required) or are you looking for ELICOS?";
        }

        // 6. STUDY DESTINATIONS - USA
        if (q.includes('usa') || q.includes('america') || q.includes('states') || q.includes('us')) {
            return "The **United States** has the world's most prestigious universities.\n\n• **Funding:** We help you find generous financial aid/scholarships.\n• **Interview Prep:** Personalized mock interviews for F1 Visa.\n• **STEM Extension:** Up to 36 months of OPT.\n\nAre you interested in public state universities or private institutions?";
        }

        // 7. FEES / COST / PAISA
        if (q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('paisa') || q.includes('kharcha')) {
            return "Regarding costs:\n\n1. **IELTS/PTE:** PKR 15,000 - 25,000 (standard vs fast track).\n2. **Consultancy:** Generally **FREE** for our partner universities in UK, Australia, and USA.\n3. **Application Fees:** Vary by university ($50-$150, often waived through us).\n\nWould you like a personalized budget breakdown based on a specific country?";
        }

        // 8. LOCATIONS / OFFICES
        if (q.includes('location') || q.includes('office') || q.includes('where') || q.includes('address') || q.includes('lahore') || q.includes('karachi') || q.includes('islamabad') || q.includes('chatta') || q.includes('gujranwala')) {
            return "**Our Global Offices:**\n\n• **Ali Pur Chatta (Pakistan):** Opposite Faysal Bank, Gujranwala Road.\n• **Gujranwala:** Opposite Punjab College, Near Garden Town, Sialkot Bypass Road.\n• **London (UK):** Barking Enterprise Centre, IG11 8FG.\n• **Other Branches:** Lahore, Karachi, and Islamabad.\n\nWould you like the specific WhatsApp contact for any of these branches?";
        }

        // 9. VISA SUCCESS / STUDENTS GUIDED
        if (q.includes('success') || q.includes('stori') || q.includes('student') || q.includes('count') || q.includes('many')) {
            return "Alhamdulillah, FTI Journey has guided over **11,000+ students** with a remarkable **90% Visa Success Rate**. We are the most trusted name in overseas education in Pakistan. \n\nYou can see our latest visa success stories on the homepage marquee!";
        }

        // 10. CONTACT / PHONE / WHATSAPP
        if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('whatsapp') || q.includes('number')) {
            return "**FTI Contact Directory:**\n\n• **UAN / General:** +92 (0) 3000 4500 25\n• **Ali Pur Chatta:** +92 (0) 309 9111 400\n• **London Office:** +44 74 2995 0775\n• **Emails:** info@fti4success.com / alipur@fti4success.com\n\n**Extra Numbers:** +92 (0)331 744 2732, +92 (0)300 744 2732\n\nWould you like me to connect you with a senior counselor right now?";
        }

        // 11. THANKS
        if (q.includes('thank') || q.includes('shukriya') || q.includes('thx') || q.includes('ok') || q.includes('jazak')) {
            return "You're very welcome! At **FTI Journey**, your success is our mission. Feel free to ask if you have any other questions. Best of luck with your preparations!";
        }

        // 12. FALLBACK (SMART ADAPTIVE)
        return "That's a specific query! I've logged your interest in **'" + input + "'**. \n\nPlease provide your **Phone Number** here, and I'll have our specialized department head call you with a detailed response within 2 hours. Is that okay?";
    };

    const handleSend = (text: string = inputValue) => {
        const messageText = text.trim();
        if (!messageText) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: messageText,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI "Processing" time (ChatGPT style)
        const delay = Math.min(1000 + messageText.length * 10, 3000);

        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: getAIResponse(messageText),
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
            setIsTyping(false);
        }, delay);
    };

    const renderMessageText = (text: string) => {
        // Basic Markdown Simulation
        return text.split('\n').map((line, i) => {
            // Bold handling
            const boldRegex = /\*\*(.*?)\*\*/g;
            const parts = line.split(boldRegex);

            return (
                <span key={i} className="block mb-1">
                    {parts.map((part, index) => {
                        if (index % 2 === 1) {
                            return <strong key={index} className="font-bold text-slate-900 drop-shadow-sm">{part}</strong>;
                        }
                        
                        // Handle British Council and IDP Logo Replacement
                        const bcParts = part.split(/(British Council|IDP)/g);
                        return bcParts.map((bcPart, bcIndex) => {
                            if (bcPart === "British Council") {
                                return (
                                    <span key={bcIndex} className="inline-flex items-center gap-1 mx-1 align-middle">
                                        <img src="/british-council-logo.png" alt="British Council" className="h-4 w-auto object-contain" />
                                    </span>
                                );
                            }
                            if (bcPart === "IDP") {
                                return (
                                    <span key={bcIndex} className="inline-flex items-center gap-1 mx-1 align-middle">
                                        <img src="/idp-logo.png" alt="IDP" className="h-4 w-auto object-contain" />
                                    </span>
                                );
                            }
                            return bcPart;
                        });
                    })}
                </span>
            );
        });
    };

    return (
        <div className="fixed bottom-24 right-6 z-[9999] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.85, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.85 }}
                        className="w-[calc(100vw-2rem)] sm:w-[420px] h-[600px] flex flex-col glass-card shadow-[0_32px_80px_-16px_rgba(0,0,0,0.4)] rounded-[2.5rem] overflow-hidden border border-white/50 mb-6 relative"
                    >
                        {/* AI Status Pulsing Background */}
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

                        {/* Header */}
                        <div className="p-7 gradient-primary text-white relative overflow-hidden shadow-lg">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="absolute top-[-40%] right-[-20%] w-48 h-48 bg-white/10 rounded-full blur-3xl"
                            />
                            <div className="relative flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xl border border-white/40 shadow-inner">
                                            <Bot className="w-8 h-8 drop-shadow-md" />
                                        </div>
                                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-primary rounded-full animate-pulse shadow-glow" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-xl tracking-tight leading-none uppercase">FTI Smart Guide</h3>

                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2.5 hover:bg-white/20 rounded-2xl transition-all active:scale-90"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-5 space-y-5 bg-white/40 backdrop-blur-md scroll-smooth custom-scrollbar"
                        >
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`p-4 md:p-5 rounded-[1.8rem] text-[13px] md:text-sm shadow-sm max-w-[88%] leading-relaxed ${msg.sender === 'user'
                                        ? 'bg-primary text-white rounded-tr-none font-medium'
                                        : 'bg-white/95 text-slate-700 rounded-tl-none border border-slate-100/50 shadow-md'
                                        }`}>
                                        {msg.sender === 'bot' ? renderMessageText(msg.text) : msg.text}
                                        <div className={`text-[8px] mt-2 font-black opacity-30 uppercase tracking-[0.1em] ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {msg.sender === 'user' ? 'Sent' : 'FTI Guide'}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/90 p-5 rounded-[1.8rem] rounded-tl-none border border-slate-100 flex gap-2 items-center shadow-lg backdrop-blur-sm">
                                        <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest mr-1">AI Thinking</span>
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-duration:0.6s]" />
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]" />
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Intelligent Suggestions Grid */}
                            {!isTyping && messages[messages.length - 1].sender === 'bot' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="grid grid-cols-2 gap-3 pt-3"
                                >
                                    {QUICK_ACTIONS.map((action) => (
                                        <button
                                            key={action.label}
                                            onClick={() => handleSend(action.query)}
                                            className="flex items-center gap-3 p-4 bg-white/90 hover:bg-slate-50 border border-slate-100/80 rounded-2xl text-[11px] font-bold text-slate-600 transition-all hover:shadow-xl hover:border-primary/30 active:scale-95 text-left group"
                                        >
                                            <span className="text-primary group-hover:scale-110 transition-transform">{action.icon}</span>
                                            <span className="leading-tight">{action.label}</span>
                                            <ChevronRight className="w-3 h-3 ml-auto opacity-20 group-hover:opacity-100 transition-all" />
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-white border-t border-slate-100/80 relative z-20">
                            <div className="relative flex items-center gap-4">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask me anything..."
                                    className="w-full pl-6 pr-14 py-5 bg-slate-50/80 rounded-[1.8rem] text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 border-2 border-transparent focus:border-primary/30 transition-all placeholder:text-slate-400 font-bold"
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!inputValue.trim()}
                                    className="absolute right-2 p-3 bg-primary text-white rounded-[1.2rem] hover:shadow-[0_10px_20px_rgba(249,115,22,0.4)] disabled:opacity-30 transition-all active:scale-90"
                                >
                                    <Send className="w-6 h-6" />
                                </button>
                            </div>
                            <p className="text-[8px] text-center text-slate-400 font-bold mt-4 uppercase tracking-[0.2em] opacity-60">
                                Encrypted AI Conversation • FTI Journey 2026
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 overflow-hidden relative ${isOpen ? 'bg-slate-900 border-none' : 'gradient-primary'
                    }`}
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, scale: 0.5 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0.5 }}>
                            <X className="w-5 h-5 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div key="chat" initial={{ rotate: 90, scale: 0.5 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: -90, scale: 0.5 }}>
                            <MessageSquare className="w-6 h-6 text-white fill-white/10" />
                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white animate-pulse shadow-glow" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .shadow-glow { box-shadow: 0 0 15px rgba(74, 222, 128, 0.5); }
      `}</style>
        </div>
    );
};

export default ChatAssistant;
