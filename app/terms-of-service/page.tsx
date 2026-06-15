export const metadata = {
  title: 'Terms of Service | OC Electronic Recycling',
  description: 'Terms of Service for OC Electronic Recycling — website use and general service terms.',
};

export default function TermsOfServicePage() {
  const lastUpdated = 'June 2026';

  return (
    <>
      <section className="section-dark" style={{ padding: '80px 0' }}>
        <div className="container">
          <span className="overline">Legal</span>
          <h1 className="section-title">Terms of Service</h1>
          <p style={{ color: 'var(--muted)', maxWidth: '700px' }}>
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--light)', padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '760px', lineHeight: 1.75, color: 'var(--navy)' }}>

          <h2 style={{ marginTop: '0' }}>Agreement to Terms</h2>
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your use of the OC Electronic Recycling
            website. By accessing or using this website, you agree to be bound by these Terms. If
            you do not agree, please do not use this website.
          </p>

          <h2>Website Use</h2>
          <p>
            This website is provided for informational purposes to describe our e-waste recycling,
            data destruction, and IT Asset Disposition (ITAD) services in Orange County, California.
            You agree to use this website only for lawful purposes and in a manner that does not
            infringe the rights of, or restrict or inhibit the use of, this website by any third party.
          </p>

          <h2>No Guarantee of Availability or Accuracy</h2>
          <p>
            We make reasonable efforts to keep information on this website accurate and up to date,
            but we make no warranties or representations of any kind, express or implied, regarding
            the completeness, accuracy, reliability, or availability of this website or its content.
            Information on this site is subject to change without notice.
          </p>

          <h2>Services Are Subject to Separate Agreement</h2>
          <p>
            Information provided on this website regarding our services, pricing, or processes is
            for general informational purposes only and does not constitute a binding offer. Any
            actual recycling, data destruction, ITAD, or pickup services are subject to separate
            agreement between OC Electronic Recycling and the customer, including specific terms,
            pricing, and documentation provided at the time of service.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, OC Electronic Recycling shall not be liable for
            any indirect, incidental, special, consequential, or punitive damages, or any loss of
            data, revenue, or profits, arising out of or related to your use of this website. This
            website and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis without
            warranties of any kind.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and images, is the
            property of OC Electronic Recycling or its licensors and is protected by applicable
            intellectual property laws. You may not reproduce, distribute, or use this content
            without our prior written permission.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            This website may contain links to third-party websites for your convenience. We do not
            endorse and are not responsible for the content, accuracy, or practices of any
            third-party websites.
          </p>

          <h2>Changes to These Terms</h2>
          <p>
            We may revise these Terms at any time without notice. By continuing to use this website
            after changes are posted, you agree to be bound by the revised Terms.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of California, without regard to
            conflict of law principles.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about these Terms, you can reach us at{' '}
            <a href="tel:9493450285" style={{ color: 'var(--green)' }}>(949) 345-0285</a>{' '}
            or through our{' '}
            <a href="/contact" style={{ color: 'var(--green)' }}>contact page</a>.
          </p>

        </div>
      </section>
    </>
  );
}