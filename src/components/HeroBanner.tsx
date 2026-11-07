import React from 'react';
import { 
  Award, 
  MapPin, 
  PhoneCall, 
  Briefcase, 
  Sparkles, 
  Layers, 
  Terminal, 
  ExternalLink,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';
import { TechnicianProfile, Language } from '../types';

interface HeroBannerProps {
  profile: TechnicianProfile;
  language: Language;
  onNavigate: (section: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ profile, language, onNavigate }) => {
  const isBn = language === 'bn';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border-b border-slate-800">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Cyan gradient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text & Profile Summary */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean inline kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-cyan-400">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-800/60">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                {isBn ? 'স্বয়ংক্রিয় ওএম ব্র্যান্ডিং ইঞ্জিন' : 'Automated Windows OEM Identity Engine'}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">{isBn ? 'ফেনী, বাংলাদেশ' : 'Feni, Bangladesh'}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">2017 – 2026+</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {isBn ? (
                <>
                  উইন্ডোজ অ্যাক্টিভেশনের সাথে{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                    এসটিসি টেক হ্যান্ড
                  </span>{' '}
                  ওএম ব্র্যান্ডিং যুক্ত করুন
                </>
              ) : (
                <>
                  Integrate{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                    STC Tech Hand
                  </span>{' '}
                  OEM Branding with Windows System Properties
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {isBn ? (
                <>
                  <strong>{profile.name}</strong> — {profile.role}, <strong>{profile.company}</strong>। 
                  এখন থেকে যেকোনো কম্পিউটারে উইন্ডোজ ও অফিস ডিজিটাল লাইসেন্স অ্যাক্টিভেশনের সাথে সাথে 
                  সিস্টেম প্রোপার্টিজ (System Properties)-এ আপনার নাম, লোগো এবং সার্ভিস পরিচিতি 
                  অটোমেটিকভাবে সেট হয়ে যাবে।
                </>
              ) : (
                <>
                  <strong>{profile.name}</strong> — {profile.role} at <strong>{profile.company}</strong>. 
                  Seamlessly inject your verified technician identity, custom 120x120 OEM logo, and direct support 
                  details into Windows System Properties (`sysdm.cpl` & Settings About) during automated activation.
                </>
              )}
            </p>

            {/* Verified Career Timeline Strip */}
            <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80 backdrop-blur-sm space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                {isBn ? 'যাচাইকৃত পেশাগত অভিজ্ঞতা (Career Timeline)' : 'Verified Technician Career Timeline'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/50">
                  <span className="font-bold text-slate-400 block">2017 – 2021</span>
                  <span className="font-semibold text-white block">Computer Assistant</span>
                  <span className="text-slate-400">Computer Service</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/50">
                  <span className="font-bold text-slate-400 block">2022 – 2025</span>
                  <span className="font-semibold text-white block">Senior Technician</span>
                  <span className="text-slate-400">Digital Computer</span>
                </div>
                <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-700/50">
                  <span className="font-bold text-cyan-400 block">2026 – Present</span>
                  <span className="font-semibold text-white block">Managing Director</span>
                  <span className="text-cyan-300">STC Tech Hand</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('preview')}
                className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                <span>{isBn ? 'সিস্টেম প্রোপার্টিজ প্রিভিউ' : 'Live Windows Preview'}</span>
              </button>

              <button
                onClick={() => onNavigate('generator')}
                className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>{isBn ? 'স্ক্রিপ্ট ও কোড দেখুন' : 'Get Deployment Scripts'}</span>
              </button>

              <button
                onClick={() => onNavigate('mas')}
                className="px-4 py-2.5 rounded-lg bg-transparent hover:bg-slate-800/60 text-slate-300 font-medium text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>{isBn ? 'MAS ইন্টিগ্রেশন নির্দেশিকা' : 'MAS Hook Guide'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Right Column: Visual Brand Badge & Live Identity Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Card Container */}
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/95 border border-slate-700/80 p-6 shadow-2xl backdrop-blur-md">
                
                {/* Header with Logo */}
                <div className="flex items-center gap-4 pb-5 border-b border-slate-700/60">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-950 border border-cyan-500/30 shrink-0 shadow-md shadow-cyan-500/10">
                    <img 
                      src="/src/assets/images/stc_logo_emblem_1794033873125.jpg" 
                      alt="STC Tech Hand Emblem"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 tracking-wide uppercase mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      {isBn ? 'ভেরিফাইড টেকনিশিয়ান' : 'Verified Technician'}
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {profile.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {profile.role} · {profile.company}
                    </p>
                  </div>
                </div>

                {/* Identity Attributes */}
                <div className="py-4 space-y-2.5 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-800">
                    <span className="text-slate-400">{isBn ? 'কর্মস্থল / ঠিকানা' : 'Location'}:</span>
                    <span className="font-medium text-slate-200 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {profile.location}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-slate-800">
                    <span className="text-slate-400">{isBn ? 'হটলাইন / মোবাইল' : 'Support Hotline'}:</span>
                    <span className="font-mono text-cyan-300 font-medium">
                      {profile.phone}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-slate-800">
                    <span className="text-slate-400">{isBn ? 'রেজিস্টার্ড ওনার' : 'Registered Owner'}:</span>
                    <span className="font-medium text-slate-200">
                      {profile.registeredOwner}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-slate-800">
                    <span className="text-slate-400">{isBn ? 'ওএম প্রস্তুতকারক' : 'OEM Manufacturer'}:</span>
                    <span className="font-medium text-slate-200 truncate max-w-[200px]">
                      {profile.manufacturer}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">{isBn ? 'লোগো ফাইল ফরম্যাট' : 'Logo Spec'}:</span>
                    <span className="font-mono text-slate-300">
                      120x120 24-bit BMP
                    </span>
                  </div>
                </div>

                {/* Bottom verification badge */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    {isBn ? 'লাইফটাইম ডিজিটাল লাইসেন্স প্রস্তুত' : 'Digital License Linked'}
                  </span>
                  <span>v2.8 MAS Compatible</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
