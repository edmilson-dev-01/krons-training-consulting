# Arquitetura

## Visão geral

Site institucional estático, construído com **Next.js 16 (App Router,
Turbopack)** e **React 19**. Não existe base de dados, autenticação nem API
externa — todo o conteúdo é conhecido em build-time e as páginas são geradas
estaticamente (SSG).

```
┌─────────────────────────────────────────────┐
│                  Browser                     │
└───────────────────┬───────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│  Next.js App Router (SSG, output: standalone)│
│                                               │
│  content/pt.json ─┐                          │
│  content/en.json ─┴─► LanguageContext (i18n) │
│                        │                     │
│                        ▼                     │
│                   Componentes React          │
│                   (CSS Modules)              │
└─────────────────────────────────────────────┘
```

## Rotas (`src/app/`)

| Rota                          | Tipo                         | Descrição                                                                                           |
| ----------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------- |
| `/`                           | SSG                          | Homepage: Hero, Sobre, Soluções, Timeline, Projetos, Testemunhos, FAQ, Parceiros, teaser da Galeria |
| `/sobre`                      | SSG                          | Página "Quem Somos" — índice lateral com scroll-spy                                                 |
| `/atividades/[slug]`          | SSG (`generateStaticParams`) | Subpágina de cada atividade                                                                         |
| `/galeria`                    | SSG                          | Grelha de fotos em mosaico + lightbox                                                               |
| `/manifest.webmanifest`       | Metadata route               | PWA manifest                                                                                        |
| `/robots.txt`, `/sitemap.xml` | Metadata routes              | SEO                                                                                                 |

Ficheiros especiais do App Router: `layout.js` (metadata + providers),
`not-found.js`, `error.js`, `loading.js`.

## Internacionalização (i18n)

- **Fonte única de verdade**: `content/pt.json` e `content/en.json`. As duas
  línguas mantêm exatamente a mesma estrutura de chaves — nenhum texto vive
  hardcoded em componentes.
- `src/i18n/LanguageContext.jsx` expõe `useLanguage()` → `{ lang, setLang, t }`,
  com `t` a apontar para o JSON da língua ativa. A troca de língua é
  client-side (sem reload), com uma transição suave de fade.
- Não existem rotas localizadas (`/en/...`) — a língua é um estado de UI, não
  de URL.

## Componentes (`src/components/`)

Cada componente vive na sua própria pasta com `Componente.jsx` +
`Componente.module.css`. Destaques:

- **`WhatsAppButton/`** — botão reutilizável que gera o link `wa.me/<número>`
  com mensagem pré-definida; usado no Hero, em `/sobre`, em `/atividades/[slug]`
  e no chatbot.
- **`Chatbot/`** + **`Faq/`** — partilham a mesma fonte de dados
  (`src/utils/faqTopics.js`), que deriva as respostas diretamente de campos já
  existentes no `content/*.json` (nunca inventa informação).
- **`GalleryTeaser/`** + **`GalleryPage/`** — teaser minimalista na homepage
  (apenas um link) e a página dedicada com o grid completo.

## Hooks (`src/hooks/`)

- `useRevealOnScroll` — anima secções/cards ao entrarem no viewport
  (`IntersectionObserver`), respeitando `prefers-reduced-motion`.
- `useScrollDirection` — deteta scroll para cima/baixo (usado para esconder o
  chatbot ao descer a página).

## Imagens (`src/assets/`)

Todas as imagens usadas no site são **WebP**, importadas estaticamente
(`import img from '../../assets/x.webp'`) e servidas via `next/image`
(resize automático, `srcset`, lazy loading). As pastas numeradas
(`1 - TRAINIBG PROCURWMENT COPMZ/`, etc.) são o material bruto original do
cliente, mantidas como arquivo — as versões efetivamente usadas no site vivem
em `src/assets/projects/`, `src/assets/gallery/` e `src/assets/teambuilding/`.

## Design system

Tokens de cor/tipografia centralizados em `src/app/globals.css` (`:root`) —
ver o [README](../README.md#design-system) para a paleta completa.
