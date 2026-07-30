# FAQ para Programadores

> Isto é a FAQ técnica sobre o próprio repositório. Para a FAQ que aparece
> _no site_ para os visitantes (perguntas frequentes sobre formações,
> preços, etc.), ver `content/pt.json` → chave `faq`.

**Porque é que o projeto usa CSS Modules em vez de Tailwind?**
Foi a escolha original do projeto e mantém-se por consistência — todos os
tokens de design vivem em `src/app/globals.css`. Uma migração para Tailwind é
possível no futuro, mas é um esforço grande e não estava no âmbito de nenhuma
das tarefas realizadas até agora.

**Porque é que não há TypeScript?**
O projeto começou e mantém-se em JavaScript puro. Converter ~40 componentes
para TypeScript seria uma alteração grande e arriscada sem benefício imediato
para um site sem lógica de negócio complexa — ver
[Roadmap no README](../README.md#roadmap).

**Como adiciono uma nova atividade/serviço?**
Adiciona uma entrada em `gallery.cards` (título, legenda, `slug`) e uma
entrada correspondente em `activities` (conteúdo detalhado) em **ambos**
`content/pt.json` e `content/en.json`. O `slug` liga automaticamente a
`/atividades/[slug]` via `generateStaticParams`.

**Como adiciono uma imagem nova?**
Converte para WebP, coloca em `src/assets/<pasta-relevante>/`, e importa
estaticamente no componente (`import img from '../../assets/.../foto.webp'`)
para usar com `next/image`. Nunca uses `<img src="/algures.jpg">` direto.

**Porque é que o chatbot não usa uma IA real (ChatGPT, etc.)?**
Decisão explícita do cliente: um bot baseado em regras garante zero risco de
inventar preços, prazos ou informação que não está publicada no site, sem
custo de API nem nova rota de servidor. Ver `src/utils/faqTopics.js`.

**Onde vejo o histórico de decisões técnicas?**
Em [CHANGELOG.md](../CHANGELOG.md) — registo de cada versão e o que mudou.
