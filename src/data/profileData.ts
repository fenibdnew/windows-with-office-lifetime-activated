import { TechnicianProfile, CareerMilestone } from '../types';

export const initialProfile: TechnicianProfile = {
  name: 'ARIFUZZAMAN (Kiron)',
  nickname: 'Kiron',
  role: 'Managing Director',
  company: 'STC Tech Hand',
  location: 'Feni, Bangladesh',
  phone: '+880 1812-345678',
  email: 'arifuzzamanfenibdnew2@gmail.com',
  website: 'https://facebook.com/stctechhand',
  supportUrl: 'https://facebook.com/stctechhand',
  supportHours: 'Sat - Thu: 9:00 AM - 10:00 PM (GMT+6)',
  supportNotes: `STC TECH HAND - Computer Hardware & System Solutions
Managing Director: ARIFUZZAMAN (Kiron)
Headquarters: Feni, Bangladesh

Verified Career Timeline:
• 2026 - Present: Managing Director, STC Tech Hand
• 2022 - 2025: Senior Technician, Digital Computer
• 2017 - 2021: Computer Assistant, Computer Service

Specializations:
- Genuine Windows & Office Deployment & Digital Licensing
- OEM System Properties Customization
- Hardware Diagnostics, Chip-Level Repair & Maintenance
- Custom PC Architecture, Network Setup & High-Performance Optimization

For Support, Service Warranty & Inquiries:
Hotline: +880 1812-345678 | Feni, Bangladesh`,
  model: 'STC Certified Workstation & Service',
  manufacturer: 'STC Tech Hand - ARIFUZZAMAN (Kiron)',
  registeredOwner: 'ARIFUZZAMAN (Kiron)',
  registeredOrganization: 'STC Tech Hand'
};

export const careerMilestones: CareerMilestone[] = [
  {
    period: '2026 – Present',
    role: 'Managing Director & Lead Systems Architect',
    company: 'STC Tech Hand',
    roleBn: 'ম্যানেজিং ডিরেক্টর ও প্রধান সিস্টেম আর্কিটেক্ট',
    companyBn: 'এসটিসি টেক হ্যান্ড (STC Tech Hand)',
    description: 'Directing full operations, enterprise IT servicing, automated Windows/Office deployment pipelines, and custom OEM system engineering in Feni, Bangladesh.',
    descriptionBn: 'প্রতিষ্ঠানের সার্বিক পরিচালনা, করপোরেট আইটি সার্ভিসিং, স্বয়ংক্রিয় উইন্ডোজ/অফিস সেটআপ এবং ব্র্যান্ডেড ওএম সিস্টেম পরিচালনা।',
    skills: ['Executive Leadership', 'OEM Customization', 'Deployment Scripting', 'Client Solutions'],
    active: true
  },
  {
    period: '2022 – 2025',
    role: 'Senior Technician',
    company: 'Digital Computer',
    roleBn: 'সিনিয়র টেকনিশিয়ান',
    companyBn: 'ডিজিটাল কম্পিউটার (Digital Computer)',
    description: 'Led technical diagnostics, motherboard repairs, corporate operating system installations, and specialized hardware troubleshooting for thousands of workstations.',
    descriptionBn: 'হার্ডওয়্যার ডায়াগনস্টিকস, মাদারবোর্ড চিপ লেভেল রিপেয়ারিং, ক্লায়েন্ট ওএস ইন্সটলেশন এবং অ্যাডভান্সড ট্রাবলশুটিং পরিচালনা।',
    skills: ['Hardware Diagnostics', 'Chip-Level Maintenance', 'System Cloning', 'Customer Support']
  },
  {
    period: '2017 – 2021',
    role: 'Computer Assistant',
    company: 'Computer Service',
    roleBn: 'কম্পিউটার অ্যাসিস্ট্যান্ট',
    companyBn: 'কম্পিউটার সার্ভিস (Computer Service)',
    description: 'Handled foundational PC assembly, driver configuration, Windows setup, software maintenance, and day-to-day bench repair operations.',
    descriptionBn: 'পিসি অ্যাসেম্বলিং, ড্রাইভার ও সফটওয়্যার ইন্সটলেশন, বেসিক হার্ডওয়্যার সার্ভিসিং ও ব্যবহারকারী সাপোর্ট প্রদান।',
    skills: ['PC Assembly', 'Windows Installation', 'Driver Troubleshooting', 'Preventive Maintenance']
  }
];
