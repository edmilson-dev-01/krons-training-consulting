# Variáveis de Ambiente

Este projeto **não requer nenhuma variável de ambiente, segredo ou chave de
API** para funcionar — é um site estático sem base de dados, autenticação ou
integração com serviços externos autenticados.

Ver [`.env.example`](../.env.example) para os dois valores opcionais de
runtime (`PORT`, `NODE_ENV`), relevantes apenas ao correr o build de produção
ou o contentor Docker.

## Porquê não há segredos

- **WhatsApp**: o número de contacto (`footer.whatsapp` em
  `content/pt.json`/`en.json`) é público — usado para montar links `wa.me/...`,
  não uma API autenticada.
- **Imagens**: importadas estaticamente do repositório, não vêm de um serviço
  externo com chave de API.
- **Chatbot / FAQ**: baseado em regras (correspondência de palavras-chave),
  sem chamada a nenhuma API de IA — ver [architecture.md](architecture.md).

## Se precisares de adicionar uma variável no futuro

1. Adiciona-a a `.env.example` com um comentário a explicar para que serve.
2. Nunca commites o valor real — só o exemplo/placeholder.
3. Acede-lhe no código com `process.env.NOME_DA_VARIAVEL` (só funciona em
   código server-side, a menos que tenha o prefixo `NEXT_PUBLIC_`).
4. Atualiza esta página e nunca faças commit do `.env` real — apenas o
   `.env.example`. Este é um projeto privado da empresa; qualquer segredo
   deve ser gerido diretamente no ambiente do VPS/servidor, fora do
   repositório.
