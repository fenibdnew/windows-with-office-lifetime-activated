import React, { useState, useEffect } from 'react';
import { initialProfile } from './data/profileData';
import { TechnicianProfile, Language } from './types';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { WindowsPreview } from './components/WindowsPreview';
import { ScriptGenerator } from './components/ScriptGenerator';
import { MasIntegrationGuide } from './components/MasIntegrationGuide';
import { LogoStudio } from './components/LogoStudio';
import { BrandingCustomizer } from './components/BrandingCustomizer';
import { CareerTimeline } from './components/CareerTimeline';
import { 
  generateCmdScript, 
  generatePs1Script, 
  generateRegScript, 
  generateMasPatch, 
  generateOemSetupComplete 
} from './utils/scriptGenerators';
import { Shield, Sparkles, Terminal, Layers, FileDown, CheckCircle2, Heart } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<TechnicianProfile>(initialProfile);
  const [language, setLanguage] = useState<Language>('bn');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('preview');
  const [logoBase64, setLogoBase64] = useState<string>('');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const isBn = language === 'bn';

  // Toggle Dark Mode on document root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggleLanguage = () => {
    setLanguage(prev => (prev === 'bn' ? 'en' : 'bn'));
  };

  const handleToggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Export full suite of scripts
  const handleExportAll = () => {
    const files = [
      { name: 'Install_STC_Branding.cmd', content: generateCmdScript(profile, logoBase64) },
      { name: 'Install-STCOEM.ps1', content: generatePs1Script(profile, logoBase64) },
      { name: 'STC_Branding.reg', content: generateRegScript(profile) },
      { name: 'MAS_STC_Integration.txt', content: generateMasPatch(profile) },
      { name: 'SetupComplete.cmd', content: generateOemSetupComplete(profile) }
    ];

    // Download primary .cmd installer first, and notify
    files.forEach((file, index) => {
      setTimeout(() => {
        const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, index * 200);
    });

    setExportNotice(isBn ? 'সবগুলো স্ক্রিপ্ট সফলভাবে ডাউনলোড হচ্ছে...' : 'Exporting technician automation suite...');
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans transition-colors">
      
      {/* Top Navigation Bar */}
      <Header
        language={language}
        onToggleLanguage={handleToggleLanguage}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onExportAll={handleExportAll}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Export toast notification */}
      {exportNotice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-cyan-600 text-white shadow-2xl animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-5 h-5 text-cyan-200" />
          <span className="text-xs font-semibold">{exportNotice}</span>
        </div>
      )}

      {/* Hero Section */}
      <HeroBanner
        profile={profile}
        language={language}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Quick Section Nav Bar */}
        <div className="flex items-center justify-between overflow-x-auto py-2 border-b border-slate-200 dark:border-slate-800 gap-3 scrollbar-none text-xs">
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleNavigate('preview')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeSection === 'preview'
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
              }`}
            >
              {isBn ? '১. সিস্টেম প্রিভিউ' : '1. System Preview'}
            </button>

            <button
              onClick={() => handleNavigate('mas')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeSection === 'mas'
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
              }`}
            >
              {isBn ? '২. MAS_AIO অটোমেশন' : '2. MAS_AIO Automation'}
            </button>

            <button
              onClick={() => handleNavigate('generator')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeSection === 'generator'
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
              }`}
            >
              {isBn ? '৩. স্ক্রিপ্ট জেনারেটর' : '3. Script Generator'}
            </button>

            <button
              onClick={() => handleNavigate('logo')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeSection === 'logo'
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
              }`}
            >
              {isBn ? '৪. লোগো স্টুডিও (BMP)' : '4. Logo Studio (BMP)'}
            </button>

            <button
              onClick={() => handleNavigate('customizer')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeSection === 'customizer'
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
              }`}
            >
              {isBn ? '৫. প্রোফাইল এডিটর' : '5. Profile Editor'}
            </button>

            <button
              onClick={() => handleNavigate('timeline')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeSection === 'timeline'
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
              }`}
            >
              {isBn ? '৬. ক্যারিয়ার টাইমলাইন' : '6. Career Timeline'}
            </button>
          </div>

          <div className="shrink-0 hidden md:block text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
            STC Tech Hand • Feni, Bangladesh
          </div>
        </div>

        {/* 1. Live Windows System Properties Preview */}
        <div id="preview" className="scroll-mt-24">
          <WindowsPreview
            profile={profile}
            language={language}
          />
        </div>

        {/* 2. MAS_AIO & Digital License Integration Guide */}
        <div id="mas" className="scroll-mt-24">
          <MasIntegrationGuide
            profile={profile}
            language={language}
          />
        </div>

        {/* 3. Script Generator */}
        <div id="generator" className="scroll-mt-24">
          <ScriptGenerator
            profile={profile}
            language={language}
            logoBase64={logoBase64}
          />
        </div>

        {/* 4. OEM Logo Generator (120x120 24-bit BMP) */}
        <div id="logo" className="scroll-mt-24">
          <LogoStudio
            profile={profile}
            language={language}
            onLogoBase64Change={(base64) => setLogoBase64(base64)}
          />
        </div>

        {/* 5. Branding & Registry Configurator */}
        <div id="customizer" className="scroll-mt-24">
          <BrandingCustomizer
            profile={profile}
            onChange={(updated) => setProfile(updated)}
            language={language}
          />
        </div>

        {/* 6. Career Timeline (2017 to 2026) */}
        <div id="timeline" className="scroll-mt-24">
          <CareerTimeline
            language={language}
          />
        </div>

      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900 dark:text-white">STC Tech Hand</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-medium">
                  Official OEM Studio
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                {isBn 
                  ? 'আরিফুজ্জামান (কিরণ), ম্যানেজিং ডিরেক্টর — ফেনী, বাংলাদেশ। উইন্ডোজ ও অফিস ডিজিটাল লাইসেন্সিং, ওএম ব্র্যান্ডিং এবং অ্যাডভান্সড হার্ডওয়্যার সল্যুশনস।'
                  : 'ARIFUZZAMAN (Kiron), Managing Director — Feni, Bangladesh. Automated Windows & Office Digital Licensing, OEM Identity & Enterprise IT Servicing.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <button
                onClick={handleExportAll}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>{isBn ? 'সম্পূর্ণ প্যাকেজ ডাউনলোড' : 'Download All Scripts'}</span>
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div>
              © 2017 – 2026 ARIFUZZAMAN (Kiron) • STC Tech Hand. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Feni, Bangladesh</span>
              <span>•</span>
              <span className="font-mono text-cyan-600 dark:text-cyan-400">{profile.phone}</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
