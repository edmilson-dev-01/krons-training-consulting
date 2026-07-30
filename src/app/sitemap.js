const siteUrl = 'https://kronsconsulting.co.mz';

const ACTIVITY_SLUGS = [
  'formacao-corporativa',
  'consultoria-empresarial',
  'consultoria-rh',
  'team-building-eventos',
];

export default function sitemap() {
  const staticRoutes = ['', '/sobre', '/galeria'].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const activityRoutes = ACTIVITY_SLUGS.map((slug) => ({
    url: `${siteUrl}/atividades/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...activityRoutes];
}
