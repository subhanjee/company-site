// Trisage Solutions — site content, rebuilt per the "Strategic Repositioning &
// Digital Transformation Architecture" document: pivot from generalized digital
// agency to enterprise Remote Staffing & Talent Solutions provider.
/* eslint-disable */

const COMPANY = {
  name: 'Trisage Solutions',
  tagline: 'Think. Transform. Thrive.',
  email: 'contact@trisagesolutions.com',
};

// Primary nav follows the doc's "Navigation Strategy": Hire Talent, Services,
// Industries (dropdowns), How It Works, Case Studies, + a persistent Contact
// Us action button rendered separately. About / Careers / Blog live in the
// footer only, per the doc's "lead channel purity" guidance.
const NAV_LINKS = [
  { label: 'Hire Talent', href: 'hire-talent.html', children: 'services' },
  { label: 'Services', href: 'services.html', children: 'services' },
  { label: 'Industries', href: 'industries.html', children: 'industries' },
  { label: 'How It Works', href: 'how-it-works.html' },
  { label: 'Case Studies', href: 'case-studies.html' },
];

const FOOTER_LINKS = [
  { label: 'Home', href: 'index.html' },
  { label: 'About Us', href: 'about.html' },
  { label: 'Hire Talent', href: 'hire-talent.html' },
  { label: 'Services', href: 'services.html' },
  { label: 'Industries', href: 'industries.html' },
  { label: 'How It Works', href: 'how-it-works.html' },
  { label: 'Case Studies', href: 'case-studies.html' },
  { label: 'Blog', href: 'blog.html' },
  { label: 'Contact', href: 'contact.html' },
];

