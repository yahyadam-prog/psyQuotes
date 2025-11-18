import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Category } from '../types';
import { PlayCircle, Share2, Bookmark, MoreVertical } from 'lucide-react';
import { CATEGORY_COLORS, CATEGORY_BG_GRADIENTS } from '../constants';

interface QuoteCardProps {
  quote: Quote;
  isActive: boolean;
  onCreateShort: (quote: Quote) => void;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, isActive, onCreateShort }) => {
  
  const bgGradient = CATEGORY_BG_GRADIENTS[quote.category] || 'from-neutral-900 to-neutral-950';
  const accentColor = CATEGORY_COLORS[quote.category] || 'text-white';

  return (
    <div className={`w-full h-screen flex-shrink-0 relative overflow-hidden bg-gradient-to-b ${bgGradient} snap-center`}>
      
      {/* Abstract Background Element */}
      <div className="absolute inset-0 opacity-20">
        {/* Placeholder for an abstract background image based on visualId if we had assets */}
        <img 
            src={`https://picsum.photos/seed/${quote.visualId}/1080/1920?blur=5`} 
            className="w-full h-full object-cover grayscale mix-blend-overlay"
            alt="background texture"
        />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-center px-8 z-10 max-w-2xl mx-auto">
        
        {/* Category Tag */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute top-24 left-8 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10"
        >
            <span className={`text-xs font-bold uppercase tracking-wider ${accentColor}`}>
                {quote.category}
            </span>
        </motion.div>

        {/* Quote Text */}
        <div className="mb-8">
            <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-display font-bold text-3xl md:text-4xl leading-snug text-white drop-shadow-lg"
            >
                "{quote.text}"
            </motion.h1>
        </div>

        {/* Author & Book */}
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
        >
            <p className={`text-xl font-semibold ${accentColor} mb-1`}>
                {quote.author}
            </p>
            <p className="text-sm text-neutral-400 italic font-light border-l-2 border-neutral-700 pl-3">
                {quote.book}
            </p>
        </motion.div>

        {/* Create Short CTA */}
        <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
             transition={{ duration: 0.6, delay: 0.9 }}
             className="mt-12"
        >
            <button 
                onClick={() => onCreateShort(quote)}
                className="group relative flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold transition-all hover:bg-neutral-200 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
                <PlayCircle size={24} className="text-black" />
                <span>Crear Short con IA</span>
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:animate-ping"></div>
            </button>
            <p className="mt-2 text-[10px] text-neutral-500 uppercase tracking-widest">Generado por Gemini Veo</p>
        </motion.div>

      </div>

      {/* Sidebar Actions (TikTok style) */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center z-20">
          <button className="flex flex-col items-center gap-1 text-white/80 hover:text-white transition">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                <Share2 size={24} />
              </div>
              <span className="text-xs">Share</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white/80 hover:text-white transition">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                <Bookmark size={24} />
              </div>
              <span className="text-xs">Save</span>
          </button>
          <button className="text-white/50 hover:text-white">
              <MoreVertical size={20} />
          </button>
      </div>

    </div>
  );
};

export default QuoteCard;