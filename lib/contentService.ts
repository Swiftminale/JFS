import fs from 'fs';
import path from 'path';

const contentFilePath = path.join(process.cwd(), 'data', 'content.json');

import type { ScrollSectionItem, SiteContent } from '@/types/content';
export type { ScrollSectionItem, SiteContent };

export function getContent(): SiteContent {
  try {
    const rawData = fs.readFileSync(contentFilePath, 'utf8');
    const parsed = JSON.parse(rawData);

    // Fallback if scrollSections not present
    if (!parsed.scrollSections) {
      parsed.scrollSections = {
        section1: {
          id: 'section-1',
          badge: '01',
          tag: '',
          quote: '"Feed that works for Ethiopia’s small farmers."',
          subtext: '',
          buttonText: 'EXPLORE NOW',
          buttonLink: '#about',
          imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=2000&q=80'
        },
        section2: {
          id: 'section-2',
          badge: '02',
          tag: 'WHO WE ARE',
          quote: '“EDUCATION IS THE PASSPORT TO THE FUTURE, FOR TOMORROW BELONGS TO THOSE WHO PREPARE FOR IT TODAY.”',
          subtext: 'JFS Trading is committed to empowering Ethiopia’s small-scale poultry farmers with high-quality, customized feed.',
          buttonText: 'OUR SERVICES',
          buttonLink: '#services',
          imageUrl: 'https://images.unsplash.com/photo-1788240371020-c5ceadce05d6?auto=format&fit=crop&w=2000&q=80'
        },
        section3: {
          id: 'section-3',
          badge: '03',
          tag: 'OUR SERVICES',
          quote: '“NOT TO KNOW IS BAD; NOT TO DESIRE TO KNOW IS WORSE.”',
          subtext: 'Custom poultry feed importation, personalized feed blending, nutritional consultation, and coffee export.',
          buttonText: 'GET IN TOUCH',
          buttonLink: '#contact',
          imageUrl: 'https://images.unsplash.com/photo-1635426670664-ed31eab756fc?auto=format&fit=crop&w=2000&q=80'
        },
        section4: {
          id: 'section-4',
          badge: '04',
          tag: 'CONTACT US',
          quote: '"Questions about Primix, or need help choosing the right blend? We’re ready to help."',
          subtext: '',
          buttonText: '',
          buttonLink: '',
          imageUrl: 'https://images.unsplash.com/photo-1770221091039-ff1cb177ec81?auto=format&fit=crop&w=2000&q=80'
        }
      };
    }

    // Fallback if hero not present
    if (!parsed.hero) {
      parsed.hero = {
        eyebrow: parsed.scrollSections?.section1?.tag || 'JOIN THE GREEN REVOLUTION',
        headline: parsed.scrollSections?.section1?.quote || '"Feed that works for Ethiopia’s small farmers."',
        lead: parsed.scrollSections?.section1?.subtext || 'Custom poultry feed importation and tailored nutritional blends designed for smallholder farmers across Ethiopia.',
        imageUrl: parsed.scrollSections?.section1?.imageUrl || 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=2000&q=80',
        badgeText: '[PHOTO: poultry farm & feed]'
      };
    }

    // Guarantee site object and all essential contact details
    parsed.site = {
      name: parsed.site?.name || 'JFS TRADING',
      tagline: parsed.site?.tagline || 'JOIN THE GREEN REVOLUTION',
      location: parsed.site?.location || 'Addis Ababa, Ethiopia',
      phone: parsed.site?.phone || '+251 91 140 0328',
      email: parsed.site?.email || 'contact@jfs-tradinget.com',
      address: parsed.site?.address || 'Figa, Mesi Building, Addis Ababa',
      hours: parsed.site?.hours || 'Monday to Friday, 9:00 AM to 5:00 PM',
      ...(parsed.site || {}),
    };

    return parsed;
  } catch (error) {
    console.error('Error reading content file:', error);
    throw new Error('Could not read site content');
  }
}

export function saveContent(updatedContent: Partial<SiteContent>): SiteContent {
  try {
    const current = getContent();
    const currentHero = current.hero || {
      eyebrow: 'JOIN THE GREEN REVOLUTION',
      headline: '"Feed that works for Ethiopia’s small farmers."',
      lead: 'Custom poultry feed importation and tailored nutritional blends designed for smallholder farmers across Ethiopia.',
      imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=2000&q=80',
      badgeText: '[PHOTO: poultry farm & feed]',
    };

    const merged: SiteContent = {
      ...current,
      ...updatedContent,
      site: {
        ...current.site,
        ...(updatedContent.site || {}),
      },
      hero: {
        ...currentHero,
        ...(updatedContent.hero || {}),
      },
      scrollSections: {
        ...current.scrollSections,
        ...(updatedContent.scrollSections || {}),
      },
      dualCards: {
        ...current.dualCards,
        ...(updatedContent.dualCards || {}),
      },
      about: {
        ...current.about,
        ...(updatedContent.about || {}),
      },
      whyChoose: {
        ...current.whyChoose,
        ...(updatedContent.whyChoose || {}),
      },
      coffeePage: {
        ...current.coffeePage,
        ...(updatedContent.coffeePage || {}),
      },
    };
    fs.writeFileSync(contentFilePath, JSON.stringify(merged, null, 2), 'utf8');
    return merged;
  } catch (error) {
    console.error('Error saving content file:', error);
    throw new Error('Could not save site content');
  }
}
