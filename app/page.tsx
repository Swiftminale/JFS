import { getContent } from '@/lib/contentService';
import Navbar from '@/components/public/Navbar';
import ScrollStoryNav from '@/components/public/ScrollStoryNav';
import SectionHero from '@/components/public/SectionHero';
import ServicesGrid from '@/components/public/ServicesGrid';
import DynamicSectionRenderer from '@/components/public/DynamicSectionRenderer';
import ContactSection from '@/components/public/ContactSection';
import Footer from '@/components/public/Footer';

export const revalidate = 0; // Ensure live data updates dynamically from CMS

export default function HomePage() {
  const data = getContent();
  const sections = data.scrollSections;

  const backgroundImages = {
    '01': sections.section1.imageUrl,
    '02': sections.section2.imageUrl,
    '03': sections.section3.imageUrl,
    '04': sections.section4.imageUrl,
  };

  return (
    <main style={{ backgroundColor: '#0c1511', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Floating Top Navigation Header */}
      <Navbar
        siteName={data.site.name || 'JFS TRADING'}
        tagline={data.site.tagline || 'FEED & COFFEE EXPORT'}
      />

      {/* Full-Page Scroll Storytelling Controller */}
      <ScrollStoryNav backgroundImages={backgroundImages}>
        {/* ========================================================= */}
        {/* SECTION 1 (01): LANDING PAGE & INTRODUCTION */}
        {/* ========================================================= */}
        <section id="landing" style={{ position: 'relative', width: '100%' }}>
          <SectionHero data={sections.section1} badgeNumber="01" dualCards={data.dualCards} />
        </section>

        {/* ========================================================= */}
        {/* SECTION 2 (02): ABOUT US & WHO WE ARE */}
        {/* ========================================================= */}
        <section id="about" style={{ position: 'relative', width: '100%' }}>
          <SectionHero data={sections.section2} badgeNumber="02" />
        </section>

        {/* ========================================================= */}
        {/* SECTION 3 (03): OUR SERVICES & SOLUTIONS */}
        {/* ========================================================= */}
        <section id="services" style={{ position: 'relative', width: '100%' }}>
          <SectionHero data={sections.section3} badgeNumber="03" hideHeader>
            <ServicesGrid services={data.services} whyChoose={data.whyChoose} />
            <DynamicSectionRenderer sections={data.customSections} />
          </SectionHero>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4 (04): CONTACT US & GET IN TOUCH */}
        {/* ========================================================= */}
        <section id="contact" style={{ position: 'relative', width: '100%' }}>
          <SectionHero data={sections.section4} badgeNumber="04">
            <ContactSection site={data.site} />
          </SectionHero>
          <Footer location={data.site.location} />
        </section>
      </ScrollStoryNav>
    </main>
  );
}
