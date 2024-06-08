import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { URL } from 'url';
import { pipeline } from 'stream/promises';

// Типы для fetch API
import type { Response } from 'node-fetch';

/**
 * Загружает файл по указанному URL и сохраняет его на диск.
 * @param url - URL файла для загрузки.
 * @param outputDir - Директория для сохранения файла.
 * @param outputFilename - Имя файла для сохранения.
 * @returns Путь к сохраненному файлу.
 * @throws Ошибка, если загрузка или сохранение файла не удались.
 */
export async function downloadFile(url: string, outputDir: string, outputFilename?: string): Promise<string> {
  // Создание полного пути для сохранения файла
  const outputLocationPath = resolve(outputDir, outputFilename || new URL(url).pathname.split('/').pop() || 'downloaded_file');

  try {
    // Проверяем, существует ли файл
    if (existsSync(outputLocationPath)) {
      console.log(`File already exists at ${outputLocationPath}`);
      return outputLocationPath;
    }

    // Выполнение запроса
    const res: Response = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    }

    // Создаем директорию, если ее нет
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // Создаем поток записи на диск
    const fileStream = createWriteStream(outputLocationPath);

    // Используем pipeline для пайпинга потока данных
    await pipeline(res.body, fileStream);

    console.log(`File downloaded successfully to ${outputLocationPath}`);

    // Возвращаем путь к сохраненному файлу
    return outputLocationPath;
  } catch (error) {
    console.error(`Error downloading the file: ${(error as Error).message}`);
    throw error;
  }
}
