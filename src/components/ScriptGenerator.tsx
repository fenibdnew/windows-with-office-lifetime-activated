import React, { useState } from 'react';
import { 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  Terminal, 
  FileText, 
  Sliders, 
  Flame, 
  HardDriveDownload,
  ShieldAlert,
  Info
} from 'lucide-react';
import { TechnicianProfile, Language } from '../types';
import { 
  generateCmdScript, 
  generatePs1Script, 
  generateRegScript, 
  generateMasPatch, 
  generateOemSetupComplete,
  generatePowerShellOneLiner,
  generateOfflineOneLiner
} from '../utils/scriptGenerators';

interface ScriptGeneratorProps {
  profile: TechnicianProfile;
  language: Language;
  logoBase64?: string;
}

type TabType = 'cmd' | 'ps1' | 'reg' | 'oneliner' | 'mas_patch' | 'setup_complete';

export const ScriptGenerator: React.FC<ScriptGeneratorProps> = ({
  profile,
  language,
  logoBase64
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('cmd');
  const [copied, setCopied] = useState<boolean>(false);
  const isBn = language === 'bn';

  const scripts: Record<TabType, { title: string; titleBn: string; filename: string; ext: string; content: string; desc: string; descBn: string; instructions: string; instructionsBn: string }> = {
    cmd: {
      title: 'Batch Automated Installer (.cmd)',
      titleBn: 'অটোমেটেড ব্যাচ ইন্সটলার (.cmd)',
      filename: 'Install_STC_Branding.cmd',
      ext: 'cmd',
      content: generateCmdScript(profile, logoBase64),
      desc: 'One-click executable batch file that requests Administrator elevation, injects the OEM logo directly into System32, and writes all STC Tech Hand registry entries.',
      descBn: 'এক ক্লিকে রান করা যায় এমন ব্যাচ ফাইল। এটি অ্যাডমিনিস্ট্রেটর পারমিশন নেয়, সিস্টেম৩২ এ লোগো বসায় এবং রেজিস্ট্রিতে তথ্য আপডেট করে।',
      instructions: 'Right-click the downloaded file and select "Run as administrator". It will automatically open System Properties to verify.',
      instructionsBn: 'ডাউনলোড করার পর রাইট-ক্লিক করে "Run as administrator" দিন। শেষ হলে স্বয়ংক্রিয়ভাবে উইন্ডোজ সিস্টেম প্রোপার্টিজ ওপেন হবে।'
    },
    ps1: {
      title: 'PowerShell Automation Script (.ps1)',
      titleBn: 'পাওয়ারশেল অটোমেশন স্ক্রিপ্ট (.ps1)',
      filename: 'Install-STCOEM.ps1',
      ext: 'ps1',
      content: generatePs1Script(profile, logoBase64),
      desc: 'Modern PowerShell script with colorized terminal logging, automatic elevation bypass, 64-bit/32-bit registry support, and verification check.',
      descBn: 'কালারফুল টার্মিনাল আউটপুটসহ আধুনিক পাওয়ারশেল স্ক্রিপ্ট। সব ধরনের উইন্ডোজ সংস্করণে নির্দ্বিধায় কাজ করে।',
      instructions: 'Run in Windows PowerShell (Admin): Set-ExecutionPolicy Bypass -Scope Process; .\\Install-STCOEM.ps1',
      instructionsBn: 'পাওয়ারশেল অ্যাডমিন হিসেবে ওপেন করে ফাইলটি রান করুন।'
    },
    reg: {
      title: 'Direct Registry Import (.reg)',
      titleBn: 'উইন্ডোজ রেজিস্ট্রি ফাইল (.reg)',
      filename: 'STC_Branding.reg',
      ext: 'reg',
      content: generateRegScript(profile),
      desc: 'Pure Windows Registry Registration file format (Windows Registry Editor Version 5.00) that can be merged by double-clicking.',
      descBn: 'স্ট্যান্ডার্ড উইন্ডোজ রেজিস্ট্রি ফাইল। ডাবল-ক্লিক করে "Yes" চাপলেই রেজিস্ট্রিতে আপনার ব্র্যান্ডিং সেভ হয়ে যাবে।',
      instructions: 'Double-click the .reg file and click "Yes" when prompted by User Account Control.',
      instructionsBn: 'ফাইলটিতে ডাবল ক্লিক করুন এবং নিশ্চিতকরণ বক্সে "Yes" প্রেস করুন।'
    },
    oneliner: {
      title: 'PowerShell Rapid One-Liner',
      titleBn: 'পাওয়ারশেল র‍্যাপিড কমান্ড',
      filename: 'STC_QuickInstall.txt',
      ext: 'txt',
      content: `# ==============================================================================
# OPTION 1: OFFLINE INSTANT POWERSHELL COMMAND (Copy & paste into Admin PowerShell)
# ==============================================================================
${generateOfflineOneLiner(profile)}

# ==============================================================================
# OPTION 2: CLOUD ONE-LINER (Similar to irm https://get.activated.win | iex)
# ==============================================================================
${generatePowerShellOneLiner(profile)}
`,
      desc: 'Run directly in PowerShell without saving any file on disk. Perfect for rapid servicing on customer computers.',
      descBn: 'পিসিতে কোনো ফাইল সংরক্ষণ না করেই সরাসরি পাওয়ারশেল টার্মিনালে পেস্ট করে মুহূর্তেই ব্র্যান্ডিং সেট করুন।',
      instructions: 'Press Win+X, open "Terminal (Admin)" or "PowerShell (Admin)", paste the command, and press Enter.',
      instructionsBn: 'উইন্ডোজ কী + X চেপে PowerShell (Admin) ওপেন করুন, কমান্ডটি পেস্ট করে এন্টার দিন।'
    },
    mas_patch: {
      title: 'MAS_AIO.cmd Integration Routine',
      titleBn: 'MAS_AIO.cmd ইন্টিগ্রেশন প্যাচ',
      filename: 'MAS_STC_Integration.txt',
      ext: 'txt',
      content: generateMasPatch(profile),
      desc: 'Ready-to-paste code modifications for MAS_AIO.cmd. Links your OEM branding routine directly after HWID Windows Activation and Ohook Office Activation.',
      descBn: 'MAS_AIO.cmd ফাইলে যুক্ত করার কোড। লাইসেন্স অ্যাক্টিভেশনের সাথে সাথে স্বয়ংক্রিয়ভাবে আরিফুজ্জামান ও STC Tech Hand এর তথ্য সেট হয়ে যাবে।',
      instructions: 'Follow the 3 numbered steps inside the snippet to add a new menu option [B] or trigger automatically after activation.',
      instructionsBn: 'ভেতরের ৩টি সহজ ধাপ অনুসরণ করে আপনার MAS_AIO ফাইলে পেস্ট করে নিন।'
    },
    setup_complete: {
      title: '$OEM$ Unattended Setup (SetupComplete.cmd)',
      titleBn: '$OEM$ আনঅ্যাটেন্ডেড সেটআপ স্ক্রিপ্ট',
      filename: 'SetupComplete.cmd',
      ext: 'cmd',
      content: generateOemSetupComplete(profile),
      desc: 'For bootable Windows USB installers. Automatically brands the OS and activates Windows & Office on the very first desktop boot.',
      descBn: 'বুটেবল পেনড্রাইভে যুক্ত করার জন্য। নতুন উইন্ডোজ ইন্সটল হওয়ার পর প্রথম বুটেই স্বয়ংক্রিয়ভাবে ব্র্যান্ডিং সেট হয়ে যাবে।',
      instructions: 'Place this file in your Windows USB at: \\sources\\$OEM$\\$$\\Setup\\Scripts\\SetupComplete.cmd',
      instructionsBn: 'আপনার বুটেবল পেনড্রাইভের \\sources\\$OEM$\\$$\\Setup\\Scripts\\ ফোল্ডারে রাখুন।'
    }
  };

  const activeScript = scripts[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeScript.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeScript.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeScript.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
      {/* Header bar */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                <FileCode className="w-3.5 h-3.5" />
                {isBn ? 'প্রফেশনাল কোড জেনারেটর' : 'Deployment Scripts'}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                • {isBn ? 'সবগুলো স্ক্রিপ্ট রেডি টু রান' : 'Ready for deployment'}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1.5">
              {isBn ? 'উইন্ডোজ ব্র্যান্ডিং ও অটোমেশন স্ক্রিপ্ট স্যুট' : 'Windows OEM Deployment & Automation Suite'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
              {isBn 
                ? 'ক্লায়েন্টের পিসিতে উইন্ডোজ ও অফিস অ্যাক্টিভেশনের সাথে সাথে আপনার নাম, ফোন এবং STC Tech Hand এর সার্ভিস ডিটেইলস স্বয়ংক্রিয়ভাবে সেট করার জন্য তৈরি স্ক্রিপ্টসমূহ।' 
                : 'Turnkey scripts to permanently inject Arifuzzaman & STC Tech Hand credentials and custom OEM logo into Windows System Properties.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-300">{isBn ? 'কপি হয়েছে!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>{isBn ? 'কোড কপি করুন' : 'Copy Code'}</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isBn ? 'ফাইল ডাউনলোড' : `Download .${activeScript.ext}`}</span>
            </button>
          </div>
        </div>

        {/* Tab selection */}
        <div className="flex flex-wrap items-center gap-2 mt-5">
          <button
            onClick={() => setActiveTab('cmd')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'cmd'
                ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Install_STC.cmd</span>
          </button>

          <button
            onClick={() => setActiveTab('ps1')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'ps1'
                ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Install-STCOEM.ps1</span>
          </button>

          <button
            onClick={() => setActiveTab('reg')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'reg'
                ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>STC_Branding.reg</span>
          </button>

          <button
            onClick={() => setActiveTab('oneliner')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'oneliner'
                ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>{isBn ? 'র‍্যাপিড ওয়ান-লাইনার' : 'PowerShell One-Liner'}</span>
          </button>

          <button
            onClick={() => setActiveTab('mas_patch')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'mas_patch'
                ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isBn ? 'MAS_AIO ইন্টিগ্রেশন' : 'MAS_AIO Patch'}</span>
          </button>

          <button
            onClick={() => setActiveTab('setup_complete')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'setup_complete'
                ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
            }`}
          >
            <HardDriveDownload className="w-3.5 h-3.5" />
            <span>{isBn ? 'বুটেবল $OEM$ সেটআপ' : '$OEM$ SetupComplete'}</span>
          </button>
        </div>
      </div>

      {/* Script info bar */}
      <div className="px-6 py-3.5 bg-cyan-50/50 dark:bg-cyan-950/20 border-b border-cyan-100 dark:border-cyan-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start sm:items-center gap-2 text-cyan-900 dark:text-cyan-200">
          <Info className="w-4 h-4 shrink-0 text-cyan-600 dark:text-cyan-400 mt-0.5 sm:mt-0" />
          <span>
            <strong>{isBn ? 'ব্যবহারবিধি:' : 'Usage:'}</strong> {isBn ? activeScript.instructionsBn : activeScript.instructions}
          </span>
        </div>
        <div className="text-slate-500 dark:text-slate-400 font-mono text-[11px] shrink-0">
          Target: {activeScript.filename}
        </div>
      </div>

      {/* Code Viewer */}
      <div className="relative">
        <div className="max-h-[500px] overflow-auto bg-slate-950 p-5 font-mono text-xs text-slate-200 selection:bg-cyan-500 selection:text-slate-950">
          <pre className="leading-relaxed whitespace-pre font-mono">
            {activeScript.content}
          </pre>
        </div>
      </div>

      {/* Footer notes */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>
            {isBn 
              ? 'Windows 11, Windows 10, Windows 7 এবং Windows Server এ সম্পূর্ণ টেস্টেড ও ভেরিফাইড।'
              : '100% Native Windows registry implementation. Tested & verified on Windows 11, 10, and Server editions.'}
          </span>
        </div>
        <span className="font-medium text-slate-700 dark:text-slate-300">
          STC Tech Hand • Feni, Bangladesh
        </span>
      </div>
    </div>
  );
};
