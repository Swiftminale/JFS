export interface ScrollSectionItem {
  id: string;
  badge: string;
  tag: string;
  quote: string;
  subtext: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
}

export interface SiteContent {
  site: {
    name: string;
    tagline?: string;
    location: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
  scrollSections: {
    section1: ScrollSectionItem;
    section2: ScrollSectionItem;
    section3: ScrollSectionItem;
    section4: ScrollSectionItem;
  };
  dualCards: {
    import: { tag: string; title: string; description: string; linkText: string; linkUrl: string };
    export: { tag: string; title: string; description: string; linkText: string; linkUrl: string };
  };
  about: {
    title: string;
    paragraphs: string[];
    imageUrl: string;
    badgeText: string;
  };
  whyChoose: {
    title: string;
    pillars: Array<{ id: string; title: string; description: string }>;
  };
  services: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  coffeePage: {
    hero: {
      eyebrow: string;
      headline: string;
      lead: string;
      ctaText: string;
      ctaLink: string;
      imageUrl: string;
      badgeText: string;
    };
    heritage: {
      title: string;
      text: string;
    };
    pillars: Array<{ id: string; title: string; description: string }>;
    callout: {
      title: string;
      subtitle: string;
    };
  };
  customSections: Array<{
    id: string;
    enabled: boolean;
    type: string;
    title: string;
    content: string;
    buttonText?: string;
    buttonLink?: string;
  }>;
}
