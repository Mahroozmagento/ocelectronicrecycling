export const metadata = {
  title: 'Privacy Policy | OC Electronic Recycling',
  description: 'Privacy policy for OC Electronic Recycling — how we handle information collected through our website and services.',
  alternates: { canonical: 'https://www.ocelectronicrecycling.com/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'June 2026';

  return (
    <>
      <section className="section-dark" style={{ padding: '80px 0' }}>
        <div className="container">
          <span className="overline">Legal</span>
          <h1 className="section-title">Privacy Policy</h1>
          <p style={{ color: 'var(--muted)', maxWidth: '700px' }}>
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--light)', padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '760px', lineHeight: 1.75, color: 'var(--navy)' }}>

          <h2 style={{ marginTop: '0' }}>Overview</h2>
          <p>
            OC Electronic Recycling (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides this Privacy Policy to explain how
            information is collected and used when you visit our website or contact us about our
            e-waste recycling, data destruction, and IT Asset Disposition (ITAD) services. By using
            our website, you agree to the practices described in this policy.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We may collect information you voluntarily provide to us, such as your name, business
            name, phone number, email address, and details about the equipment or services you
            inquire about, when you fill out a contact form, request a quote, or schedule a pickup.
          </p>
          <p>
            Like most websites, we may also automatically collect limited technical information
            (such as browser type, device type, and pages visited) through standard analytics tools
            to help us understand how visitors use our site.
          </p>

          <h2>How We Use Information</h2>
          <p>We use the information collected solely to:</p>
          <ul>
            <li>Respond to inquiries and provide quotes</li>
            <li>Schedule and coordinate pickups and services</li>
            <li>Maintain records related to data destruction certificates and chain-of-custody documentation, where applicable</li>
            <li>Improve our website and services</li>
          </ul>
          <p>
            We do not sell, rent, or trade your personal information to third parties for marketing
            purposes.
          </p>

          <h2>Analytics, Cookies &amp; Tracking</h2>
          <p>
            We use the following tools to understand how visitors use our website. None of these load until you
            accept cookies via the banner shown on your first visit — if you decline, none of them run, and no
            analytics or advertising cookies are set.
          </p>
          <ul>
            <li>
              <strong>Google Tag Manager &amp; Google Analytics 4</strong> — collects standard usage data such as
              pages viewed, approximate location (city/region level), device and browser type, and referral source.
              We use this to see which pages and marketing channels drive inquiries. See{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)' }}>
                Google&apos;s Privacy Policy
              </a>{' '}
              or opt out site-wide using the{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)' }}>
                Google Analytics Opt-out Browser Add-on
              </a>.
            </li>
            <li>
              <strong>Microsoft Clarity</strong> — records anonymized session replays and heatmaps so we can see
              how visitors use the site and fix confusing pages. Clarity masks form input by default. See{' '}
              <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)' }}>
                Microsoft&apos;s Privacy Statement
              </a>.
            </li>
            <li>
              <strong>AI chat widget</strong> — the chat assistant on this site collects the name, email address
              or phone number, and messages you provide during a conversation. This information is used only to
              respond to your inquiry and follow up with you.
            </li>
            <li>
              <strong>Campaign source tracking</strong> — if you arrive via a tagged link (e.g. from an ad or
              email campaign), we note which source, medium, and campaign brought you here so that, if you submit
              our contact form, we know which marketing effort generated that inquiry. This is stored in your
              browser only and is not a tracking cookie.
            </li>
          </ul>
          <p>
            You can change your cookie choice at any time by clearing your browser&apos;s local storage for this
            site and reloading the page, which will show the consent banner again.
          </p>

          <h2>Information Sharing</h2>
          <p>
            We may share information with trusted service providers who assist us in operating our
            business (for example, scheduling or communication tools), but only as necessary to
            provide our services. We may also disclose information if required to do so by law.
          </p>

          <h2>Data Security</h2>
          <p>
            We take reasonable steps to protect information submitted through our website. However,
            no method of transmission over the internet or electronic storage is completely secure,
            and we cannot guarantee absolute security.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the
            privacy practices or content of those external sites.
          </p>

          <h2>Your Choices</h2>
          <p>
            You may contact us at any time to ask about the information we have collected from you,
            or to request that it be deleted, by reaching out using the contact information below.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this
            page with an updated revision date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, you can reach us at{' '}
            <a href="tel:9492873056" style={{ color: 'var(--green)' }}>(949) 287-3056</a>{' '}
            or through our{' '}
            <a href="/contact" style={{ color: 'var(--green)' }}>contact page</a>.
          </p>

        </div>
      </section>
    </>
  );
}