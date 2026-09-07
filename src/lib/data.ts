// Static data for services, testimonials, FAQs, blog - used when DB not available or as fallback

export const services = [
  {
    slug: "medical-virtual-assistants",
    title: "Medical Virtual Assistants",
    description:
      "Trained administrative professionals who keep your practice running smoothly — from scheduling to patient coordination.",
    icon: "Stethoscope",
    coverImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Appointment scheduling & calendar management",
      "Patient communication & follow-ups",
      "Referral coordination",
      "Medical office administration",
      "Administrative support & workflows",
    ],
    color: "teal",
  },
  {
    slug: "medical-receptionist",
    title: "Medical Receptionist",
    description:
      "Never miss a patient call again. Professional front-desk support that answers, books, and follows up.",
    icon: "Phone",
    coverImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Phone answering & patient inquiries",
      "Appointment booking & reminders",
      "Patient follow-ups",
      "Front-desk overflow support",
    ],
    color: "blue",
  },
  {
    slug: "medical-transcription",
    title: "Medical Transcription",
    description:
      "Accurate clinical documentation — from dictations to referral letters — delivered securely and on time.",
    icon: "FileText",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Clinical transcription",
      "Doctor dictation transcription",
      "Consultation notes & referral letters",
      "Medical documentation",
    ],
    color: "navy",
  },
  {
    slug: "medical-billing",
    title: "Medical Billing & Claims Support",
    description:
      "End billing delays. We handle claims prep, documentation and follow-ups — including SHA and private insurers.",
    icon: "Receipt",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Claims preparation & follow-up",
      "Insurance documentation",
      "Billing administration",
      "NHIF/SHA & private insurance support",
    ],
    color: "teal",
  },
  {
    slug: "patient-support",
    title: "Patient Support",
    description:
      "Human, empathetic patient coordination — onboarding, education admin and care continuity.",
    icon: "HeartHandshake",
    coverImage: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Patient onboarding",
      "Follow-up calls & appointment reminders",
      "Care coordination support",
      "Patient education administration",
    ],
    color: "blue",
  },
  {
    slug: "medical-data-administration",
    title: "Medical Data & Administration",
    description:
      "Clean, secure data handling for EMRs, records, reporting and everyday admin.",
    icon: "Database",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    features: [
      "EMR administration",
      "Data entry & records organization",
      "Document management",
      "Reporting & workflows",
    ],
    color: "navy",
  },
  {
    slug: "telehealth-support",
    title: "Telehealth Support",
    description:
      "Virtual-care coordination for telemedicine — onboarding, scheduling and follow-up done right.",
    icon: "Video",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Telemedicine appointment coordination",
      "Patient onboarding for virtual consults",
      "Virtual consultation support",
      "Follow-up coordination",
    ],
    color: "teal",
  },
];

