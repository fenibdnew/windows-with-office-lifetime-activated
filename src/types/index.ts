export interface TechnicianProfile {
  name: string;
  nickname: string;
  role: string;
  company: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  supportUrl: string;
  supportHours: string;
  supportNotes: string;
  model: string;
  manufacturer: string;
  registeredOwner: string;
  registeredOrganization: string;
}

export interface CareerMilestone {
  period: string;
  role: string;
  company: string;
  roleBn: string;
  companyBn: string;
  description: string;
  descriptionBn: string;
  skills: string[];
  active?: boolean;
}

export type WindowsVersion = 'win11' | 'win10' | 'classic';
export type ScriptType = 'cmd' | 'ps1' | 'reg' | 'mas_patch' | 'oem_setup';
export type Language = 'en' | 'bn';
