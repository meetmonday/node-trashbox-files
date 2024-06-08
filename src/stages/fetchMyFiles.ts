import { load } from "cheerio";
import { Context } from "telegraf";
import { FileMetadata } from "../../types/FileCollection.js";
import { PrismaClient } from '@prisma/client'
import buildMessage from "./buildMessage.js";

const prisma = new PrismaClient();

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

function parseMyFiles($): Array<FileMetadata> {
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
          let resultFiles: Array<FileMetadata> = [];
          Object.keys(myfilesJson).forEach((id) => {
            myfilesJson[id].topic_id = parseInt(myfilesJson[id].topic_id, 10)
            resultFiles.push(myfilesJson[id])
            pushToDb(myfilesJson[id]).then(async () => {
              await prisma.$disconnect()
            }).catch((e) => console.error)
          });


          return resultFiles;
        } catch (error) {
          console.error("Ошибка парсинга JSON:", error);
          return null;
        }
      }
    }
  };
}

async function pushToDb(el: FileMetadata) {
  const file = await prisma.fileMetadata.create({
    data: {
      file_id: parseInt(el.file_id, 10),
      key: el.key,
      package_name: el.name,
      size: el.size.replace('&nbsp;', ' '),
      topic_id: el.topic_id,
      file_url: el.file_id,
      title: el.title
    }
  })
}

function fetchMyFiles(url: string, ctx: Context): boolean {
  fetchWebpage(url).then((html) => {
    const myFiles = parseMyFiles(html);
    buildMessage(myFiles, ctx);
  })
  return false;
}

export default fetchMyFiles;