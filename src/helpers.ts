
function code(text: string, type: string): string {
  return `\`\`\`${type}\n${text}\`\`\``
}

function extractLink(text: string): string | null {
  // Регулярное выражение для поиска URL
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  
  // Поиск всех совпадений
  const matches = text.match(urlPattern);
  
  // Возвращаем первое совпадение, если оно есть, иначе null
  return matches ? matches[0] : null;
}

export { code, extractLink };
