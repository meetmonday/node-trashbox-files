import { load } from "cheerio";
import { Context } from "telegraf";
import { FileCollection, FileMetadata } from "../../types/myFiles.js";
import buildMessage from "./buildMessage.js";

async function fetchWebpage(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.text();
    return load(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

function parseMyFiles($): FileCollection {
  const scripts = $('script');
    for (let i = 0; i < scripts.length; i++) {
      const scriptContent = $(scripts[i]).html();
      const jsonRegex = /myfiles_json\s*=\s*({.*?})(?:;|\n|$)/s;

      // Ищем строку, содержащую 'myfiles_json'
      if (scriptContent.includes('myfiles_json') && !scriptContent.includes('google_analytics_domain_name')) {
          // Используем регулярное выражение для извлечения JSON-строки

              const jsonMatch = scriptContent.match(jsonRegex);
          if (jsonMatch && jsonMatch[1]) {
              // Преобразуем JSON-строку в объект
              try {
                  const myfilesJson = JSON.parse(jsonMatch[1]);
                  return myfilesJson;
              } catch (error) {
                  console.error("Ошибка парсинга JSON:", error);
                  return null;
              }
          }
      }
    };
}

function fetchMyFiles(url: string, ctx: Context): boolean {
  fetchWebpage(url).then((html) => {
    const myFiles: FileCollection = parseMyFiles(html);
    buildMessage(myFiles, ctx);
  })
  return false;
}

export default fetchMyFiles;