import React, { useState, useRef, useEffect } from 'react';
import { Search, Menu, Filter } from 'lucide-react';
import { QUOTES, APP_NAME } from './constants';
import { Category, Quote } from './types';
import QuoteCard from './components/QuoteCard';
import VideoGeneratorModal from './components/VideoGeneratorModal';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isGeneratorOpen, setGeneratorOpen] = useState(false);
  const [selectedQuoteForShort, setSelectedQuoteForShort] = useState<Quote | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter quotes based on category and search
  const filteredQuotes = QUOTES.filter(q => {
    const matchesCategory = activeCategory === 'ALL' || q.category === activeCategory;
    const matchesSearch = q.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle Scroll Snap Index detection
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, clientHeight } = containerRef.current;
      const index = Math.round(scrollTop / clientHeight);
      if (index !== currentQuoteIndex) {
        setCurrentQuoteIndex(index);
      }
    }
  };

  useEffect(() => {
      const container = containerRef.current;
      if(container) {
          container.addEventListener('scroll', handleScroll);
          return () => container.removeEventListener('scroll', handleScroll);
      }
  }, [currentQuoteIndex]);

  const handleCreateShort = (quote: Quote) => {
      setSelectedQuoteForShort(quote);
      setGeneratorOpen(true);
  };

  return (
    <div className="bg-black h-screen w-full overflow-hidden flex flex-col">
      
      {/* Header / Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-40 p-4 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="flex justify-between items-center pointer-events-auto">
            <div className="flex items-center gap-2">
                {/* <Menu className="text-white/80" /> */}
                <h1 className="text-xl font-display font-bold tracking-tighter text-white">{APP_NAME}</h1>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="relative">
                   <input 
                     type="text" 
                     placeholder="Buscar autor..." 
                     className="bg-white/10 backdrop-blur-md border border-white/10 rounded-full py-1 px-3 pl-8 text-sm text-white placeholder-white/50 w-32 focus:w-48 transition-all outline-none"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                   <Search className="absolute left-2.5 top-1.5 text-white/50 w-4 h-4" />
               </div>
            </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex gap-3 overflow-x-auto mt-4 no-scrollbar pb-2 pointer-events-auto">
            <button 
                onClick={() => setActiveCategory('ALL')}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all border ${activeCategory === 'ALL' ? 'bg-white text-black border-white' : 'bg-black/30 text-white border-white/20 hover:bg-white/10'}`}
            >
                Todo
            </button>
            {Object.values(Category).map((cat) => (
                <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all border ${activeCategory === cat ? 'bg-white text-black border-white' : 'bg-black/30 text-white border-white/20 hover:bg-white/10'}`}
                >
                    {cat.split(' ')[0]}...
                </button>
            ))}
        </div>
      </div>

      {/* Vertical Feed */}
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
      >
        {filteredQuotes.length > 0 ? (
             filteredQuotes.map((quote, index) => (
                <QuoteCard 
                    key={quote.id} 
                    quote={quote} 
                    isActive={index === currentQuoteIndex}
                    onCreateShort={handleCreateShort}
                />
            ))
        ) : (
            <div className="h-full flex flex-col items-center justify-center text-neutral-500">
                <p>No se encontraron citas.</p>
            </div>
        )}
      </div>

      {/* Modals */}
      <VideoGeneratorModal 
        isOpen={isGeneratorOpen} 
        onClose={() => setGeneratorOpen(false)} 
        quote={selectedQuoteForShort}
      />

    </div>
  );
};

export default App;