# JFS Trading CMS & Public Website

A modern editorial web platform and CMS for JFS Trading (Ethiopia Feed & Coffee Export), built with Next.js 15, TypeScript, Tailwind CSS, and Material UI.

## Features

- **4-Section Full-Page Storytelling Experience:**
  - Section 01: Landing Page & Dual Import/Export Cards
  - Section 02: Who We Are & JFS Mission
  - Section 03: Our Services & Custom Announcements
  - Section 04: Contact Details & Interactive Message Form
- **Fixed Panoramic Stage:** Hardware-accelerated cross-fades between high-resolution backdrops with smooth scrolling.
- **Dedicated Coffee Export Page (`/coffee`):** Showcasing Ethiopian coffee heritage, specialty origins, and export processing.
- **Custom Admin CMS (`/admin`):**
  - Section management with live drag-and-drop backdrop upload
  - Services & Why Choose Us editor
  - Custom section and announcement toggles
  - User and credentials administration

## Getting Started

1. Clone repository:
   ```bash
   git clone https://github.com/Swiftminale/JFS.git
   cd JFS
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Run development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Production build:
   ```bash
   npm run build
   npm start
   ```
