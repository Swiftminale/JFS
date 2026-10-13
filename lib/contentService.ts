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
          tag: 'AFRICAN PROVERB',
          quote: '“KNOWLEDGE IS LIKE A GARDEN; IF IT IS NOT CULTIVATED, IT CANNOT BE HARVESTED.”',
          subtext: 'Feed that works for Ethiopia’s small farmers.',
          buttonText: 'EXPLORE NOW',
          buttonLink: '#about',
          imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=80'
        },
        section2: {
          id: 'section-2',
          badge: '02',
          tag: 'WHO WE ARE',
          quote: '“EDUCATION IS THE PASSPORT TO THE FUTURE, FOR TOMORROW BELONGS TO THOSE WHO PREPARE FOR IT TODAY.”',
          subtext: 'JFS Trading is committed to empowering Ethiopia’s small-scale poultry farmers with high-quality, customized feed.',
          buttonText: 'OUR SERVICES',
          buttonLink: '#services',
          imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=2000&q=80'
        },
        section3: {
          id: 'section-3',
          badge: '03',
          tag: 'OUR SERVICES',
          quote: '“NOT TO KNOW IS BAD; NOT TO DESIRE TO KNOW IS WORSE.”',
          subtext: 'Custom poultry feed importation, personalized feed blending, nutritional consultation, and coffee export.',
          buttonText: 'GET IN TOUCH',
          buttonLink: '#contact',
          imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=2000&q=80'
        },
        section4: {
          id: 'section-4',
          badge: '04',
          tag: 'CONTACT US',
          quote: '“EDUCATION IS NOT THE LEARNING OF FACTS, BUT THE TRAINING OF THE MIND TO THINK.”',
          subtext: 'Questions about Primix, or need help choosing the right blend? We’re ready to help.',
          buttonText: 'SEND MESSAGE',
          buttonLink: '#contact',
          imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=2000&q=80'
        }
      };
    }

    return parsed;
  } catch (error) {
    console.error('Error reading content file:', error);
    throw new Error('Could not read site content');
  }
}

export function saveContent(updatedContent: Partial<SiteContent>): SiteContent {
  try {
    const current = getContent();
    const merged = { ...current, ...updatedContent };
    fs.writeFileSync(contentFilePath, JSON.stringify(merged, null, 2), 'utf8');
    return merged;
  } catch (error) {
    console.error('Error saving content file:', error);
    throw new Error('Could not save site content');
  }
}
