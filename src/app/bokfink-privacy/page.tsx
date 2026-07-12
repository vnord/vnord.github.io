import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

const pageUrl = "https://vnord.net/bokfink-privacy/";
const lastUpdatedSv = "12 juli 2026";
const lastUpdatedEn = "12 July 2026";

export const metadata: Metadata = {
  title: "Integritetspolicy för Bokfink | Privacy Policy for Bokfink",
  description:
    "Integritetspolicy för Bokfink, en svensk läsapp för barn. Privacy policy for Bokfink, a Swedish literacy app for children. No personal data is collected in the initial release.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Integritetspolicy för Bokfink | Privacy Policy for Bokfink",
    description:
      "Bokfink samlar inte in personuppgifter i den första versionen. Bokfink does not collect personal data in the initial release.",
    url: pageUrl,
    siteName: "vnord.net",
    locale: "sv_SE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="policy-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function BokfinkPrivacyPage() {
  return (
    <div className="policy-page">
      <article className="policy-article">
        <p className="policy-site-link">
          <Link href="/">vnord.net</Link>
        </p>

        <nav className="policy-lang-nav" aria-label="Language">
          <a href="#svenska">Svenska</a>
          <span aria-hidden="true">·</span>
          <a href="#english">English</a>
        </nav>

        <section id="svenska" lang="sv" className="policy-lang-block">
          <header className="policy-header">
            <h1>Integritetspolicy för Bokfink</h1>
            <p className="policy-updated">Senast uppdaterad: {lastUpdatedSv}</p>
          </header>

          <PolicySection title="Om Bokfink">
            <p>
              Bokfink är en svensk läsapp för barn. Den första versionen fungerar
              utan konto och kan användas offline.
            </p>
          </PolicySection>

          <PolicySection title="Ingen personuppgiftsinsamling">
            <p>
              I den första versionen samlar Bokfink inte in personuppgifter och
              skickar ingen information om den som använder appen till
              utvecklaren eller till tredje part.
            </p>
          </PolicySection>

          <PolicySection title="Lokala framsteg på enheten">
            <p>
              Inlärningsframsteg och information om hur övningarna används sparas
              lokalt på enheten. Det gör att appen kan anpassa övningarna. Den
              informationen lämnar inte enheten.
            </p>
          </PolicySection>

          <PolicySection title="Radering">
            <p>
              När du raderar appen tas den lokalt sparade informationen bort från
              enheten.
            </p>
          </PolicySection>

          <PolicySection title="Konton, reklam, analys och innehåll">
            <p>
              Den första versionen har inga användarkonton, ingen reklam, ingen
              spårning, ingen analys från tredje part och inget
              användargenererat innehåll. Området för vuxna skyddas med en
              föräldraspärr som körs på enheten.
            </p>
          </PolicySection>

          <PolicySection title="Barns integritet">
            <p>
              Bokfink är utformad för att minimera användning av data. Appen ber
              inte barn att lämna personuppgifter.
            </p>
          </PolicySection>

          <PolicySection title="Ändringar">
            <p>
              Om appens beteende ändras uppdateras den här policyn.
            </p>
          </PolicySection>

          <PolicySection title="Kontakt">
            <p>
              Frågor om den här policyn kan skickas till{" "}
              <a href="mailto:ari@vnord.net">ari@vnord.net</a>.
            </p>
          </PolicySection>
        </section>

        <hr className="policy-divider" />

        <section id="english" lang="en" className="policy-lang-block">
          <header className="policy-header">
            <h1>Privacy Policy for Bokfink</h1>
            <p className="policy-updated">Last updated: {lastUpdatedEn}</p>
          </header>

          <PolicySection title="About Bokfink">
            <p>
              Bokfink is a Swedish literacy app for children. The initial release
              is accountless and works offline.
            </p>
          </PolicySection>

          <PolicySection title="No personal data collection">
            <p>
              In the initial release, Bokfink does not collect personal data and
              does not transmit learner information to the developer or to third
              parties.
            </p>
          </PolicySection>

          <PolicySection title="On-device learning progress">
            <p>
              Learning progress and interaction evidence are stored locally on
              the device so the app can adapt practice. That information does not
              leave the device.
            </p>
          </PolicySection>

          <PolicySection title="Deletion">
            <p>
              Deleting the app removes its locally stored information from the
              device.
            </p>
          </PolicySection>

          <PolicySection title="Accounts, ads, analytics, and content">
            <p>
              The initial release has no user accounts, advertising, tracking,
              third-party analytics, or user-generated content. The Grown-up Area
              is protected by an on-device parental gate.
            </p>
          </PolicySection>

          <PolicySection title="Children's privacy">
            <p>
              Bokfink is designed to minimize data use. The app does not ask
              children to provide personal information.
            </p>
          </PolicySection>

          <PolicySection title="Changes">
            <p>
              If the app&apos;s behavior changes, this policy will be updated.
            </p>
          </PolicySection>

          <PolicySection title="Contact">
            <p>
              Questions about this policy can be sent to{" "}
              <a href="mailto:ari@vnord.net">ari@vnord.net</a>.
            </p>
          </PolicySection>
        </section>
      </article>
    </div>
  );
}
