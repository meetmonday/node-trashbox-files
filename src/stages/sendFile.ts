import { FileMetadata, PrismaClient } from "@prisma/client";
import { Context } from "telegraf";
import { downloadFile } from "./downloadFile.js";
import { readFileSync } from "fs";

const prisma = new PrismaClient();

async function sendFile(ctx: Context, file_id: number) {
  const fP = await getParams(file_id);
  const tgfP = await getTelegramFileId(fP.package_name);
  await prisma.$disconnect();

  if (tgfP) {
    console.log(`Sending ${fP.package_name} from telegram storage...`);
    ctx.sendDocument(tgfP.file_id);
  } else {
    console.log(`Sending ${fP.package_name} from internal storage...`);
    const downtime = Math.round(parseInt(fP.size.split(" ")[0]) / 7);
    if (downtime > 5)
      ctx.sendMessage(`Ожидаемое время загрузки ${fP.size}: ${downtime} сек.`);
    const FileDownloadUrl = `https://trashbox.ru/files20/${fP.file_url}_${fP.key}/${fP.package_name}`;
    downloadFile(FileDownloadUrl, ".temp/", fP.package_name).then((e) => {
      ctx.sendChatAction("upload_document");
      ctx
        .sendDocument({ source: readFileSync(e), filename: fP.package_name })
        .then((f) => {
          saveTelegramFileId(
            f.document.file_name,
            f.document.file_id,
            f.document.file_unique_id
          );
        });
    });
  }
}

async function getParams(id: number) {
  return await prisma.fileMetadata.findFirst({
    where: {
      file_id: id,
    },
  });
}

async function getTelegramFileId(name: string) {
  return await prisma.telegramFiles.findFirst({
    where: {
      file_name: name,
    },
  });
}

async function saveTelegramFileId(
  name: string,
  file_id: string,
  file_unique_id: string
) {
  return await prisma.telegramFiles.create({
    data: {
      file_id,
      file_unique_id,
      file_name: name,
    },
  });
}

export default sendFile;
