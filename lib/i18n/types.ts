export type Locale = "en" | "ar";

export interface NavItem {
  label: string;
  href: string;
}

export interface Dictionary {
  locale: Locale;
  dir: "ltr" | "rtl";

  nav: {
    home: string;
    services: string;
    industries: string;
    caseStudies: string;
    insights: string;
    about: string;
    contact: string;
    getInTouch: string;
    bookConsultation: string;
    viewAllServices: string;
    viewAllIndustries: string;
    categories: {
      systems: string;
      finance: string;
      strategy: string;
      growth: string;
    };
    ariaMenu: string;
    ariaClose: string;
  };

  languageSwitcher: {
    label: string;
    en: string;
    ar: string;
    currentLanguage: string;
  };

  languageBanner: {
    prompt: string;
    accept: string;
    decline: string;
    dismissAria: string;
  };

  footer: {
    brandDescription: string;
    allSystemsOperational: string;
    servicesTitle: string;
    companyTitle: string;
    connectTitle: string;
    freeResourcesTitle: string;
    downloadGuides: string;
    copyright: string;
    privacyPolicy: string;
    termsOfService: string;
    locations: string;
    hours: string;
  };

  hero: {
    overline: string;
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    description: string;
    bookConsultation: string;
    exploreServices: string;
    stats: {
      projects: { value: string; label: string };
      retention: { value: string; label: string };
      efficiency: { value: string; label: string };
      experts: { value: string; label: string };
    };
  };

  trusted: {
    heading: string;
  };

  challenge: {
    overline: string;
    title: string;
    subtitle: string;
    fragmentedTitle: string;
    fragmentedDesc: string;
    unifiedTitle: string;
    unifiedDesc: string;
    painPoints: {
      title: string;
      desc: string;
    }[];
    cta: string;
  };

  servicesSection: {
    overline: string;
    title: string;
    description: string;
    viewAll: string;
    learnMore: string;
  };

  industriesSection: {
    overline: string;
    title: string;
    description: string;
    viewAll: string;
  };

  processSection: {
    overline: string;
    title: string;
    subtitle: string;
    steps: {
      number: string;
      title: string;
      desc: string;
    }[];
  };

  caseStudiesSection: {
    overline: string;
    title: string;
    description: string;
    viewAll: string;
    readCaseStudy: string;
    resultsLabel: string;
  };

  testimonialsSection: {
    overline: string;
    title: string;
    subtitle: string;
    testimonials: {
      quote: string;
      author: string;
      role: string;
      company: string;
    }[];
  };

  insightsSection: {
    overline: string;
    title: string;
    description: string;
    readMore: string;
    viewAll: string;
  };

  ctaBanner: {
    overline: string;
    title: string;
    description: string;
    bookConsultation: string;
    contactUs: string;
  };

  contactSection: {
    overline: string;
    title: string;
    description: string;
    formTitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    company: string;
    companyPlaceholder: string;
    serviceInterest: string;
    selectService: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    errorMessage: string;
    nairobiOffice: string;
    mombasaOffice: string;
    middleEastDesk: string;
    emailLabel: string;
    phoneLabel: string;
    workingHours: string;
  };

  bookingModal: {
    title: string;
    description: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    service: string;
    notes: string;
    notesPlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    close: string;
  };

  common: {
    backToHome: string;
    readMore: string;
    viewDetails: string;
    getStarted: string;
    downloadGuide: string;
    loading: string;
    all: string;
    share: string;
  };

  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    homeTitle: string;
    homeDescription: string;
    servicesTitle: string;
    servicesDescription: string;
    industriesTitle: string;
    industriesDescription: string;
    caseStudiesTitle: string;
    caseStudiesDescription: string;
    aboutTitle: string;
    aboutDescription: string;
    contactTitle: string;
    contactDescription: string;
    bookTitle: string;
    bookDescription: string;
    insightsTitle: string;
    insightsDescription: string;
    resourcesTitle: string;
    resourcesDescription: string;
    privacyTitle: string;
    privacyDescription: string;
    termsTitle: string;
    termsDescription: string;
    thankYouTitle: string;
    thankYouDescription: string;
  };
}
