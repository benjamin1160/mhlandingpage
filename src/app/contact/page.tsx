export const metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <div className="space-y-6 p-8">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <form action="/api/contact" method="post" className="space-y-2">
        <input name="name" placeholder="Name" className="block w-full border p-2" />
        <input name="email" type="email" placeholder="Email" className="block w-full border p-2" />
        <textarea name="message" placeholder="Message" className="block w-full border p-2" />
        <button className="rounded bg-blue-600 px-4 py-2 text-white">Send</button>
      </form>
      <iframe
        src="https://maps.google.com/maps?q=Fort%20Myers&t=&z=13&ie=UTF8&iwloc=&output=embed"
        className="h-64 w-full border"
      ></iframe>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Mobile Homes',
            url: 'https://example.com',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Fort Myers',
              addressRegion: 'FL',
              addressCountry: 'US',
            },
          }),
        }}
      />
    </div>
  );
}