// 4.1–4.8 New Core Services — replaces the 15 generalized digital-agency
// services entirely, per "3. Services to Remove" / "4. New Core Services".
const SERVICES = [
  {
    slug: 'remote-software-development', icon: 'code-2',
    title: 'Remote Software Development & Dedicated Developers',
    description: 'Dedicated, full-time engineers embedded directly into your agile workflow.',
    overview: [
      'Provision of dedicated, full-time engineering resources integrated directly into client agile workflows. Focus shifts away from milestone-based project building to continuous deployment, code stability, and product velocity.',
      'Subcategories include Frontend Engineers (React, Vue), Backend Engineers (Node.js, Python), and Enterprise CMS Specialists — vetted for both technical depth and day-to-day communication fluency with your existing team.',
    ],
    items: ['Frontend Engineers (React/Vue)', 'Backend Engineers (Node.js/Python)', 'Enterprise CMS Specialists', 'Agile / Sprint Integration', 'Code Stability & Velocity'],
    accent: 'from-blue-500 to-cyan-400', visualTag: 'Hire in <14 Days',
  },
  {
    slug: 'virtual-assistant', icon: 'user-check',
    title: 'Virtual Assistant Services (Administrative & Executive)',
    description: 'Scalable administrative support built to optimize C-suite productivity.',
    overview: [
      'Scalable administrative architecture designed to optimize C-suite productivity and eliminate operational overhead. Every assistant is matched to your executive workflow, not just a generic task list.',
      'Services include calendar management, inbox triaging, multi-timezone travel scheduling, documentation management, and data systems upkeep — freeing your leadership team to focus on decisions, not admin.',
    ],
    items: ['Calendar & Inbox Management', 'Multi-Timezone Travel Scheduling', 'Documentation Management', 'Data Systems Upkeep', 'Executive Workflow Support'],
    accent: 'from-violet-500 to-fuchsia-500', visualTag: '60-70% Cost Savings',
  },
  {
    slug: 'customer-support', icon: 'headphones',
    title: 'Customer Support Teams & Omnichannel Representatives',
    description: 'Globally distributed, continuous support infrastructure — 24/7/365.',
    overview: [
      'Deployment of globally distributed, continuous (24/7/365) customer support infrastructure built to protect your response times and your brand voice around the clock.',
      'Specialists are fully trained in modern helpdesk systems (Zendesk, Intercom, Freshdesk) and possess verifiable fluency in native English communication standards, so every ticket feels like it was handled in-house.',
    ],
    items: ['24/7/365 Coverage', 'Zendesk / Intercom / Freshdesk', 'Omnichannel Ticket Handling', 'Native English Fluency', 'Brand Voice Consistency'],
    accent: 'from-sky-400 to-indigo-400', visualTag: '24/7/365 Coverage',
  },
  {
    slug: 'finance-accounting', icon: 'calculator',
    title: 'Finance & Accounting Support',
    description: 'Rigidly vetted accounting personnel under strict compliance frameworks.',
    overview: [
      'Rigidly vetted accounting personnel operating under strict data security and compliance frameworks (SOC2, GDPR) to manage your core financial systems with the same discipline as an in-house team.',
      'Coverage includes certified bookkeeping, ledger maintenance, and accounts payable/receivable — structured for clean monthly close and audit-ready records.',
    ],
    items: ['Certified Bookkeeping', 'Ledger Maintenance', 'Accounts Payable / Receivable', 'SOC2 & GDPR Compliant', 'Audit-Ready Records'],
    accent: 'from-emerald-400 to-teal-500', visualTag: 'SOC2 · GDPR',
  },
  {
    slug: 'healthcare-va', icon: 'stethoscope',
    title: 'Healthcare & Medical Virtual Assistants',
    description: 'HIPAA-compliant support that lifts administrative burden off clinical staff.',
    overview: [
      'HIPAA-compliant healthcare support personnel specialized in reducing administrative burdens for medical practices, clinics, and telehealth platforms — so clinical staff can stay focused on patients.',
      'Coverage spans EHR data entry, medical coding, and scheduling, with every specialist vetted specifically for healthcare data handling and compliance discipline.',
    ],
    items: ['EHR Data Entry', 'Medical Coding Support', 'Patient Scheduling', 'HIPAA-Compliant Handling', 'Telehealth Platform Support'],
    accent: 'from-teal-400 to-cyan-500', visualTag: 'HIPAA Compliant',
  },
  {
    slug: 'sales-lead-generation', icon: 'target',
    title: 'Sales Teams & Lead Generation Specialists',
    description: 'Metrics-driven outbound units built to fill corporate pipelines fast.',
    overview: [
      'High-impact, metrics-driven outbound sales units configured to rapidly fill corporate pipelines and scale outbound revenue operations, without the overhead of building an in-house SDR team from scratch.',
      'Every Sales Development Representative is pre-vetted for outbound experience and reporting discipline, and integrates directly into your existing CRM and pipeline stages.',
    ],
    items: ['Pre-Vetted SDRs', 'Outbound Pipeline Building', 'CRM Integration', 'Pipeline Reporting', 'Rapid Ramp-Up'],
    accent: 'from-orange-400 to-red-400', visualTag: 'Pipeline in Weeks',
  },
  {
    slug: 'legal-assistants', icon: 'scale',
    title: 'Legal Assistants',
    description: 'Specialized legal support trained across contract review and discovery.',
    overview: [
      'Specialized legal support staff trained in contract review workflows, trial presentation indexing, case discovery management, and legal transcription protocols.',
      'Every legal assistant is vetted for confidentiality discipline and familiarity with standard legal tooling, so they integrate cleanly into existing case management workflows.',
    ],
    items: ['Contract Review Workflows', 'Case Discovery Management', 'Trial Presentation Indexing', 'Legal Transcription', 'Confidentiality-Vetted'],
    accent: 'from-indigo-500 to-blue-400', visualTag: 'Case-Ready Staff',
  },
  {
    slug: 'real-estate-assistants', icon: 'building-2',
    title: 'Real Estate Assistants',
    description: 'Operational specialists for brokerages and property management firms.',
    overview: [
      'Operational specialists for brokerage firms and property management companies, handling the volume work that slows down transaction velocity and tenant satisfaction.',
      'Coverage includes MLS database entry, tenant communication, transaction coordination, and inbound screening — all run with the responsiveness enterprise clients expect.',
    ],
    items: ['MLS Database Entry', 'Tenant Communication', 'Transaction Coordination', 'Inbound Lead Screening', 'Brokerage Operations Support'],
    accent: 'from-cyan-400 to-emerald-400', visualTag: 'MLS Certified',
  },
];

