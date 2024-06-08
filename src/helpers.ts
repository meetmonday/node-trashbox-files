
function code(text: string, type: string): string {
  return `\`\`\`${type}\n${text}\`\`\``
}

export { code };
