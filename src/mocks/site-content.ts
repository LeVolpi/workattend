import type { HomePageContent, StaticPageContent } from '@/core/types/content'
import type { AccountAction, NavigationItem } from '@/core/types/navigation'

export const navigationItems: NavigationItem[] = [
  { label: 'Why WorkAttend', href: '/#why' },
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#mobile' },
  { label: 'Use Cases', href: '/#use-cases' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Contact Us', href: '/contact' },
]

export const accountActions: AccountAction[] = [
  { label: 'Login', href: 'https://portal.workattend.com', variant: 'secondary' },
  { label: 'Get Started', href: 'https://portal.workattend.com/Company/Register', variant: 'primary' },
]

export const homePageContent: HomePageContent = {
  problem: {
    kicker: 'Problem / Solution',
    title: 'Stop chasing attendance spreadsheets.',
    before: {
      label: 'Before',
      title: 'Manual tracking slows admins down.',
      text: 'Spreadsheets, messages and paper records make it hard to know who is working, where they are and whether attendance data is reliable.',
    },
    after: {
      label: 'With WorkAttend',
      title: 'Time and attendance becomes simple.',
      text: 'WorkAttend gives teams a mobile attendance app with location-aware punches, admin visibility and cleaner reporting for off-site work.',
    },
  },
  benefits: {
    kicker: 'Core benefits',
    title: 'Everything the hero promises, made practical.',
    items: [
      {
        title: 'Geofence tracking',
        text: 'Confirm punches from approved locations and support teams working off-site.',
      },
      {
        title: 'Single device login',
        text: 'Reduce buddy punching by keeping every employee tied to their own device.',
      },
      {
        title: 'Automated reports',
        text: 'Turn attendance activity into timesheets and reports without spreadsheet cleanup.',
      },
    ],
  },
  demo: {
    kicker: 'See it in action',
    title: 'WorkAttend at a glance.',
    text: 'A quick walkthrough of what WorkAttend is and how it works: employees punch in and out from the mobile app, while admins get clear attendance data and reports.',
  },
  workflow: {
    kicker: 'How it works',
    title: 'From location setup to attendance reports in three steps.',
    text: 'WorkAttend keeps the flow focused: define where work happens, capture attendance from employees, then give admins a clear view of activity and exceptions.',
    steps: [
      'Admin creates company locations and attendance rules.',
      'Employees punch in and out from the mobile app.',
      'Managers review attendance, exceptions and reports from the dashboard.',
    ],
  },
  useCases: {
    kicker: 'Use cases',
    title: 'Built for teams that do not always sit at one desk.',
    items: ['Education', 'Healthcare', 'Hospitality', 'Field workers'],
  },
  preview: {
    kicker: 'App + dashboard',
    title: 'Employees get a simple app. Admins get a clearer day.',
    text: 'The mobile experience stays focused on punch in/out, while the admin dashboard centralizes locations, people, attendance status and reports.',
  },
  pricing: {
    kicker: 'Pricing Plan',
    title: 'Time tracking, attendance, and timesheets, all in one app',
    plans: [
      {
        name: 'Premium',
        price: '€ (upon request)',
        summary: ['Unlimited Employees', 'Unlimited Geo-Fences'],
        intro: 'Everything in Standard, plus:',
        features: [
          'Unlimited subsidiary Companies',
          'Unlimited Departments',
          'Unlimited Historical data available to employees on Mobile App',
          'Unlimited Role-based Access to Work Attend Web Portal',
          'Assign unlimited work locations to employees',
          'Export Unlimited Historical Data to Excel or CSV',
          'Web APIs',
          'Additional charges on exceeding 50000+ transactions per month',
        ],
      },
      {
        name: 'Standard',
        price: '€ 3.00',
        note: 'per user/month',
        summary: ['Up to 50 Employees', '6 Geo-Fences included'],
        intro: 'Everything in Essential, plus:',
        featured: true,
        features: [
          'Assign multiple work locations to employees',
          'Up to 2 subsidiary Companies',
          'Up to 6 Departments',
          'Export up to 6 months historical Data to Excel or CSV',
          'Up to 5 Admin Account Access to Work Attend Web Portal',
          'Punch In/Out on employees’ behalf in case of missed punches',
        ],
      },
      {
        name: 'Essential',
        price: '€ (upon request)',
        summary: ['Up to 20 Employees', '2 Geo-Fences included'],
        intro: 'Everything in Free, plus:',
        features: [
          'Assign multiple work locations to employees',
          'Monthly history available to employees on Mobile App',
          'User management portal',
          'Up to 2 Departments',
        ],
      },
      {
        name: 'Free',
        price: 'Free',
        note: 'per user/month',
        summary: ['Up to 5 Employees', '1 Geo-Fences included'],
        intro: 'Everything you get with Free:',
        features: [
          'Real-Time Clock in and Out',
          'Assign multiple work locations to employees',
          'Activity Tracking - know exactly where your employees are working',
          'Online Timesheets',
          'Rest assured employees are on site with Geo-fencing',
          'On the Go Time-Tracking',
          'Manage work hours on jobs and projects',
          'Client Billing - Track time spent on specific clients. Great for invoicing!',
          'Single Device Sign-In',
          'Maps Display on the mobile App',
          'Android & iOS Work Attend Mobile app',
        ],
      },
    ],
  },
  trust: {
    kicker: 'Trust & support',
    title: 'Backed by Dakar Software.',
    text: 'WorkAttend is positioned as a focused attendance product with app access, admin support and a clear path from trial to daily usage.',
    integration: 'WorkAttend integrates fully with Dakar Payroll enabling you to minimise the complexity of interpreting clockings and translating these to payroll records.',
    badges: ['Dakar Software', 'ISO-oriented delivery', 'Mobile app access', 'Customer support'],
  },
  testimonials: {
    kicker: 'Customer stories',
    title: 'Trusted by teams that keep work moving.',
    items: [
      {
        company: 'Elbros',
        role: 'People Operations Lead',
        quote: 'WorkAttend gives our operations team a clearer attendance picture without adding complexity to the working day.',
        logo: '/elbros.png',
        logoAlt: 'Elbros logo',
      },
      {
        company: 'Citadel',
        role: 'HR Operations Manager',
        quote: 'Managing attendance across different work locations is now more consistent, visible and straightforward for our team.',
        logo: '/citadel.png',
        logoAlt: 'Citadel logo',
      },
      {
        company: 'Farsons Group',
        role: 'Payroll Administration Lead',
        quote: 'The reporting workflow helps us spend less time reconciling attendance records and more time acting on reliable information.',
        logo: '/Farsons-Group.png',
        logoAlt: 'Farsons Group logo',
      },
      {
        company: 'KJM Port Works',
        role: 'Site Operations Coordinator',
        quote: 'Our site teams can record their attendance with a simple process while operations retain the oversight they need.',
        logo: '/KJM-Port-Works.png',
        logoAlt: 'KJM Port Works logo',
      },
    ],
  },
  finalCta: {
    kicker: 'Ready to simplify attendance?',
    title: 'Start tracking attendance smarter.',
    label: 'Contact Us',
    href: '/contact',
  },
}

export const staticPages: StaticPageContent[] = [
  {
    slug: 'chi-siamo',
    kicker: 'Company',
    title: 'Chi siamo',
    description: 'WorkAttend e una soluzione Dakar Software progettata per semplificare la gestione delle presenze.',
    sections: [
      { title: 'Missione', text: 'Aiutare aziende e team distribuiti a controllare presenze, sedi operative e report con un flusso semplice e affidabile.' },
      { title: 'Evoluzione', text: 'La nuova architettura non dipende da WordPress ed e pronta per integrare in futuro area utenti, dashboard, database e servizi server.' },
    ],
  },
  {
    slug: 'servizi',
    kicker: 'Services',
    title: 'Servizi',
    description: 'Mobile attendance, geofencing, dashboard amministrativa e reportistica per team in sede e fuori sede.',
    sections: [
      { title: 'Presenze mobile', text: 'I dipendenti possono timbrare entrata e uscita da un\'esperienza focalizzata e accessibile.' },
      { title: 'Controllo amministrativo', text: 'Manager e amministratori ottengono visibilita su sedi, persone, anomalie e report.' },
    ],
  },
  {
    slug: 'privacy',
    kicker: 'Legal',
    title: 'Privacy',
    description: 'Pagina predisposta per la privacy policy del sito WorkAttend.',
    sections: [
      { title: 'Contenuto legale', text: 'Inserire qui il testo definitivo della privacy policy approvato dal titolare del trattamento.' },
    ],
  },
  {
    slug: 'cookie',
    kicker: 'Legal',
    title: 'Cookie',
    description: 'Pagina predisposta per la cookie policy del sito WorkAttend.',
    sections: [
      { title: 'Cookie policy', text: 'Inserire qui il testo definitivo relativo a cookie tecnici, preferenze e strumenti di misurazione eventualmente adottati.' },
    ],
  },
  {
    slug: 'area-riservata',
    kicker: 'Reserved area',
    title: 'Area riservata',
    description: 'Link diretto verso il portale WorkAttend. Autenticazione e area utenti non sono implementate in questa versione.',
    sections: [
      { title: 'Accesso portale', text: 'Questa pagina mantiene il punto di ingresso all\'area riservata e potra diventare una sezione autenticata in una versione successiva.' },
    ],
  },
]