// 6.4 Industry Applications Module
const INDUSTRIES = [
  { slug: 'technology-saas', icon: 'cpu', title: 'Technology & SaaS', description: 'Dedicated engineers and technical support staff who plug directly into modern product teams and sprint cadences.', compliance: 'Agile-Ready' },
  { slug: 'healthcare-telehealth', icon: 'stethoscope', title: 'Healthcare & Telehealth', description: 'HIPAA-trained virtual assistants for clinics, practices, and telehealth platforms handling sensitive patient data daily.', compliance: 'HIPAA' },
  { slug: 'real-estate', icon: 'building-2', title: 'Real Estate & Property Management', description: 'Operational specialists fluent in MLS systems, tenant workflows, and transaction coordination at scale.', compliance: 'MLS Certified' },
  { slug: 'legal-services', icon: 'scale', title: 'Legal Services', description: 'Confidentiality-vetted legal assistants trained in discovery, contract review, and trial support workflows.', compliance: 'NDA-Bound' },
  { slug: 'financial-services', icon: 'calculator', title: 'Financial Services', description: 'SOC2 and GDPR-compliant accounting and finance personnel for firms that cannot compromise on data security.', compliance: 'SOC2 · GDPR' },
  { slug: 'ecommerce-retail', icon: 'shopping-cart', title: 'E-commerce & Retail', description: 'Customer support and sales teams built for the always-on demands of modern online retail.', compliance: '24/7 Ready' },
];

// 6.5 The "How It Works" Execution Pathway — replaces the old 6-step
// creative-agency process with the doc's 4-stage onboarding pipeline.
const PROCESS_STEPS = [
  { title: 'Discovery', description: 'We scope your exact talent needs, role requirements, and timezone constraints before sourcing a single candidate.' },
  { title: 'Candidate Selection', description: 'A rigorously vetted shortlist — background-checked and skills-tested — delivered within 48 hours.' },
  { title: 'Integration', description: 'Fast onboarding into your existing tools — Slack, Jira, and your workflows — with zero disruption to your team.' },
  { title: 'Ongoing Success Management', description: 'A dedicated account manager monitors performance, timezone overlap, and satisfaction for the life of the engagement.' },
];

// 6.6 Why Choose Us / Institutional Trust Module
const WHY_CHOOSE = [
  { icon: 'shield-check', title: 'Rigorous Vetting', description: 'Multi-stage background checks and skills testing before any candidate reaches your shortlist.' },
  { icon: 'lock', title: 'Multi-Tiered Security', description: 'Layered data security protocols protecting every engagement, from onboarding to offboarding.' },
  { icon: 'clock', title: '4+ Hour Overlap', description: 'Guaranteed timezone overlap with your team for real-time collaboration, every business day.' },
  { icon: 'badge-check', title: 'Compliance-Ready', description: 'SOC2, GDPR, and HIPAA-aligned staffing for regulated industries and enterprise buyers.' },
  { icon: 'zap', title: 'Fast Time-to-Hire', description: 'Enterprise time-to-hire cut from 60+ days to under 14 — without cutting corners on vetting.' },
  { icon: 'users', title: 'Dedicated Account Management', description: 'A single point of contact accountable for performance and continuity, for the life of the engagement.' },
  { icon: 'line-chart', title: 'Transparent Reporting', description: 'Clear visibility into performance, hours, and outcomes — never a black box.' },
  { icon: 'trending-up', title: 'Scalable On-Demand', description: 'Scale a team of one into a team of twenty without rebuilding your hiring pipeline.' },
];

// 6.3 Core Services / Talent Taxonomy — Case Studies (replaces the old
// creative-agency project portfolio). PROJECT_CATEGORIES derives from
// SERVICES so it stays in sync automatically.
const PROJECT_CATEGORIES = ['All', ...SERVICES.map((s) => s.title)];

