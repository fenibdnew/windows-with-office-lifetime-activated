import React from 'react';
import { ShieldCheck, Languages, Download, Moon, Sun, Terminal } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onExportAll: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  darkMode,
  onToggleDarkMode,
  onExportAll,
  activeSection,
  onNavigate,
}) => {
  const isBn = language === 'bn';

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white shadow-sm shadow-cyan-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <button 
            onClick={() => onNavigate('preview')} 
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap block group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              STC Tech Hand
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block whitespace-nowrap">
              {isBn ? 'আরিফুজ্জামান (কিরণ) · ওএম স্টুডিও' : 'ARIFUZZAMAN (Kiron) · OEM Studio'}
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onNavigate('preview')}
            className={`whitespace-nowrap cursor-pointer transition-colors hover:text-cyan-600 dark:hover:text-cyan-400 ${
              activeSection === 'preview' ? 'text-cyan-600 dark:text-cyan-400 font-semibold' : ''
            }`}
          >
            {isBn ? 'সিস্টেম প্রিভিউ' : 'System Preview'}
          </button>
          
          <button
            onClick={() => onNavigate('generator')}
            className={`whitespace-nowrap cursor-pointer transition-colors hover:text-cyan-600 dark:hover:text-cyan-400 ${
              activeSection === 'generator' ? 'text-cyan-600 dark:text-cyan-400 font-semibold' : ''
            }`}
          >
            {isBn ? 'স্ক্রিপ্ট জেনারেটর' : 'Script Generator'}
          </button>

          <button
            onClick={() => onNavigate('mas')}
            className={`whitespace-nowrap cursor-pointer transition-colors hover:text-cyan-600 dark:hover:text-cyan-400 ${
              activeSection === 'mas' ? 'text-cyan-600 dark:text-cyan-400 font-semibold' : ''
            }`}
          >
            {isBn ? 'এমএএস অটোমেশন' : 'MAS Automation'}
          </button>

          <button
            onClick={() => onNavigate('logo')}
            className={`whitespace-nowrap cursor-pointer transition-colors hover:text-cyan-600 dark:hover:text-cyan-400 ${
              activeSection === 'logo' ? 'text-cyan-600 dark:text-cyan-400 font-semibold' : ''
            }`}
          >
            {isBn ? 'লোগো স্টুডিও (BMP)' : 'Logo Studio (BMP)'}
          </button>

          <button
            onClick={() => onNavigate('timeline')}
            className={`whitespace-nowrap cursor-pointer transition-colors hover:text-cyan-600 dark:hover:text-cyan-400 ${
              activeSection === 'timeline' ? 'text-cyan-600 dark:text-cyan-400 font-semibold' : ''
            }`}
          >
            {isBn ? 'ক্যারিয়ার হিস্টোরি' : 'Career Timeline'}
          </button>
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={onToggleLanguage}
            title={isBn ? 'Switch to English' : 'বাংলায় দেখুন'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <Languages className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{isBn ? 'ENG' : 'বাংলা'}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
            className="p-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onExportAll}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-cyan-600 dark:hover:bg-cyan-500 rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isBn ? 'প্যাকেজ ডাউনলোড' : 'Export Script Suite'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
