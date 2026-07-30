# Instalação

## Pré-requisitos

- [Node.js](https://nodejs.org/) 22 ou superior
- npm (vem com o Node.js)
- Opcional: [Docker](https://www.docker.com/) e Docker Compose, se preferires
  correr o projeto em contentor (ver [docker.md](docker.md))

## Passos

```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd uzoman-2pages

# 2. Instalar dependências
npm install

# 3. Copiar as variáveis de ambiente de exemplo (opcional — não há segredos)
cp .env.example .env

# 4. Correr em modo de desenvolvimento
npm run dev
```

O site fica disponível em [http://localhost:3000](http://localhost:3000).

## Scripts disponíveis

| Script                 | Descrição                                 |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento (Turbopack)   |
| `npm run build`        | Build de produção (`output: standalone`)  |
| `npm start`            | Serve o build de produção                 |
| `npm run lint`         | ESLint sobre `src/`                       |
| `npm run format`       | Formata o código com Prettier             |
| `npm run format:check` | Verifica formatação sem alterar ficheiros |

## Próximos passos

- [Arquitetura do projeto](architecture.md)
- [Variáveis de ambiente](environment-variables.md)
- [Deploy](deploy.md)