export const testimonials = [
  {
    name: "Dr. Wanjiku Mwangi",
    role: "Director",
    org: "Parklands Medical Centre, Nairobi",
    type: "client",
    content:
      "AfyaDesk transformed our front desk. Our virtual receptionist handles 80+ calls daily, appointment no-shows dropped by 40%. Professional and reliable.",
    rating: 5,
  },
  {
    name: "Dr. James Ochieng",
    role: "Founder",
    org: "Lakeview Dental Clinic, Kisumu",
    type: "client",
    content:
      "We were drowning in documentation. AfyaDesk's transcription support saves our dentists 10+ hours a week. Accuracy is exceptional.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    role: "Operations Lead",
    org: "TeleHealth UK",
    type: "client",
    content:
      "Outsourcing to Kenya via AfyaDesk was seamless. Excellent English, healthcare-aware, and cost-effective. Time-zone alignment is perfect.",
    rating: 5,
  },
  {
    name: "Emily Carter",
    role: "Practice Manager",
    org: "Austin Family Clinic, USA",
    type: "client",
    content:
      "We hired two virtual assistants in under a week. Scheduling, billing follow-ups and patient messages are handled — our in-house team finally breathes.",
    rating: 5,
  },
  {
    name: "Grace Muthoni",
    role: "Medical Virtual Assistant",
    org: "AfyaDesk Talent • Nairobi",
    type: "talent",
    content:
      "The Readiness Course prepared me for real clinic work. Now I support a UK practice remotely, earn $14/hr paid via M-Pesa, and grow every month.",
    rating: 5,
  },
  {
    name: "Brian Kiprop",
    role: "Medical Receptionist",
    org: "AfyaDesk Talent • Eldoret",
    type: "talent",
    content:
      "I applied without experience, got trained, and now handle calls for a US clinic. Flexible shifts, supportive leads, transparent pay — not gig work.",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "Do virtual assistants provide clinical care or diagnosis?",
    a: "No. AfyaDesk provides administrative and support services only. Our assistants do not diagnose, prescribe, make clinical decisions, or replace licensed healthcare professionals. All clinical work remains with your qualified staff.",
  },
  {
    q: "How do you handle patient data confidentiality?",
    a: "We design workflows around applicable Kenyan data-protection requirements and client security policies — including least-privilege access, secure communication, confidentiality training, and access controls. We adapt to your specific security requirements.",
  },
  {
    q: "What systems do your assistants work with?",
    a: "Our assistants are trained to integrate with your existing tools — EMRs, practice management systems, calendars (Google/Outlook), VoIP/phone systems, and messaging platforms. We adapt to your workflow, not the other way around.",
  },
  {
    q: "Can I start part-time and scale?",
    a: "Absolutely. Choose part-time, full-time or a custom team. Many clients start with 20 hours/week and scale as volume grows. You can increase or decrease support with 14 days' notice.",
  },
  {
    q: "How quickly can I get matched?",
    a: "After your free consultation, we typically match you within 5–7 business days. This includes understanding your workflow, identifying suitable talent, and onboarding.",
  },
  {
    q: "Do you support international clients?",
    a: "Yes. We serve international healthcare organizations across the UK, USA, Australia and East Africa. We offer flexible scheduling to cover your time zone and ensure professional English communication.",
  },
];

