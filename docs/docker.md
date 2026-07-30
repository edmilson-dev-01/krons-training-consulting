# Docker

O projeto inclui uma imagem Docker de produção pronta a usar, aproveitando
`output: 'standalone'` do Next.js (`next.config.mjs`).

## Ficheiros

| Ficheiro             | Função                                                                  |
| -------------------- | ----------------------------------------------------------------------- |
| `Dockerfile`         | Build multi-stage (`deps` → `builder` → `runner`) em `node:22-alpine`   |
| `docker-compose.yml` | Sobe o serviço `web` na porta 3000                                      |
| `.dockerignore`      | Exclui `node_modules`, `.next`, `.git`, docs, etc. do contexto de build |

## Uso

```bash
# Build da imagem
docker compose build

# Subir o serviço (http://localhost:3000)
docker compose up

# Subir em background
docker compose up -d

# Parar e remover o contentor
docker compose down
```

Ou sem Compose, diretamente com Docker:

```bash
docker build -t krons-training-consulting .
docker run -p 3000:3000 krons-training-consulting
```

## Detalhes da imagem

- **`deps`**: instala dependências com `npm ci` num layer isolado (cache mais
  eficiente entre builds).
- **`builder`**: copia o código e corre `npm run build`.
- **`runner`**: imagem final mínima — copia apenas `.next/standalone`,
  `.next/static` e `public/`. Não inclui `node_modules` de desenvolvimento nem
  código-fonte.
- Corre como utilizador não-root (`nextjs:nodejs`) por segurança.
- Variáveis `NODE_ENV=production`, `PORT=3000`, `HOSTNAME=0.0.0.0` já vêm
  definidas na imagem — não é preciso um ficheiro `.env` para correr em Docker
  (ver [environment-variables.md](environment-variables.md)).
