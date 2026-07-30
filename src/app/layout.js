import './globals.css';
import { LanguageProvider } from '../i18n/LanguageContext';
import Chatbot from '../components/Chatbot/Chatbot';

const siteUrl = 'https://kronsconsulting.co.mz';
const title = 'Krons Training and Consulting';
const description =
  'KRONS Training and Consulting – formação corporativa, consultoria empresarial e de RH, auditoria ISO 9001 e team building na Beira, Moçambique, desde 2017.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: title,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'pt_MZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>
        <LanguageProvider>
          {children}
          <Chatbot />
        </LanguageProvider>
      </body>
    </html>
  );
}
