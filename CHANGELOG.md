# Changelog

Todas as alterações relevantes deste projeto são documentadas neste ficheiro.
O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [Não lançado]

### Adicionado

- Preparação do repositório privado para uso interno da equipa e deploy em
  VPS: README completo, `LICENSE` (todos os direitos reservados),
  `.env.example`, `docs/`, CI (`.github/workflows/ci.yml`), Dependabot,
  Prettier, EditorConfig, Husky + lint-staged.
- `manifest.js`, `not-found.js`, `error.js` e `loading.js` (App Router).

### Corrigido

- Nome da imagem Docker no `docker-compose.yml` (estava desatualizado).

### Removido

- Ficheiros de comunidade open-source (`CODE_OF_CONDUCT.md`,
  `CONTRIBUTING.md`, `SECURITY.md`, templates de issue/PR) — este é um
  repositório privado da empresa, não um projeto público a receber
  contribuições externas.

## [0.4.0] — 2026-07-29

### Adicionado

- Página dedicada `/galeria` com mosaico "bento" (11 fotos, tiles em destaque
  maiores) e lightbox com navegação por teclado.
- Secção "Perguntas Frequentes" na homepage e assistente virtual (chatbot)
  baseado em regras, sem IA externa — respostas derivadas apenas do conteúdo
  já publicado no site.
- Botão de WhatsApp uniformizado (Hero, `/sobre`, `/atividades/[slug]`) com
  mensagem pré-definida por contexto.

## [0.3.0] — 2026-07-24

### Adicionado

- Suporte a Docker (`Dockerfile` multi-stage, `docker-compose.yml`).
- SEO: Open Graph, Twitter Card, `robots.js`, `sitemap.js`, `metadataBase`.
- Hook partilhado `useRevealOnScroll` (elimina duplicação em 7 componentes).

### Corrigido

- Atualização do Next.js (correção de CVEs conhecidas).
- Erro de lint bloqueante em `Footer.jsx`.

### Alterado

- Migração de `<img>` para `next/image` em `Projects` e `Testimonials`.
- Fotos de testemunhos deixaram de ser hotlinked do Unsplash.

## [0.2.0] — 2026-07-XX

### Alterado

- Todas as imagens de `src/assets` convertidas para WebP, com referências
  atualizadas em todo o projeto.

## [0.1.0] — Lançamento inicial

- Site institucional da KRONS Training and Consulting: Hero, Sobre, Soluções,
  Timeline, Projetos, Testemunhos, Parceiros, Rodapé — bilingue PT/EN.
