import React, { useState, useEffect } from 'react';
import { X, Share2, Download, Loader2 } from 'lucide-react';
import { Quote } from '../types';
import { generateVisualContent } from '../services/geminiService';
import { motion } from 'framer-motion';

interface VideoGeneratorModalProps {
  quote: Quote | null;
  isOpen: boolean;
  onClose: () => void;
}

type GenStatus = 'idle' | 'generating' | 'completed' | 'error';

const VideoGeneratorModal: React.FC<VideoGeneratorModalProps> = ({ quote, isOpen, onClose }) => {
  const [status, setStatus] = useState<GenStatus>('idle');
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [progressMsg, setProgressMsg] = useState("Iniciando motor creativo...");

  useEffect(() => {
    if (isOpen && quote) {
      startGeneration(quote);
    } else {
      // Reset state on close
      setStatus('idle');
      setMediaUrl(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, quote]);

  const startGeneration = async (targetQuote: Quote) => {
    setStatus('generating');
    setProgressMsg("Conectando con el inconsciente colectivo...");
    
    // Construct a rich prompt for Gemini Flash Image
    const prompt = `Vertical abstract background image (9:16 aspect ratio) for a psychology quote.
    Theme: ${targetQuote.category}.
    Visual keywords: ${targetQuote.visualId}.
    Atmosphere: ethereal, psychological, deep, moody lighting, high contrast, artistic.
    No text overlays in the generated image. High quality, photorealistic or 3d render style.`;

    try {
        // Simulate progress messages
        const interval = setInterval(() => {
            const msgs = [
                "Tejiendo la narrativa visual...",
                "Interpretando arquetipos...",
                "Renderizando sueños...",
                "Sincronizando con la psique..."
            ];
            setProgressMsg(msgs[Math.floor(Math.random() * msgs.length)]);
        }, 2000);

        const url = await generateVisualContent(prompt);
        
        clearInterval(interval);
        if (url) {
            setMediaUrl(url);
            setStatus('completed');
        } else {
            throw new Error("Generation failed");
        }
    } catch (e) {
        console.error(e);
        setStatus('error');
    }
  };

  const handleDownload = () => {
      if (mediaUrl) {
          const a = document.createElement('a');
          a.href = mediaUrl;
          a.download = `PsyShort-${quote?.id}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md aspect-[9/16] bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Content Area */}
        <div className="w-full h-full flex flex-col items-center justify-center text-center relative">
          
          {status === 'generating' && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center space-y-6 z-10"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500 blur-xl opacity-20 animate-pulse"></div>
                <Loader2 className="w-16 h-16 text-amber-400 animate-spin relative z-10" />
              </div>
              <h3 className="text-xl font-display font-bold text-white">Generando Visual</h3>
              <p className="text-neutral-400 text-sm animate-pulse">{progressMsg}</p>
              <div className="text-xs text-neutral-500 max-w-[200px] mt-2">
                Usando Gemini Flash Image (Nano Banana)
              </div>
            </motion.div>
          )}

          {status === 'error' && (
            <div className="text-red-400 space-y-4 z-10">
              <p>Ocurrió un error al generar el contenido.</p>
              <button 
                onClick={() => quote && startGeneration(quote)}
                className="px-4 py-2 bg-white/10 rounded-full text-white hover:bg-white/20"
              >
                Reintentar
              </button>
            </div>
          )}

          {status === 'completed' && mediaUrl && quote && (
            <div className="absolute inset-0 w-full h-full group">
                {/* Generated Image */}
                <img 
                    src={mediaUrl} 
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="AI Generated Visual"
                />
                
                {/* Overlay Text (Simulating the Short composition) */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 flex flex-col justify-end p-8 pb-20">
                     <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-white font-display font-bold text-2xl leading-tight shadow-black drop-shadow-md mb-4 text-left"
                     >
                         "{quote.text}"
                     </motion.p>
                     <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="text-left"
                     >
                         <p className="text-amber-400 font-bold text-lg">{quote.author}</p>
                         <p className="text-neutral-300 text-xs italic">{quote.book}</p>
                     </motion.div>
                </div>

                {/* Action Bar */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 px-6 z-20">
                    <button 
                        onClick={handleDownload}
                        className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold shadow-lg hover:bg-neutral-200 transition-transform transform active:scale-95"
                    >
                        <Download size={18} /> Guardar
                    </button>
                    <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30">
                        <Share2 size={20} />
                    </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoGeneratorModal;