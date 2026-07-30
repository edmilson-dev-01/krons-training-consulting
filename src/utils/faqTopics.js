/**
 * Builds the FAQ topics (question + derived answer) from content already on
 * the site — never invents facts. Shared by the homepage FAQ section and the
 * chatbot, so both surfaces always answer the same way.
 */
export function getFaqTopics(t) {
  const f = t.footer;
  const presenca = t.aboutPage.sections.presenca;
  const historia = t.aboutPage.sections.historia;

  const answers = {
    formacoes: t.gallery.cards.map((c) => `${c.title} — ${c.caption}`).join('\n'),
    contactos: [
      `${f.phoneLabel} ${f.phone}`,
      `${f.whatsappLabel} ${f.whatsapp}`,
      `${f.emailLabel} ${f.email}`,
    ].join('\n'),
    localizacao: [f.address, presenca.paragraphs[0]].join('\n'),
    institucional: historia.paragraphs[0],
  };

  const whatsappTopics = new Set(['duracao', 'inscricao', 'precos']);

  return t.faq.items.map((item) => ({
    ...item,
    answer: item.notPublished || answers[item.id],
    showWhatsapp: whatsappTopics.has(item.id),
  }));
}

/** Finds the first topic whose keywords match the user's free-text input. */
export function matchFaqTopic(topics, input) {
  const query = input.trim().toLowerCase();
  if (!query) return null;
  return (
    topics.find((topic) => topic.keywords.some((kw) => query.includes(kw.toLowerCase()))) || null
  );
}
