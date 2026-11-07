import React from 'react';
import { 
  User, 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  Globe, 
  RotateCcw, 
  Sparkles, 
  SlidersHorizontal,
  FileText,
  Cpu
} from 'lucide-react';
import { TechnicianProfile, Language } from '../types';
import { initialProfile } from '../data/profileData';

interface BrandingCustomizerProps {
  profile: TechnicianProfile;
  onChange: (updated: TechnicianProfile) => void;
  language: Language;
}

export const BrandingCustomizer: React.FC<BrandingCustomizerProps> = ({
  profile,
  onChange,
  language
}) => {
  const isBn = language === 'bn';

  const handleFieldChange = (key: keyof TechnicianProfile, value: string) => {
    onChange({
      ...profile,
      [key]: value
    });
  };

  const handleReset = () => {
    onChange(initialProfile);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {isBn ? 'প্রোফাইল কাস্টমাইজেশন' : 'OEM Identity Parameters'}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              • {isBn ? 'লাইভ প্রিভিউ ও স্ক্রিপ্টে সরাসরি আপডেট' : 'Syncs with scripts & preview'}
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1.5">
            {isBn ? 'ব্র্যান্ডিং ও রেজিস্ট্রি ফিল্ড এডিটর' : 'Technician Branding & Registry Configurator'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
            {isBn
              ? 'এখানে যে তথ্যগুলো লিখবেন তা সাথে সাথে উইন্ডোজ প্রিভিউ এবং সবকটি ইনস্টলার স্ক্রিপ্টে আপডেট হয়ে যাবে।'
              : 'Modify contact numbers, workshop hours, or organization branding to dynamically regenerate all registry keys and deployment scripts.'}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 rounded-lg shadow-sm transition-colors cursor-pointer self-start sm:self-auto shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isBn ? 'আরিফুজ্জামানের তথ্যে রিসেট' : 'Reset to Default'}</span>
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            {isBn ? 'টেকনিশিয়ান / এমডির নাম' : 'Technician / MD Name'}
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            {isBn ? 'প্রতিষ্ঠান / শপ এর নাম' : 'Company / Service Shop'}
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={profile.company}
              onChange={(e) => handleFieldChange('company', e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            {isBn ? 'ঠিকানা / জেলা' : 'Headquarters / Location'}
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={profile.location}
              onChange={(e) => handleFieldChange('location', e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Phone / Hotline */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            {isBn ? 'হটলাইন / মোবাইল নম্বর' : 'Support Phone / Hotline'}
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Support Hours */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            {isBn ? 'সার্ভিস ও সাপোর্ট সময়সূচি' : 'Support Availability / Hours'}
          </label>
          <div className="relative">
            <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={profile.supportHours}
              onChange={(e) => handleFieldChange('supportHours', e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Support URL */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            {isBn ? 'ওয়েবসাইট / সোশ্যাল পেজ' : 'Support URL / Social Page'}
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={profile.supportUrl}
              onChange={(e) => {
                handleFieldChange('supportUrl', e.target.value);
                handleFieldChange('website', e.target.value);
              }}
              className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Manufacturer String */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            {isBn ? 'উইন্ডোজ OEM ম্যানুফ্যাকচারার' : 'OEM Manufacturer String'}
          </label>
          <div className="relative">
            <Cpu className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={profile.manufacturer}
              onChange={(e) => handleFieldChange('manufacturer', e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Model String */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            {isBn ? 'উইন্ডোজ OEM মডেল স্ট্রিং' : 'OEM Model String'}
          </label>
          <div className="relative">
            <Cpu className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={profile.model}
              onChange={(e) => handleFieldChange('model', e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Registered Owner */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            {isBn ? 'রেজিস্টার্ড ওনার (winver)' : 'Registered Owner (winver)'}
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={profile.registeredOwner}
              onChange={(e) => handleFieldChange('registeredOwner', e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Support Notes Multiline */}
      <div className="px-6 pb-6">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
          {isBn ? 'সাপোর্ট ইনফরমেশন ও ক্যারিয়ার হিস্টোরি টেক্সট (SupportNotes)' : 'OEM Support Notes & Verification Summary'}
        </label>
        <div className="relative">
          <textarea
            rows={5}
            value={profile.supportNotes}
            onChange={(e) => handleFieldChange('supportNotes', e.target.value)}
            className="w-full p-3.5 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors leading-relaxed"
          />
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
          {isBn
            ? 'এই টেক্সটটি উইন্ডোজ সিস্টেম প্রোপার্টিজের "Support Information..." বাটনে ক্লিক করলে পপআপে প্রদর্শিত হয়।'
            : 'This multiline block appears verbatim when a user clicks the "Support Information..." button in System Properties.'}
        </p>
      </div>
    </div>
  );
};
