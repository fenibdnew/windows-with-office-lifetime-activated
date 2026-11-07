import React, { useState } from 'react';
import { 
  Laptop, 
  Monitor, 
  HelpCircle, 
  X, 
  ExternalLink, 
  Phone, 
  Clock, 
  Globe, 
  ShieldCheck, 
  CheckCircle,
  Copy,
  Info,
  Layers,
  Wrench
} from 'lucide-react';
import { TechnicianProfile, Language, WindowsVersion } from '../types';

interface WindowsPreviewProps {
  profile: TechnicianProfile;
  language: Language;
}

export const WindowsPreview: React.FC<WindowsPreviewProps> = ({ profile, language }) => {
  const isBn = language === 'bn';
  const [winVersion, setWinVersion] = useState<WindowsVersion>('win11');
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleCopyCmd = () => {
    navigator.clipboard.writeText('sysdm.cpl');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <section id="preview" className="py-12 bg-slate-50 dark:bg-slate-900/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1">
              {isBn ? 'বাস্তবসম্মত সিমুলেশন' : 'Authentic Windows System Properties'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {isBn ? 'সিস্টেম প্রোপার্টিজে যেভাবে আপনার নাম দেখাবে' : 'How Your Identity Appears in Windows'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              {isBn ? (
                <>
                  স্ক্রিপ্ট রান করার পর গ্রাহকের কম্পিউটারে <strong>Settings &gt; System &gt; About</strong> অথবা 
                  কমান্ড উইন্ডোতে <code>sysdm.cpl</code> রান করলে হুবহু এই তথ্যগুলো দৃশ্যমান হবে।
                </>
              ) : (
                <>
                  After executing the automated script on any client machine, opening 
                  <strong> Settings &gt; System &gt; About</strong> or running <code>sysdm.cpl</code> displays this exact branded profile.
                </>
              )}
            </p>
          </div>

          {/* Version Switcher Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-lg self-start md:self-auto">
            <button
              onClick={() => setWinVersion('win11')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                winVersion === 'win11'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Windows 11 (Settings)
            </button>
            <button
              onClick={() => setWinVersion('classic')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                winVersion === 'classic'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Classic (sysdm.cpl)
            </button>
          </div>
        </div>

        {/* Verification Tip */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 text-xs text-cyan-900 dark:text-cyan-300">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span>
              {isBn ? (
                <>কীবোর্ডে <strong>Win + R</strong> চেপে <code>sysdm.cpl</code> লিখে এন্টার দিলেই সিস্টেম প্রোপার্টিজ সরাসরি ওপেন হবে।</>
              ) : (
                <>Press <strong>Win + R</strong>, type <code>sysdm.cpl</code> and hit Enter to test on your own Windows computer.</>
              )}
            </span>
          </div>
          <button
            onClick={handleCopyCmd}
            className="flex items-center gap-1 font-mono font-medium hover:underline text-cyan-700 dark:text-cyan-400 cursor-pointer"
          >
            {copiedKey ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Copied!
              </span>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy <code>sysdm.cpl</code>
              </>
            )}
          </button>
        </div>

        {/* PREVIEW CONTAINER */}
        <div className="mt-8">
          {winVersion === 'win11' ? (
            /* ================= WINDOWS 11 SETTINGS VIEW ================= */
            <div className="max-w-4xl mx-auto rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden font-sans">
              
              {/* Window Title Bar */}
              <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between select-none">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <div className="w-3 h-3 rounded-full bg-cyan-500/80" />
                  <span>Settings &gt; System &gt; About</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="w-2.5 h-0.5 bg-slate-400 inline-block" />
                  <span className="w-2.5 h-2.5 border border-slate-400 inline-block" />
                  <span className="text-xs">✕</span>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Header Section */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white shadow-md">
                      <Monitor className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        STC-DESKTOP-PRO
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {profile.model}
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex px-2.5 py-1 text-xs font-semibold rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    Active & Optimized
                  </span>
                </div>

                {/* 1. Device Specifications */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-5 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    Device specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-xs">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block">Device name</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">STC-WORKSTATION-BD</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block">Processor</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">Intel(R) Core(TM) i7-13700K 3.40 GHz</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block">Installed RAM</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">32.0 GB (31.8 GB usable)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block">System type</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">64-bit operating system, x64-based processor</span>
                    </div>
                  </div>
                </div>

                {/* 2. OEM SUPPORT SECTION (THE KEY FEATURE USER ASKED FOR!) */}
                <div className="rounded-xl border-2 border-cyan-500/40 dark:border-cyan-500/30 bg-cyan-50/20 dark:bg-cyan-950/20 p-5 space-y-4 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-cyan-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                        OEM
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Support & Service Information
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 font-semibold">
                      [Auto-Injected by STC Script]
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-1">
                    {/* OEM Logo */}
                    <div className="w-16 h-16 rounded-lg bg-slate-900 border border-cyan-500/40 p-1 shrink-0 shadow-sm">
                      <img 
                        src="/src/assets/images/stc_logo_emblem_1794033873125.jpg" 
                        alt="STC OEM Logo" 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>

                    {/* Support Details Grid */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block font-medium">Support Provider / Manufacturer</span>
                        <span className="text-sm font-bold text-cyan-700 dark:text-cyan-300">
                          {profile.manufacturer}
                        </span>
                        <span className="text-[11px] text-slate-600 dark:text-slate-400 block">
                          Managing Director: {profile.name} ({profile.location})
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block font-medium">Model / Workstation Profile</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {profile.model}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span className="font-mono font-medium">{profile.phone}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span>{profile.supportHours}</span>
                      </div>

                      <div className="sm:col-span-2 flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <a 
                          href={profile.website} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-medium"
                        >
                          {profile.website}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Career Badge Strip */}
                  <div className="mt-2 pt-3 border-t border-cyan-200/60 dark:border-cyan-900/40 text-[11px] text-slate-600 dark:text-slate-400 flex flex-wrap items-center gap-3">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Service Record:</span>
                    <span>2017-2021 Computer Service</span>
                    <span>·</span>
                    <span>2022-2025 Digital Computer</span>
                    <span>·</span>
                    <span className="text-cyan-700 dark:text-cyan-400 font-bold">2026+ STC Tech Hand</span>
                  </div>
                </div>

                {/* 3. Windows Specifications */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-5 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Windows specifications & Activation
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-xs">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block">Edition</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Windows 11 Pro</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block">Activation Status</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Permanently Activated (Digital License)
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block">Registered Owner</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{profile.registeredOwner}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block">Registered Organization</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{profile.registeredOrganization}</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            /* ================= CLASSIC SYSDM.CPL WINDOWS PROPERTIES DIALOG ================= */
            <div className="max-w-xl mx-auto rounded-lg bg-[#f0f0f0] dark:bg-slate-900 border-2 border-[#0055ea] dark:border-slate-700 shadow-2xl overflow-hidden font-sans text-[#000] dark:text-slate-100">
              
              {/* Retro Classic Dialog Title Bar */}
              <div className="px-3 py-1.5 bg-gradient-to-r from-[#0055ea] to-[#2b88ff] text-white flex items-center justify-between text-xs font-bold select-none">
                <div className="flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>System Properties</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-4 h-4 bg-[#e81123] hover:bg-red-700 text-white rounded-none flex items-center justify-center text-[10px] font-bold">
                    ✕
                  </button>
                </div>
              </div>

              {/* Tabs strip */}
              <div className="px-3 pt-2 bg-[#f0f0f0] dark:bg-slate-900 flex items-end gap-0.5 border-b border-[#999] dark:border-slate-700 text-xs">
                <div className="px-3 py-1 bg-white dark:bg-slate-800 border-t-2 border-t-[#0055ea] border-l border-r border-[#999] dark:border-slate-700 rounded-t font-semibold text-slate-900 dark:text-white">
                  General
                </div>
                <div className="px-3 py-1 text-slate-600 dark:text-slate-400 hover:text-slate-900">
                  Computer Name
                </div>
                <div className="px-3 py-1 text-slate-600 dark:text-slate-400 hover:text-slate-900">
                  Hardware
                </div>
                <div className="px-3 py-1 text-slate-600 dark:text-slate-400 hover:text-slate-900">
                  Advanced
                </div>
                <div className="px-3 py-1 text-slate-600 dark:text-slate-400 hover:text-slate-900">
                  System Protection
                </div>
              </div>

              {/* Tab Content Box */}
              <div className="p-5 bg-white dark:bg-slate-850 m-3 border border-[#aaa] dark:border-slate-700 rounded space-y-4 text-xs">
                
                {/* System Section */}
                <div className="flex gap-4 items-start pb-4 border-b border-slate-200 dark:border-slate-700">
                  {/* Windows Logo Icon */}
                  <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-blue-600 rounded text-white font-bold text-xl shadow">
                    ⊞
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      System:
                    </h4>
                    <p className="text-slate-700 dark:text-slate-300">Microsoft Windows 11 Professional</p>
                    <p className="text-slate-500 dark:text-slate-400">64-bit Operating System</p>
                    <p className="text-slate-500 dark:text-slate-400">Version 24H2 (OS Build 26100.2161)</p>
                  </div>
                </div>

                {/* Manufactured and Supported by Section (OEM Information) */}
                <div className="flex gap-4 items-start py-1">
                  
                  {/* OEM Logo (120x120 oemlogo.bmp) */}
                  <div className="w-24 h-24 border border-slate-400 dark:border-slate-600 p-1 bg-slate-950 shrink-0 shadow-sm flex flex-col items-center justify-center">
                    <img 
                      src="/src/assets/images/stc_logo_emblem_1794033873125.jpg" 
                      alt="oemlogo.bmp"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text details */}
                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                      Manufactured and supported by:
                    </h4>
                    <p className="font-bold text-cyan-700 dark:text-cyan-400 text-sm">
                      {profile.manufacturer}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                      {profile.model}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                      Managing Director: {profile.name}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                      Location: {profile.location}
                    </p>

                    {/* Support Information Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => setShowSupportModal(true)}
                        className="px-3 py-1 bg-[#e1e1e1] hover:bg-[#d0d0d0] dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white border border-[#707070] rounded-sm text-xs font-semibold shadow-sm active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                        <span>Support Information...</span>
                      </button>
                    </div>
                  </div>

                </div>

                {/* Registered to Section */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    Registered to:
                  </h4>
                  <p className="text-slate-800 dark:text-slate-200 pl-4 font-medium">
                    {profile.registeredOwner}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 pl-4 font-medium">
                    {profile.registeredOrganization} ({profile.location})
                  </p>
                </div>

                {/* Computer Hardware */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400">
                  <p>Computer: Intel(R) Core(TM) i7-13700K CPU @ 3.40GHz</p>
                  <p>32.0 GB RAM</p>
                </div>

              </div>

              {/* Bottom Standard Buttons */}
              <div className="px-5 py-2.5 bg-[#f0f0f0] dark:bg-slate-900 flex justify-end gap-2 text-xs">
                <button className="px-4 py-1 bg-[#e1e1e1] dark:bg-slate-800 border border-[#707070] rounded-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm cursor-pointer">
                  OK
                </button>
                <button className="px-4 py-1 bg-[#e1e1e1] dark:bg-slate-800 border border-[#707070] rounded-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm cursor-pointer">
                  Cancel
                </button>
                <button className="px-4 py-1 bg-[#e1e1e1] dark:bg-slate-800 border border-[#707070] rounded-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm cursor-pointer">
                  Apply
                </button>
              </div>

            </div>
          )}
        </div>

        {/* MODAL: AUTHENTIC SUPPORT INFORMATION DIALOG */}
        {showSupportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-lg rounded-lg bg-white dark:bg-slate-900 border-2 border-slate-400 dark:border-slate-700 shadow-2xl overflow-hidden font-sans animate-in fade-in zoom-in-95 duration-150">
              
              {/* Modal Title Bar */}
              <div className="px-3 py-1.5 bg-[#0055ea] text-white flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Support Information</span>
                </div>
                <button 
                  onClick={() => setShowSupportModal(false)}
                  className="w-4 h-4 bg-[#e81123] text-white flex items-center justify-center text-[10px] font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4 text-xs">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="w-12 h-12 rounded bg-slate-950 p-1 shrink-0 border border-cyan-500/30">
                    <img 
                      src="/src/assets/images/stc_logo_emblem_1794033873125.jpg" 
                      alt="STC Tech Hand" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {profile.manufacturer}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400">
                      Technical Support & Warranty Services
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  <div>
                    <span className="font-bold block text-slate-900 dark:text-white">Managing Director:</span>
                    <span>{profile.name}</span>
                  </div>

                  <div>
                    <span className="font-bold block text-slate-900 dark:text-white">Service Location:</span>
                    <span>{profile.location}</span>
                  </div>

                  <div>
                    <span className="font-bold block text-slate-900 dark:text-white">Support Hotline:</span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold">{profile.phone}</span>
                  </div>

                  <div>
                    <span className="font-bold block text-slate-900 dark:text-white">Working Hours:</span>
                    <span>{profile.supportHours}</span>
                  </div>

                  <div>
                    <span className="font-bold block text-slate-900 dark:text-white">Online Portal:</span>
                    <a href={profile.website} target="_blank" rel="noreferrer" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                      {profile.website}
                    </a>
                  </div>

                  <div className="pt-2">
                    <span className="font-bold block text-slate-900 dark:text-white mb-1">
                      Technician Experience & Credentials:
                    </span>
                    <div className="p-2.5 rounded bg-slate-100 dark:bg-slate-800/80 font-mono text-[11px] space-y-1 text-slate-800 dark:text-slate-300">
                      <p>• 2026 - Present: Managing Director @ STC Tech Hand</p>
                      <p>• 2022 - 2025: Senior Technician @ Digital Computer</p>
                      <p>• 2017 - 2021: Computer Assistant @ Computer Service</p>
                      <p className="text-emerald-600 dark:text-emerald-400 pt-1 font-sans">
                        ✓ Verified Genuine Windows & Office Digital Activation
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                <button
                  onClick={() => setShowSupportModal(false)}
                  className="px-5 py-1 bg-[#0055ea] hover:bg-blue-700 text-white font-semibold text-xs rounded-sm shadow cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
