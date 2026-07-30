# Deploy

Este é um site Next.js com `output: 'standalone'`, o que o torna compatível
com qualquer plataforma que corra Node.js ou contentores Docker.

## Opção 1 — Docker (recomendado para servidor próprio / VPS)

```bash
docker compose up -d --build
```

Ver [docker.md](docker.md) para detalhes. Basta um servidor com Docker
instalado e a porta 3000 (ou outra, via proxy reverso) acessível.

## Opção 2 — Vercel

O projeto não usa nenhuma funcionalidade específica de outra plataforma, por
isso funciona out-of-the-box na [Vercel](https://vercel.com):

1. Importar o repositório no dashboard da Vercel.
2. Nenhuma variável de ambiente é necessária (ver
   [environment-variables.md](environment-variables.md)).
3. Build command e output ficam ao critério da deteção automática do
   Next.js pela Vercel.

## Opção 3 — Node.js diretamente

```bash
npm ci
npm run build
npm start
```

## Checklist antes de publicar

- [ ] `npm run lint` e `npm run build` sem erros
- [ ] Atualizar `siteUrl` em `src/app/layout.js`, `robots.js` e `sitemap.js`
      se o domínio mudar
- [ ] Confirmar que `public/og-image.jpg` reflete a imagem de partilha atual
- [ ] Testar `/`, `/sobre`, `/atividades/*` e `/galeria` no domínio final
- [ ] Confirmar que o número de WhatsApp em `content/*.json` (`footer.whatsapp`)
      está correto
