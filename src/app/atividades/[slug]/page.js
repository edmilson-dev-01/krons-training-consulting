import { notFound } from 'next/navigation';
import ActivityPage from '../../../components/Activity/ActivityPage';
import ptContent from '../../../../content/pt.json';

const SLUGS = [
  'formacao-corporativa',
  'consultoria-empresarial',
  'consultoria-rh',
  'team-building-eventos',
];

const TITLES = {
  'formacao-corporativa': 'Formação Corporativa',
  'consultoria-empresarial': 'Consultoria Empresarial',
  'consultoria-rh': 'Consultoria de RH',
  'team-building-eventos': 'Team Building & Eventos',
};

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const title = TITLES[slug];
  if (!title) return {};
  const item = ptContent.activities.items[slug];
  const description = item?.tagline || item?.intro;
  return {
    title: `${title} — Krons Training and Consulting`,
    description,
    openGraph: {
      title: `${title} — Krons Training and Consulting`,
      description,
      url: `/atividades/${slug}`,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!SLUGS.includes(slug)) notFound();
  return <ActivityPage slug={slug} />;
}
