import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  Cpu, 
  Wrench, 
  ShieldCheck,
  Building
} from 'lucide-react';
import { careerMilestones } from '../data/profileData';
import { Language } from '../types';

interface CareerTimelineProps {
  language: Language;
}

export const CareerTimeline: React.FC<CareerTimelineProps> = ({ language }) => {
  const isBn = language === 'bn';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
            <Award className="w-3.5 h-3.5" />
            {isBn ? 'ভেরিফাইড টেকনিক্যাল জার্নি' : 'Verified Technician History'}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            • {isBn ? '২০১৭ থেকে বর্তমান ২০২৬' : '2017 to Present 2026'}
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1.5">
          {isBn ? 'আরিফুজ্জামান (কিরণ) এর প্রফেশনাল ক্যারিয়ার টাইমলাইন' : 'ARIFUZZAMAN (Kiron) - Professional Career Progression'}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
          {isBn
            ? 'কম্পিউটার অ্যাসিস্ট্যান্ট থেকে শুরু করে সিনিয়র টেকনিশিয়ান এবং বর্তমানে এসটিসি টেক হ্যান্ড এর ম্যানেজিং ডিরেক্টর হিসেবে ৯ বছরেরও বেশি সময়ের সমৃদ্ধ প্রযুক্তিগত অভিজ্ঞতা।'
            : '9+ years of hands-on expertise spanning hardware diagnostics, chip-level troubleshooting, enterprise systems deployment, and managing executive IT services in Feni, Bangladesh.'}
        </p>
      </div>

      <div className="p-6 sm:p-8">
        <div className="relative border-l-2 border-cyan-500/30 dark:border-cyan-500/20 ml-4 sm:ml-6 space-y-10">
          {careerMilestones.map((milestone, idx) => {
            const isActive = milestone.active;

            return (
              <div key={idx} className="relative pl-6 sm:pl-8 group">
                {/* Node icon */}
                <div 
                  className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-110 ${
                    isActive 
                      ? 'bg-cyan-500 border-white dark:border-slate-900 text-white shadow-lg shadow-cyan-500/30 ring-4 ring-cyan-500/20' 
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {isActive ? (
                    <Award className="w-4 h-4" />
                  ) : idx === 1 ? (
                    <Wrench className="w-3.5 h-3.5 text-blue-500" />
                  ) : (
                    <Cpu className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>

                {/* Content Card */}
                <div className={`p-5 rounded-xl border transition-all ${
                  isActive 
                    ? 'bg-gradient-to-br from-cyan-50/50 to-blue-50/20 dark:from-cyan-950/20 dark:to-slate-900/40 border-cyan-200 dark:border-cyan-800/60 shadow-sm' 
                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono tracking-wide ${
                        isActive 
                          ? 'bg-cyan-600 text-white' 
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        {milestone.period}
                      </span>
                      {isActive && (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isBn ? 'বর্তমান ভূমিকা' : 'Current Role'}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Feni, Bangladesh</span>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{isBn ? milestone.roleBn : milestone.role}</span>
                    <span className="text-slate-400 font-normal">@</span>
                    <span className="text-cyan-700 dark:text-cyan-400 font-bold">{isBn ? milestone.companyBn : milestone.company}</span>
                  </h4>

                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {isBn ? milestone.descriptionBn : milestone.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mr-1">
                      {isBn ? 'দক্ষতা:' : 'Key Competencies:'}
                    </span>
                    {milestone.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 text-[11px] rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust & Guarantee Box */}
      <div className="p-6 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-cyan-600/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {isBn ? 'অফিশিয়াল সার্ভিস নিশ্চয়তা ও গ্রাহক আস্থা' : 'Verified Technical Certification & Service Warranty'}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {isBn 
                  ? 'আপনার গ্রাহকদের পিসির System Properties এ এই প্রোফাইলটি দেখে তারা আপনার সেবায় পূর্ণ আস্থা রাখতে পারবে।' 
                  : 'Clients viewing Windows System Properties see verified technician credentials, establishing permanent brand authority.'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            <span>STC Tech Hand • Feni</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
