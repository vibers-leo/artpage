'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface PortfolioItem {
  id: number;
  image_url: string;
  title?: string;
  description?: string;
  category?: string;
}

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  className?: string;
}

export function PortfolioGallery({ items, className }: PortfolioGalleryProps) {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  if (!items || items.length === 0) return null;

  return (
    <>
      <div className={cn('w-full mt-12', className)}>
        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-4">Portfolio</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => setSelected(item)}
              className={cn(
                'relative aspect-square rounded-3xl overflow-hidden bg-gray-50 cursor-pointer group',
                index === 0 && items.length > 2 && 'col-span-2 row-span-2'
              )}
            >
              <img
                src={item.image_url}
                alt={item.title || 'Portfolio'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {item.title && (
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-bold truncate">{item.title}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selected.image_url}
                  alt={selected.title || 'Portfolio'}
                  className="w-full max-h-[60vh] object-contain bg-gray-50"
                />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              {(selected.title || selected.description) && (
                <div className="p-6">
                  {selected.title && <h3 className="text-lg font-black mb-2">{selected.title}</h3>}
                  {selected.description && <p className="text-sm text-gray-500 leading-relaxed">{selected.description}</p>}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
