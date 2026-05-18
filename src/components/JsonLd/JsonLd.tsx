import Head from "next/head";

export function JsonLd({ id, jsonLd }: { id?: string; jsonLd: unknown }) {
  const json = JSON.stringify(jsonLd);
  return (
    <Head>
      <script
        id={id}
        type="application/ld+json"
        // This must be present in the initial HTML for Rich Results.
        dangerouslySetInnerHTML={{ __html: json }}
      />
    </Head>
  );
}