export const blogPosts = [
  {
    slug: "what-is-medical-virtual-assistant",
    title: "What Is a Medical Virtual Assistant?",
    excerpt:
      "A complete guide for Kenyan clinics and hospitals: roles, tasks, ROI and how to get started with AfyaDesk.",
    date: "2026-02-10",
    author: "AfyaDesk Team",
    tags: ["Medical VA", "Healthcare Ops"],
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "reduce-administrative-work-kenyan-clinics",
    title: "How Kenyan Clinics Can Reduce Administrative Work by 40%",
    excerpt:
      "Practical workflows to cut appointment overload, documentation backlog and missed calls — without hiring a large in-house team.",
    date: "2026-02-18",
    author: "AfyaDesk Team",
    tags: ["Clinic Management", "Kenya"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "virtual-assistant-vs-traditional-receptionist",
    title: "Medical Virtual Assistants vs Traditional Receptionists",
    excerpt:
      "Cost, coverage, scalability and reliability compared — and when a hybrid model works best.",
    date: "2026-03-01",
    author: "AfyaDesk Team",
    tags: ["Comparison", "Staffing"],
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "telemedicine-virtual-support",
    title: "How Telemedicine Practices Can Use Virtual Support to Scale",
    excerpt:
      "From onboarding to follow-ups: building a virtual care coordination engine for telehealth growth.",
    date: "2026-03-12",
    author: "AfyaDesk Team",
    tags: ["Telehealth", "Growth"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "future-healthcare-outsourcing-kenya",
    title: "The Future of Healthcare Outsourcing in Kenya",
    excerpt:
      "Why Kenya is emerging as a healthcare BPO hub — talent, English proficiency, tech ecosystem and cost advantage.",
    date: "2026-03-20",
    author: "AfyaDesk Team",
    tags: ["Outsourcing", "Kenya"],
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "improve-patient-appointment-management",
    title: "How to Improve Patient Appointment Management",
    excerpt: "6 proven systems to reduce no-shows, fill gaps and improve patient experience.",
    date: "2026-04-02",
    author: "AfyaDesk Team",
    tags: ["Patient Experience", "Ops"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "administrative-support-growing-clinics",
    title: "Medical Administrative Support for Growing Clinics",
    excerpt:
      "When to outsource, what to delegate first and how to measure success in your first 90 days.",
    date: "2026-04-15",
    author: "AfyaDesk Team",
    tags: ["Growth", "Administration"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  },
];

export const pricingPlans = [
  {
    name: "Part-Time Support",
    hours: "Up to 20 hrs / week",
    description: "For smaller practices testing virtual support.",
    features: ["Dedicated VA", "Flexible hours", "Core admin coverage", "Weekly check-in"],
    cta: "Request a Quote",
  },
  {
    name: "Full-Time Assistant",
    featured: true,
    hours: "40 hrs / week",
    description: "Most popular — one dedicated professional embedded in your team.",
    features: [
      "Dedicated full-time VA",
      "Full workflow integration",
      "Priority matching (<7 days)",
      "Performance reporting",
    ],
    cta: "Request a Quote",
  },
  {
    name: "Custom Team",
    hours: "Multiple VAs",
    description: "For hospitals, health startups and scaling orgs.",
    features: ["Team of 2–10+ VAs", "Team lead included", "Custom SLA", "Scalable on demand"],
    cta: "Request Custom Quote",
  },
];

export const industries = [
  {
    slug: "hospitals",
    name: "Hospitals",
    desc: "Overflow, billing, records & coordination",
    tagline: "Scale hospital operations without scaling overhead.",
    description:
      "AfyaDesk gives hospitals flexible remote teams for patient coordination, overflow reception, records, billing support and admin — serving facilities in Kenya and globally.",
    coverImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    challenges: ["High call volumes & missed inquiries", "Appointment backlog & long wait lists", "Billing & insurer paperwork delays", "EMR backlogs & records disorganization"],
    solutions: ["Overflow call handling & patient inquiries", "Appointment scheduling, reminders & waitlist management", "Billing prep, claims docs & follow-ups (SHA/private)", "EMR admin, data entry & reporting"],
    services: ["Medical Virtual Assistants", "Medical Receptionist", "Medical Billing & Claims", "Medical Data & Administration"],
  },
  {
    slug: "clinics",
    name: "Clinics",
    desc: "Full front-desk & admin coverage",
    tagline: "Your full front-desk, handled remotely.",
    description:
      "For busy clinics worldwide — AfyaDesk covers calls, bookings, reminders, inbox and records so clinicians focus on patients, not paperwork.",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    challenges: ["Missed calls during peak hours", "No-shows & last-minute gaps", "Inbox & referral overload", "Thin admin staffing"],
    solutions: ["Dedicated reception & call answering", "Booking, rescheduling & no-show reduction", "Patient messaging & follow-ups", "Daily admin & calendar management"],
    services: ["Medical Receptionist", "Medical Virtual Assistants", "Patient Support", "Telehealth Support"],
  },
  {
    slug: "doctors",
    name: "Doctors",
    desc: "Scribe, schedule, inbox & billing help",
    tagline: "A personal assistant for busy doctors.",
    description:
      "AfyaDesk supports doctors globally with scheduling, documentation support, inbox management and billing admin — non-clinical, under your supervision.",
    coverImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
    challenges: ["Documentation eating into clinical time", "Overflowing inbox & messages", "Scheduling chaos across locations", "Billing admin piling up"],
    solutions: ["Transcription & note formatting support", "Inbox triage & calendar control", "Patient coordination & referrals", "Billing docs & claims follow-up"],
    services: ["Medical Transcription", "Medical Virtual Assistants", "Medical Billing & Claims", "Patient Support"],
  },
  {
    slug: "dentists",
    name: "Dentists",
    desc: "Reception, recalls & transcription",
    tagline: "Fill chairs, not paperwork.",
    description:
      "Dental practices hire AfyaDesk for reception overflow, recall reminders, treatment-plan follow-ups and transcription — keeping chairs full worldwide.",
    coverImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
    challenges: ["Missed new-patient calls", "Recall & hygiene gaps", "Treatment follow-ups slipping", "Notes & letters backlog"],
    solutions: ["Call answering & booking", "Recall campaigns & reminders", "Treatment follow-up calls", "Clinical notes & referral letters"],
    services: ["Medical Receptionist", "Patient Support", "Medical Transcription", "Medical Virtual Assistants"],
  },
  {
    slug: "laboratories",
    name: "Laboratories",
    desc: "Results coordination & data entry",
    tagline: "Results delivered, records clean.",
    description:
      "Labs use AfyaDesk for results coordination, client inquiries, data entry and reporting support — accurate, confidential, scalable.",
    coverImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
    challenges: ["Result delivery delays", "High inquiry volumes", "Data-entry backlogs", "Reporting inconsistencies"],
    solutions: ["Results coordination & dispatch", "Client & patient inquiry handling", "Accurate data entry & QA", "Reports & records organization"],
    services: ["Medical Data & Administration", "Patient Support", "Medical Virtual Assistants", "Telehealth Support"],
  },
  {
    slug: "pharmacies",
    name: "Pharmacies",
    desc: "Orders, inquiries & documentation",
    tagline: "Orders handled, customers answered.",
    description:
      "Pharmacies hire remote support for order coordination, customer inquiries, refill reminders and documentation — without adding headcount.",
    coverImage: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=1200&q=80",
    challenges: ["Phone & chat overload", "Refill & order tracking", "Documentation backlog", "Customer follow-ups"],
    solutions: ["Order & refill coordination", "Customer inquiry handling", "Records & documentation", "Reminder & follow-up workflows"],
    services: ["Patient Support", "Medical Data & Administration", "Medical Virtual Assistants", "Medical Receptionist"],
  },
  {
    slug: "telehealth",
    name: "Telehealth",
    desc: "Virtual coordination at scale",
    tagline: "Virtual care, seamlessly coordinated.",
    description:
      "Telehealth providers scale with AfyaDesk — virtual reception, onboarding, visit coordination, documentation and patient messaging across time zones.",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    challenges: ["Virtual waiting-room chaos", "Onboarding friction", "Cross-time-zone scheduling", "Follow-up gaps"],
    solutions: ["Virtual front-desk & waiting room", "Patient onboarding & tech checks", "Scheduling across UK/US/AU/EA", "Post-visit follow-ups & messaging"],
    services: ["Telehealth Support", "Medical Receptionist", "Patient Support", "Medical Virtual Assistants"],
  },
  {
    slug: "health-startups",
    name: "Health Startups",
    desc: "Ops, support & EMR admin",
    tagline: "Ops capacity on demand.",
    description:
      "Health startups hire AfyaDesk to move fast — ops support, patient messaging, EMR admin, data workflows and back-office without hiring full-time.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    challenges: ["Lean team, growing volume", "Support tickets piling up", "Messy data & tools", "Need to scale fast"],
    solutions: ["Flexible VA teams 20–40+ hrs", "Patient & user support", "EMR / CRM admin & cleanup", "SOPs, reporting & QA"],
    services: ["Medical Virtual Assistants", "Medical Data & Administration", "Patient Support", "Telehealth Support"],
  },
  {
    slug: "specialists",
    name: "Specialists",
    desc: "Referrals, transcription, follow-ups",
    tagline: "Referrals managed, notes done.",
    description:
      "Specialist practices get referral coordination, transcription, prior-auth admin and follow-ups — keeping wait lists moving globally.",
    coverImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80",
    challenges: ["Referral triage delays", "Long dictation backlogs", "Follow-up coordination", "Calendar overbooking"],
    solutions: ["Referral intake & coordination", "Transcription & letter formatting", "Patient follow-ups & recalls", "Calendar & waitlist control"],
    services: ["Medical Transcription", "Medical Virtual Assistants", "Patient Support", "Medical Receptionist"],
  },
  {
    slug: "insurers",
    name: "Insurers",
    desc: "Claims support & documentation",
    tagline: "Claims admin, audit-ready.",
    description:
      "Insurers and TPAs use AfyaDesk for claims documentation, verification support, data entry and follow-ups — detail-driven and confidential.",
    coverImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    challenges: ["Claims doc backlogs", "Verification delays", "Data accuracy risks", "Follow-up overload"],
    solutions: ["Claims prep & doc organization", "Verification & eligibility admin", "Accurate data entry & audits", "Status tracking & follow-ups"],
    services: ["Medical Billing & Claims", "Medical Data & Administration", "Medical Virtual Assistants", "Patient Support"],
  },
];