const PROJECTS = [
  { title: 'Vantage Fintech — Dedicated Engineering Pod', category: 'Remote Software Development & Dedicated Developers', description: 'A 6-engineer dedicated pod embedded into an in-house agile team — feature deployment velocity up 40%.', tags: ['React', 'Node.js', 'Dedicated Pod'], gradient: 'from-blue-600/80 via-indigo-500/60 to-cyan-400/70', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80' },
  { title: 'Northbridge Retail — Enterprise CMS Team', category: 'Remote Software Development & Dedicated Developers', description: 'Dedicated CMS specialists took over a legacy platform migration — delivered 10 weeks ahead of the in-house estimate.', tags: ['CMS', 'Migration', 'Backend'], gradient: 'from-indigo-600/80 via-blue-500/60 to-slate-400/70', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80' },
  { title: 'Aster Capital — Executive Support Bench', category: 'Virtual Assistant Services (Administrative & Executive)', description: 'A bench of 4 executive assistants supporting a C-suite across 3 timezones — 65% reduction in admin overhead cost.', tags: ['Executive VA', 'Multi-Timezone'], gradient: 'from-violet-600/80 via-fuchsia-500/60 to-purple-400/70', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80' },
  { title: 'Meridian Consulting — Founder Ops Support', category: 'Virtual Assistant Services (Administrative & Executive)', description: 'Dedicated VA embedded with a founder handling inbox, travel, and documentation — reclaimed 15+ hours a week.', tags: ['Executive VA', 'Operations'], gradient: 'from-purple-500/80 via-pink-500/60 to-fuchsia-400/70', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80' },
  { title: 'Halcyon SaaS — 24/7 Support Desk', category: 'Customer Support Teams & Omnichannel Representatives', description: 'Fully staffed omnichannel support desk covering all timezones — first-response time cut from 6 hours to 9 minutes.', tags: ['Zendesk', '24/7', 'Omnichannel'], gradient: 'from-sky-500/80 via-indigo-500/60 to-blue-400/70', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80' },
  { title: 'Cobalt Logistics — Customer Success Pod', category: 'Customer Support Teams & Omnichannel Representatives', description: 'A dedicated customer success pod for a logistics platform — CSAT up 22 points within one quarter.', tags: ['Customer Success', 'Support Ops'], gradient: 'from-indigo-500/80 via-sky-500/60 to-cyan-400/70', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80' },
  { title: 'Ledgerline Group — Offshore Bookkeeping Team', category: 'Finance & Accounting Support', description: 'SOC2-compliant bookkeeping team took over full-cycle accounting — monthly close time cut from 12 days to 3.', tags: ['Bookkeeping', 'SOC2'], gradient: 'from-emerald-600/80 via-teal-500/60 to-lime-400/70', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80' },
  { title: 'Praxis Holdings — AP/AR Automation Staff', category: 'Finance & Accounting Support', description: 'Dedicated AP/AR specialists cleared an 18-month invoice backlog within 6 weeks of onboarding.', tags: ['Accounts Payable', 'Finance Ops'], gradient: 'from-teal-500/80 via-emerald-500/60 to-green-400/70', image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1600&q=80' },
  { title: 'Willowbrook Clinic Network — HIPAA VA Team', category: 'Healthcare & Medical Virtual Assistants', description: 'A HIPAA-trained VA team took over EHR data entry and scheduling across 5 clinic locations — no-show rate down 18%.', tags: ['HIPAA', 'EHR', 'Scheduling'], gradient: 'from-teal-400/80 via-cyan-500/60 to-sky-400/70', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80' },
  { title: 'Everwell Telehealth — Patient Coordination Desk', category: 'Healthcare & Medical Virtual Assistants', description: 'Dedicated patient coordination staff for a telehealth platform — average scheduling time cut by 55%.', tags: ['Telehealth', 'Patient Ops'], gradient: 'from-cyan-500/80 via-sky-500/60 to-blue-400/70', image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1600&q=80' },
  { title: 'Ironclad Roofing — Outbound SDR Team', category: 'Sales Teams & Lead Generation Specialists', description: 'A 5-person SDR pod filled a stalled pipeline — qualified appointments up 3.2x in the first 90 days.', tags: ['SDR', 'Outbound', 'Pipeline'], gradient: 'from-orange-500/80 via-amber-500/60 to-red-400/70', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80' },
  { title: 'Fenwick Insurance Group — Lead Gen Desk', category: 'Sales Teams & Lead Generation Specialists', description: 'Dedicated lead generation specialists rebuilt the outbound motion — cost per qualified lead down 45%.', tags: ['Lead Gen', 'Insurance'], gradient: 'from-red-500/80 via-orange-500/60 to-amber-400/70', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1600&q=80' },
  { title: 'Hargrove & Wexler LLP — Discovery Support Team', category: 'Legal Assistants', description: 'A dedicated discovery and transcription team helped clear a multi-year case backlog for a mid-size law firm.', tags: ['Legal', 'Discovery', 'Transcription'], gradient: 'from-indigo-600/80 via-blue-500/60 to-slate-400/70', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80' },
  { title: 'Solstice Title & Escrow — Contract Review Pod', category: 'Legal Assistants', description: 'Legal assistants embedded into a title company\'s workflow cut contract turnaround time from 5 days to 1.', tags: ['Legal', 'Contract Review'], gradient: 'from-blue-600/80 via-indigo-500/60 to-cyan-400/70', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80' },
  { title: 'Coastline Realty Group — MLS Operations Team', category: 'Real Estate Assistants', description: 'A dedicated MLS and transaction coordination team supported a 40-agent brokerage through its busiest quarter ever.', tags: ['MLS', 'Brokerage Ops'], gradient: 'from-cyan-500/80 via-emerald-500/60 to-teal-400/70', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80' },
  { title: 'Harborview Property Management — Tenant Desk', category: 'Real Estate Assistants', description: 'Dedicated tenant communication staff for a multi-property manager — response time cut from 2 days to 4 hours.', tags: ['Property Management', 'Tenant Ops'], gradient: 'from-teal-500/80 via-cyan-500/60 to-sky-400/70', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80' },
];

// 6.7 Testimonials & Client Validation
const TESTIMONIALS = [
  { name: 'Rachel Donovan', role: 'COO, Vantage Fintech', initials: 'RD', rating: 5, quote: 'We saved 50% on recruitment and accelerated feature deployment by 40% within the first quarter. Trisage found engineers who felt like they had been on our team for years.', gradient: 'from-blue-500 to-cyan-400' },
  { name: 'Marcus Chen', role: 'CTO, Halcyon SaaS', initials: 'MC', rating: 5, quote: 'Our first-response time went from six hours to nine minutes. The support pod they built runs like an extension of our own team, not an outsourced vendor.', gradient: 'from-violet-500 to-purple-400' },
  { name: 'Elena Vasquez', role: 'VP of HR, Praxis Holdings', initials: 'EV', rating: 5, quote: 'Time-to-hire dropped from over 60 days to under two weeks. The vetting process alone would have taken our internal team a month per candidate.', gradient: 'from-cyan-400 to-blue-500' },
  { name: 'David Okoro', role: 'Founder, Meridian Consulting', initials: 'DO', rating: 5, quote: 'I got back fifteen hours a week the moment my executive assistant from Trisage came on board. The onboarding was faster than hiring locally ever was.', gradient: 'from-amber-500 to-orange-400' },
  { name: 'Sophia Reyes', role: 'Practice Director, Willowbrook Clinic Network', initials: 'SR', rating: 5, quote: 'HIPAA compliance was our biggest concern going in. Trisage\'s vetting and training put that concern to rest within the first week.', gradient: 'from-teal-500 to-cyan-400' },
  { name: 'James Whitfield', role: 'Managing Partner, Hargrove & Wexler LLP', initials: 'JW', rating: 5, quote: 'The discovery support team cleared a backlog we had been carrying for over a year. Confidentiality and accuracy were never in question.', gradient: 'from-indigo-500 to-violet-400' },
  { name: 'Priya Nandakumar', role: 'VP Sales, Ironclad Roofing', initials: 'PN', rating: 5, quote: 'Qualified appointments tripled in ninety days. The SDR team plugged straight into our CRM and started booking meetings in week two.', gradient: 'from-orange-500 to-red-400' },
  { name: 'Thomas Bergström', role: 'Director of Operations, Coastline Realty Group', initials: 'TB', rating: 5, quote: 'Our MLS operations team handled our busiest quarter on record without a single dropped transaction. That reliability is what keeps us renewing.', gradient: 'from-cyan-500 to-emerald-400' },
  { name: 'Amara Bello', role: 'CEO, Aster Capital', initials: 'AB', rating: 5, quote: 'The 4-hour timezone overlap guarantee actually held up in practice. Every engagement has felt as seamless as hiring down the hall.', gradient: 'from-pink-500 to-rose-400' },
];

// 8. SEO / FAQ content
const FAQS = [
  { question: 'How fast can you place talent on our team?', answer: 'Most roles receive a vetted, background-checked shortlist within 48 hours, with candidates onboarded and working inside your tools in under 14 days — versus the industry average of 60+ days.' },
  { question: 'How rigorous is your vetting process?', answer: 'Every candidate goes through background checks, skills testing, and communication assessments before reaching your shortlist. We only present people we would hire ourselves.' },
  { question: 'Can you guarantee timezone overlap with our team?', answer: 'Yes — every placement is matched to guarantee at least 4 hours of real-time overlap with your core working hours, so collaboration never has to wait until tomorrow.' },
  { question: 'Do you support regulated industries like healthcare, legal, and finance?', answer: 'Yes. We staff HIPAA-trained healthcare virtual assistants, SOC2/GDPR-aligned finance personnel, and confidentiality-vetted legal assistants for exactly these use cases.' },
  { question: 'What happens if a placement isn\'t working out?', answer: 'Your dedicated account manager monitors performance throughout the engagement and will re-source or replace a placement at no additional recruiting cost if it isn\'t the right fit.' },
  { question: 'How much can we realistically save versus domestic hiring?', answer: 'Clients typically see 60–70% savings on labor costs relative to domestic hiring, inclusive of benefits and overhead, while we assume the compliance and payroll localization risk.' },
];

// 1.1 Strategic and Financial Objectives — headline stats
const STATS = [
  { value: 60, suffix: '-70%', label: 'Cost Savings vs. Domestic Hire' },
  { value: 14, suffix: ' Days', label: 'Average Time-to-Hire' },
  { value: 98, suffix: '%', label: 'Placement Retention Rate' },
  { value: 24, suffix: '/7', label: 'Support Coverage Available' },
];

// CRO section — multi-tier team-scale selector for the contact form,
// replacing the old creative-agency "Budget" field.
const TEAM_SCALES = ['1 Team Member', '2 – 5 Team Members', '6 – 15 Team Members', '16 – 50 Team Members', '50+ Team Members'];

// Compliance / trust marks referenced throughout (hero, contact, footer)
const COMPLIANCE_BADGES = ['SOC2', 'GDPR', 'HIPAA-Ready'];

const COUNTRIES = [
  { iso: 'us', name: 'United States', dial: '+1' },
  { iso: 'ca', name: 'Canada', dial: '+1' },
  { iso: 'gb', name: 'United Kingdom', dial: '+44' },
  { iso: 'au', name: 'Australia', dial: '+61' },
  { iso: 'pk', name: 'Pakistan', dial: '+92' },
  { iso: 'in', name: 'India', dial: '+91' },
  { iso: 'ae', name: 'UAE', dial: '+971' },
  { iso: 'af', name: 'Afghanistan', dial: '+93' },
  { iso: 'al', name: 'Albania', dial: '+355' },
  { iso: 'dz', name: 'Algeria', dial: '+213' },
  { iso: 'ar', name: 'Argentina', dial: '+54' },
  { iso: 'am', name: 'Armenia', dial: '+374' },
  { iso: 'at', name: 'Austria', dial: '+43' },
  { iso: 'az', name: 'Azerbaijan', dial: '+994' },
  { iso: 'bh', name: 'Bahrain', dial: '+973' },
  { iso: 'bd', name: 'Bangladesh', dial: '+880' },
  { iso: 'by', name: 'Belarus', dial: '+375' },
  { iso: 'be', name: 'Belgium', dial: '+32' },
  { iso: 'bo', name: 'Bolivia', dial: '+591' },
  { iso: 'ba', name: 'Bosnia & Herzegovina', dial: '+387' },
  { iso: 'br', name: 'Brazil', dial: '+55' },
  { iso: 'bn', name: 'Brunei', dial: '+673' },
  { iso: 'bg', name: 'Bulgaria', dial: '+359' },
  { iso: 'kh', name: 'Cambodia', dial: '+855' },
  { iso: 'cm', name: 'Cameroon', dial: '+237' },
  { iso: 'cl', name: 'Chile', dial: '+56' },
  { iso: 'cn', name: 'China', dial: '+86' },
  { iso: 'co', name: 'Colombia', dial: '+57' },
  { iso: 'cr', name: 'Costa Rica', dial: '+506' },
  { iso: 'hr', name: 'Croatia', dial: '+385' },
  { iso: 'cy', name: 'Cyprus', dial: '+357' },
  { iso: 'cz', name: 'Czech Republic', dial: '+420' },
  { iso: 'dk', name: 'Denmark', dial: '+45' },
  { iso: 'do', name: 'Dominican Republic', dial: '+1' },
  { iso: 'ec', name: 'Ecuador', dial: '+593' },
  { iso: 'eg', name: 'Egypt', dial: '+20' },
  { iso: 'ee', name: 'Estonia', dial: '+372' },
  { iso: 'et', name: 'Ethiopia', dial: '+251' },
  { iso: 'fi', name: 'Finland', dial: '+358' },
  { iso: 'fr', name: 'France', dial: '+33' },
  { iso: 'ge', name: 'Georgia', dial: '+995' },
  { iso: 'de', name: 'Germany', dial: '+49' },
  { iso: 'gh', name: 'Ghana', dial: '+233' },
  { iso: 'gr', name: 'Greece', dial: '+30' },
  { iso: 'gt', name: 'Guatemala', dial: '+502' },
  { iso: 'hk', name: 'Hong Kong', dial: '+852' },
  { iso: 'hu', name: 'Hungary', dial: '+36' },
  { iso: 'is', name: 'Iceland', dial: '+354' },
  { iso: 'id', name: 'Indonesia', dial: '+62' },
  { iso: 'ir', name: 'Iran', dial: '+98' },
  { iso: 'iq', name: 'Iraq', dial: '+964' },
  { iso: 'ie', name: 'Ireland', dial: '+353' },
  { iso: 'il', name: 'Israel', dial: '+972' },
  { iso: 'it', name: 'Italy', dial: '+39' },
  { iso: 'jm', name: 'Jamaica', dial: '+1' },
  { iso: 'jp', name: 'Japan', dial: '+81' },
  { iso: 'jo', name: 'Jordan', dial: '+962' },
  { iso: 'kz', name: 'Kazakhstan', dial: '+7' },
  { iso: 'ke', name: 'Kenya', dial: '+254' },
  { iso: 'kr', name: 'South Korea', dial: '+82' },
  { iso: 'kw', name: 'Kuwait', dial: '+965' },
  { iso: 'kg', name: 'Kyrgyzstan', dial: '+996' },
  { iso: 'la', name: 'Laos', dial: '+856' },
  { iso: 'lv', name: 'Latvia', dial: '+371' },
  { iso: 'lb', name: 'Lebanon', dial: '+961' },
  { iso: 'ly', name: 'Libya', dial: '+218' },
  { iso: 'lt', name: 'Lithuania', dial: '+370' },
  { iso: 'lu', name: 'Luxembourg', dial: '+352' },
  { iso: 'mo', name: 'Macau', dial: '+853' },
  { iso: 'mk', name: 'North Macedonia', dial: '+389' },
  { iso: 'mg', name: 'Madagascar', dial: '+261' },
  { iso: 'my', name: 'Malaysia', dial: '+60' },
  { iso: 'mv', name: 'Maldives', dial: '+960' },
  { iso: 'ml', name: 'Mali', dial: '+223' },
  { iso: 'mt', name: 'Malta', dial: '+356' },
  { iso: 'mx', name: 'Mexico', dial: '+52' },
  { iso: 'md', name: 'Moldova', dial: '+373' },
  { iso: 'mn', name: 'Mongolia', dial: '+976' },
  { iso: 'me', name: 'Montenegro', dial: '+382' },
  { iso: 'ma', name: 'Morocco', dial: '+212' },
  { iso: 'mm', name: 'Myanmar', dial: '+95' },
  { iso: 'np', name: 'Nepal', dial: '+977' },
  { iso: 'nl', name: 'Netherlands', dial: '+31' },
  { iso: 'nz', name: 'New Zealand', dial: '+64' },
  { iso: 'ni', name: 'Nicaragua', dial: '+505' },
  { iso: 'ng', name: 'Nigeria', dial: '+234' },
  { iso: 'no', name: 'Norway', dial: '+47' },
  { iso: 'om', name: 'Oman', dial: '+968' },
  { iso: 'pa', name: 'Panama', dial: '+507' },
  { iso: 'py', name: 'Paraguay', dial: '+595' },
  { iso: 'pe', name: 'Peru', dial: '+51' },
  { iso: 'ph', name: 'Philippines', dial: '+63' },
  { iso: 'pl', name: 'Poland', dial: '+48' },
  { iso: 'pt', name: 'Portugal', dial: '+351' },
  { iso: 'qa', name: 'Qatar', dial: '+974' },
  { iso: 'ro', name: 'Romania', dial: '+40' },
  { iso: 'ru', name: 'Russia', dial: '+7' },
  { iso: 'rw', name: 'Rwanda', dial: '+250' },
  { iso: 'sa', name: 'Saudi Arabia', dial: '+966' },
  { iso: 'sn', name: 'Senegal', dial: '+221' },
  { iso: 'rs', name: 'Serbia', dial: '+381' },
  { iso: 'sg', name: 'Singapore', dial: '+65' },
  { iso: 'sk', name: 'Slovakia', dial: '+421' },
  { iso: 'si', name: 'Slovenia', dial: '+386' },
  { iso: 'so', name: 'Somalia', dial: '+252' },
  { iso: 'za', name: 'South Africa', dial: '+27' },
  { iso: 'es', name: 'Spain', dial: '+34' },
  { iso: 'lk', name: 'Sri Lanka', dial: '+94' },
  { iso: 'sd', name: 'Sudan', dial: '+249' },
  { iso: 'se', name: 'Sweden', dial: '+46' },
  { iso: 'ch', name: 'Switzerland', dial: '+41' },
  { iso: 'sy', name: 'Syria', dial: '+963' },
  { iso: 'tw', name: 'Taiwan', dial: '+886' },
  { iso: 'tj', name: 'Tajikistan', dial: '+992' },
  { iso: 'tz', name: 'Tanzania', dial: '+255' },
  { iso: 'th', name: 'Thailand', dial: '+66' },
  { iso: 'tn', name: 'Tunisia', dial: '+216' },
  { iso: 'tr', name: 'Türkiye', dial: '+90' },
  { iso: 'tm', name: 'Turkmenistan', dial: '+993' },
  { iso: 'ug', name: 'Uganda', dial: '+256' },
  { iso: 'ua', name: 'Ukraine', dial: '+380' },
  { iso: 'uy', name: 'Uruguay', dial: '+598' },
  { iso: 'uz', name: 'Uzbekistan', dial: '+998' },
  { iso: 've', name: 'Venezuela', dial: '+58' },
  { iso: 'vn', name: 'Vietnam', dial: '+84' },
  { iso: 'ye', name: 'Yemen', dial: '+967' },
  { iso: 'zm', name: 'Zambia', dial: '+260' },
  { iso: 'zw', name: 'Zimbabwe', dial: '+263' },
];
