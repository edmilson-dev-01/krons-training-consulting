export default function manifest() {
  return {
    name: 'KRONS Training and Consulting',
    short_name: 'KRONS',
    description:
      'Formação corporativa, consultoria empresarial e de RH, auditoria ISO 9001 e team building na Beira, Moçambique, desde 2017.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#a23a32',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
