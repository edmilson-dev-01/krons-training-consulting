# Componentes

Lista de referência dos componentes em `src/components/`, o que fazem e onde
são usados. Todos seguem o mesmo padrão: `Nome/Nome.jsx` + `Nome.module.css`,
texto sempre vindo de `useLanguage().t`, nunca hardcoded.

| Componente                           | Usado em                                            | Função                                                                                  |
| ------------------------------------ | --------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `Navbar`                             | Todas as páginas (via layout de cada rota)          | Menu fixo, esconde ao scroll para baixo, seletor de idioma                              |
| `Hero`                               | `/`                                                 | Secção principal, título, dois CTAs (scroll para Soluções + WhatsApp)                   |
| `About` (`AboutText`, `AboutVisual`) | `/`                                                 | Resumo institucional. `AboutVisual` está órfão (não usado em nenhuma página atualmente) |
| `Gallery`                            | `/`                                                 | Grid de "Soluções" (serviços), liga a `/atividades/[slug]`                              |
| `Timeline`                           | `/`                                                 | "Porquê a KRONS" — marcos/argumentos em linha do tempo                                  |
| `Projects`                           | `/`                                                 | 4 estudos de caso reais, cada um com um slider de 3 fotos                               |
| `Testimonials`                       | `/`                                                 | Testemunhos de clientes                                                                 |
| `Faq`                                | `/`                                                 | Acordeão de perguntas frequentes — mesma fonte de dados do `Chatbot`                    |
| `Partners`                           | `/`                                                 | Logótipos de parceiros/clientes                                                         |
| `GalleryTeaser`                      | `/`                                                 | Link único para `/galeria` (sem grid, sem heading)                                      |
| `Footer`                             | Todas as páginas                                    | Contactos, redes sociais, navegação                                                     |
| `Chatbot`                            | Global (`layout.js`)                                | Assistente flutuante baseado em regras                                                  |
| `WhatsAppButton`                     | Hero, `AboutPage`, `ActivityPage`, `Faq`, `Chatbot` | Botão reutilizável `wa.me` com mensagem pré-definida                                    |
| `AboutPage`                          | `/sobre`                                            | Layout tipo documentação (índice + scroll-spy)                                          |
| `Activity` (`ActivityPage`)          | `/atividades/[slug]`                                | Conteúdo detalhado por atividade                                                        |
| `GalleryPage`                        | `/galeria`                                          | Grid "bento" + lightbox                                                                 |
| `icons/ActivityIcons`                | `Gallery`                                           | Ícones SVG por atividade                                                                |

## Convenções

- **Props mínimas**: a maioria dos componentes de secção não recebe props —
  lê `useLanguage()` diretamente. Componentes reutilizáveis como
  `WhatsAppButton` recebem `label`, `message`, `className`.
- **Animações**: `useRevealOnScroll` aplicado ao `ref` da secção; a classe
  `visible` é adicionada via CSS quando o elemento entra no viewport.
- **Sem estado global** além do idioma (`LanguageContext`) — cada componente
  gere o seu próprio `useState` local (acordeões, sliders, chatbot).
