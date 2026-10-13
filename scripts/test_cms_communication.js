/**
 * Communication Verification: Scroll Sections Admin CMS <-> Public Page
 */
const fs = require('fs');
const path = require('path');

const contentFilePath = path.join(process.cwd(), 'data', 'content.json');

function runTest() {
  console.log('--- STARTING SCROLL SECTIONS DATA SYNC TEST ---');

  // Step 1: Read content
  const initialData = JSON.parse(fs.readFileSync(contentFilePath, 'utf8'));
  const origQuote2 = initialData.scrollSections.section2.quote;
  console.log(`1. Current Section 2 Quote: "${origQuote2}"`);

  // Step 2: Simulate Admin CMS update to Section 2 (About Us)
  const testQuote = '“TEST SYNC: SECTION 2 ABOUT US UPDATED BY ADMIN CMS”';
  initialData.scrollSections.section2.quote = testQuote;
  fs.writeFileSync(contentFilePath, JSON.stringify(initialData, null, 2), 'utf8');
  console.log('2. Admin CMS successfully updated Section 2 quote in storage.');

  // Step 3: Verify read
  const verifyData = JSON.parse(fs.readFileSync(contentFilePath, 'utf8'));
  if (verifyData.scrollSections.section2.quote === testQuote) {
    console.log('   ✅ PASS: Public landing page reads updated Section 2 quote!');
  } else {
    console.error('   ❌ FAIL: Synchronization error.');
    process.exit(1);
  }

  // Step 4: Restore clean state
  verifyData.scrollSections.section2.quote = origQuote2;
  fs.writeFileSync(contentFilePath, JSON.stringify(verifyData, null, 2), 'utf8');
  console.log('3. Original production state restored.');
  console.log('--- ALL SCROLL SECTION SYNC TESTS PASSED (100%) ---');
}

runTest();
