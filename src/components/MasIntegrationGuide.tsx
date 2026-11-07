import React, { useState } from 'react';
import { 
  Terminal, 
  CheckCircle, 
  HelpCircle, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  FileCode2, 
  ExternalLink,
  Zap,
  FolderTree,
  AlertTriangle
} from 'lucide-react';
import { TechnicianProfile, Language } from '../types';
import { generateMasPatch, generatePowerShellOneLiner, generateOfflineOneLiner } from '../utils/scriptGenerators';

interface MasIntegrationGuideProps {
  profile: TechnicianProfile;
  language: Language;
}

export const MasIntegrationGuide: React.FC<MasIntegrationGuideProps> = ({
  profile,
  language
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const isBn = language === 'bn';

  const copySnippet = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const masSnippet = generateMasPatch(profile);
  const oneLinerOffline = generateOfflineOneLiner(profile);
  const oneLinerCloud = `irm https://stctechhand.com/oem.ps1 | iex`;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            {isBn ? 'MAS_AIO ও অ্যাক্টিভেশন ইন্টিগ্রেশন নির্দেশিকা' : 'MAS_AIO & Digital License Integration Guide'}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            • {isBn ? 'স্বয়ংক্রিয় লাইফটাইম লাইসেন্স + ব্র্যান্ডিং' : 'Lifetime License + Technician Branding'}
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1.5">
          {isBn 
            ? 'কীভাবে MAS_AIO বা irm iex এর সাথে আপনার ব্র্যান্ডিং স্বয়ংক্রিয় করবেন?' 
            : 'How to Automate STC Tech Hand Branding with MAS Activation & irm | iex'}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
          {isBn
            ? 'আপনার প্রশ্নের পূর্ণ সমাধান: উইন্ডোজ ও অফিস ডিজিটাল লাইসেন্স অ্যাক্টিভেশনের সাথে সাথে কীভাবে আরিফুজ্জামান (কিরণ) ও STC Tech Hand এর তথ্য ক্লায়েন্টের সিস্টেম প্রোপার্টিজে স্থায়ীভাবে অটো-সেট হবে।'
            : 'Step-by-step architecture explaining how the OEM branding routine hooks directly into Microsoft Activation Scripts (MAS) and elevated PowerShell triggers.'}
        </p>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        
        {/* Method 1: The PowerShell Rapid One-Liner (Like irm | iex) */}
        <div className="p-6 rounded-xl border border-cyan-200 dark:border-cyan-800/60 bg-gradient-to-br from-cyan-50/40 via-white to-blue-50/30 dark:from-cyan-950/20 dark:via-slate-900 dark:to-slate-800/40">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-bold text-xs">
                ১
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {isBn ? 'পদ্ধতি ১: irm ... | iex এর মতো র‍্যাপিড ওয়ান-লাইনার' : 'Method 1: Rapid One-Liner (Like irm https://get.activated.win | iex)'}
              </h4>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {isBn ? 'সবচেয়ে দ্রুত ও সহজ' : 'Recommended / Fast'}
            </span>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {isBn ? (
              <span>
                আপনি যেমন <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-cyan-600 dark:text-cyan-400 text-xs font-bold">irm https://get.activated.win | iex</code> দিয়ে উইন্ডোজ এক্টিভেট করেন, তেমনি ক্লায়েন্টের পিসিতে এডমিন পাওয়ারশেল ওপেন করে নিচের যেকোনো একটি কমান্ড দিলেই মুহূর্তের মধ্যে আপনার নাম, পদবি, ফোন এবং লোগো সেট হয়ে যাবে:
              </span>
            ) : (
              <span>
                Just like MAS is launched via <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-cyan-600 dark:text-cyan-400 text-xs font-bold">irm https://get.activated.win | iex</code>, you can run this zero-download command in Administrator PowerShell to instantly brand the PC:
              </span>
            )}
          </p>

          {/* Offline instant one-liner box */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative group mb-3">
            <div className="text-[11px] font-mono text-slate-400 mb-1.5 flex items-center justify-between">
              <span>{isBn ? 'অফলাইন কমান্ড (ইন্টারনেট ছাড়াও চলবে):' : 'Offline Instant Command (No internet required):'}</span>
              <button
                onClick={() => copySnippet(oneLinerOffline, 1)}
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 cursor-pointer font-sans"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 1 ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কমান্ড কপি করুন' : 'Copy Command')}</span>
              </button>
            </div>
            <div className="font-mono text-xs text-cyan-300 overflow-x-auto whitespace-pre-wrap break-all pr-12">
              {oneLinerOffline}
            </div>
          </div>

          {/* Cloud one-liner box */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative group">
            <div className="text-[11px] font-mono text-slate-400 mb-1.5 flex items-center justify-between">
              <span>{isBn ? 'ক্লাউড শর্টকাট (যদি আপনার GitHub/ওয়েবসাইটে স্ক্রিপ্ট হোস্ট করেন):' : 'Cloud Shortcut (When hosted on your domain or GitHub):'}</span>
              <button
                onClick={() => copySnippet(oneLinerCloud, 2)}
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 cursor-pointer font-sans"
              >
                {copiedIndex === 2 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 2 ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কমান্ড কপি করুন' : 'Copy')}</span>
              </button>
            </div>
            <div className="font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre pr-12">
              {oneLinerCloud}
            </div>
          </div>
        </div>

        {/* Method 2: Patching MAS_AIO.cmd directly */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              ২
            </span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {isBn ? 'পদ্ধতি ২: MAS_AIO.cmd ফাইলে স্থায়ী কোড যুক্ত করা' : 'Method 2: Directly Patching MAS_AIO.cmd Script'}
            </h4>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {isBn ? (
              <span>
                আপনি যে <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-cyan-600 text-xs">MAS_AIO.cmd</code> ফাইলটি আপলোড করেছেন, তার ভেতরে খুব সহজেই ৩টি জায়গায় কোডটি বসিয়ে দেওয়া যায়:
              </span>
            ) : (
              <span>
                To embed your identity directly into the <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-cyan-600 text-xs">MAS_AIO.cmd</code> file so that every activation triggers it:
              </span>
            )}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                ধাপ ক (Menu Option)
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                MAS এর <code className="font-mono text-[11px] text-slate-800 dark:text-slate-200">:MainMenu</code> তে <code className="font-mono text-[11px] text-cyan-500">[B] STC Tech Hand Branding</code> মেনু অপশন যোগ করা।
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                ধাপ খ (Auto-Trigger on HWID)
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                উইন্ডোজ অ্যাক্টিভেশনের সমাপ্তি রুটিনে (<code className="font-mono text-[11px] text-slate-800 dark:text-slate-200">:dl_final</code>) <code className="font-mono text-[11px] text-cyan-500">call :STC_OEM_Branding</code> কল করা।
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                ধাপ গ (Auto-Trigger on Office)
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                অফিস Ohook অ্যাক্টিভেশনের শেষে (<code className="font-mono text-[11px] text-slate-800 dark:text-slate-200">:OhookActivation</code>) ব্র্যান্ডিং রুটিন স্বয়ংক্রিয়ভাবে কল করা।
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative group">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
              <span>MAS_AIO.cmd Patch Snippet</span>
              <button
                onClick={() => copySnippet(masSnippet, 3)}
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 cursor-pointer font-sans"
              >
                {copiedIndex === 3 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 3 ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'প্যাচ কোড কপি করুন' : 'Copy Patch Code')}</span>
              </button>
            </div>
            <pre className="text-xs font-mono text-slate-300 overflow-x-auto max-h-56 leading-relaxed">
              {masSnippet}
            </pre>
          </div>
        </div>

        {/* Method 3: Unattended $OEM$ Setup for Bootable USB */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
              ৩
            </span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {isBn ? 'পদ্ধতি ৩: বুটেবল উইন্ডোজ পেনড্রাইভের জন্য $OEM$ অটোমেশন' : 'Method 3: Bootable Windows USB $OEM$ Automated Setup'}
            </h4>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {isBn ? (
              <span>
                আপনি যখন নতুন ক্লায়েন্টের কম্পিউটারে পেনড্রাইভ দিয়ে উইন্ডোজ নতুন করে সেটআপ দেন, তখন কোনো কিছু টাইপ করা ছাড়াই উইন্ডোজ ইন্সটল হওয়া মাত্রই নিজে নিজে আপনার ব্র্যান্ডিং সেট হবে এবং সাথে সাথে MAS দিয়ে অ্যাক্টিভেট হয়ে যাবে!
              </span>
            ) : (
              <span>
                For technician bench servicing: by adding a single folder into your bootable Windows install media, the PC automatically brands itself with Arifuzzaman credentials and triggers digital activation on first user login.
              </span>
            )}
          </p>

          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 space-y-1">
            <div className="text-cyan-400 font-bold mb-2">
              {isBn ? 'পেনড্রাইভ ফোল্ডার স্ট্রাকচার:' : 'USB Folder Structure:'}
            </div>
            <div>USB:\sources\</div>
            <div className="pl-4">└── $OEM$\</div>
            <div className="pl-8">└── $$\</div>
            <div className="pl-12">└── Setup\</div>
            <div className="pl-16">└── Scripts\</div>
            <div className="pl-20 text-emerald-400 font-bold">├── SetupComplete.cmd  (আমাদের স্ক্রিপ্ট)</div>
            <div className="pl-20 text-cyan-300 font-bold">├── MAS_AIO.cmd        (আপনার অ্যাক্টিভেটর)</div>
            <div className="pl-20 text-amber-300 font-bold">└── oemlogo.bmp        (আমাদের ১২০x১২০ লোগো)</div>
          </div>
        </div>

      </div>
    </div>
  );
};
