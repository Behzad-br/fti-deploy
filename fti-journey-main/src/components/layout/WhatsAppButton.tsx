import { API_BASE_URL } from '../../config/api';
import { useState, useEffect } from 'react';
import { MessageCircle, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_OFFICES = [
  {
    id: 'branch_lahore',
    name: 'Lahore Office',
    location: 'Lahore Office',
    number: '923000450025',
    message: 'Hi FTI Lahore, I want free counselling for study abroad.'
  },
  {
    id: 'branch_faisalabad',
    name: 'Faisalabad Office',
    location: 'Faisalabad Office',
    number: '923007442732',
    message: 'Hi FTI Faisalabad, I want free counselling for study abroad.'
  },
  {
    id: 'branch_rawalpindi',
    name: 'Rawalpindi Office',
    location: 'Rawalpindi Office',
    number: '923317442732',
    message: 'Hi FTI Rawalpindi, I want free counselling for study abroad.'
  },
  {
    id: 'branch_gujranwala',
    name: 'Gujranwala Office (Head Office)',
    location: 'Gujranwala',
    number: '923099111400',
    message: 'Hi FTI Gujranwala, I want free counselling for study abroad.'
  },
  {
    id: 'branch_london',
    name: 'London Office (UK)',
    location: 'London',
    number: '447429950775',
    message: 'Hi FTI London, I want free counselling for study abroad.'
  },
  {
    id: 'branch_alipurchatta',
    name: 'Ali Pur Chatta Office',
    location: 'Ali Pur Chatta',
    number: '923099111400',
    message: 'Hi FTI Ali Pur Chatta, I want free counselling for study abroad.'
  },
  {
    id: 'branch_bahawalpur',
    name: 'Bahawalpur Office',
    location: 'Bahawalpur',
    number: '923006809989',
    message: 'Hi FTI Bahawalpur, I want free counselling for study abroad.'
  },
  {
    id: 'branch_wazirabad',
    name: 'Wazirabad Office',
    location: 'Wazirabad',
    number: '923456604949',
    message: 'Hi FTI Wazirabad, I want free counselling for study abroad.'
  }
];

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [offices, setOffices] = useState(DEFAULT_OFFICES);

  useEffect(() => {
    fetch(`${API_BASE_URL}/settings/whatsapp`)
      .then(res => res.json())
      .then(data => {
        const updatedOffices = DEFAULT_OFFICES.map(office => ({
          ...office,
          number: data[office.id] !== undefined ? data[office.id].replace(/[^0-9]/g, '') : office.number
        })).filter(office => office.number && office.number.trim() !== '');
        setOffices(updatedOffices);
      })
      .catch(err => console.error("Failed to load whatsapp settings:", err));
  }, []);

  useEffect(() => {
    const handleOpenSelector = () => setIsOpen(true);
    window.addEventListener('open-whatsapp-selector', handleOpenSelector);
    return () => window.removeEventListener('open-whatsapp-selector', handleOpenSelector);
  }, []);

  const handleOfficeClick = (number: string, message: string) => {
    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 mb-2"
          >
            {/* Header */}
            <div className="bg-[#25D366] p-6 text-white relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white fill-current" />
                </div>
                <h3 className="font-bold text-xl leading-tight">Start a Conversation</h3>
              </div>
              <p className="text-sm text-white/90 leading-relaxed">
                Our team is here to assist you! Click on the office location below to chat with us on <span className="font-bold border-b border-white/30 pb-0.5">WhatsApp</span>.
              </p>
              
              <div className="mt-4 flex items-center gap-2">
                 <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" />
                 <span className="text-[10px] uppercase tracking-wider font-extrabold text-white/70">Typically replies in minutes</span>
              </div>
            </div>

            {/* Office List */}
            <div className="p-4 bg-slate-50 space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
              {offices.map((office, index) => (
                <motion.button
                  key={office.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleOfficeClick(office.number, office.message)}
                  className="w-full bg-white p-4 rounded-xl shadow-sm border border-transparent hover:border-[#25D366] hover:shadow-md transition-all group flex items-center gap-4 text-left"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-[#25D366]/10 transition-colors">
                    <MessageCircle className="h-7 w-7 text-[#25D366] fill-[#25D366]/10 group-hover:fill-[#25D366]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors">{office.name}</h4>
                    <p className="text-[11px] text-slate-500 font-medium">{office.location}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#25D366] border border-slate-100 group-hover:border-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </motion.button>
              ))}
            </div>
            
            <div className="p-3 text-center bg-white border-t border-slate-50 flex items-center justify-center gap-2">
               <div className="w-1 h-1 bg-[#25D366] rounded-full" />
               <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest cursor-default">FTI Journey Support • 24/7</p>
               <div className="w-1 h-1 bg-[#25D366] rounded-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 active:scale-90 z-50 ${
          isOpen ? 'bg-slate-900 rotate-[360deg]' : 'bg-[#25D366] hover:scale-110'
        }`}
        aria-label="WhatsApp Support"
      >
        {!isOpen && <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />}
        
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            >
              <X className="h-8 w-8 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              className="flex items-center justify-center"
            >
              <MessageCircle className="h-9 w-9 text-white fill-current" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default WhatsAppButton;

