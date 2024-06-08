import { FileMetadata, PrismaClient } from "@prisma/client";
import { Context } from "telegraf";
import { downloadFile } from './downloadFile.js'; 
import { readFileSync } from "fs";

const prisma = new PrismaClient();

async function sendFile(ctx: Context, file_id: number) {
  const fileParams = await getParams(file_id);
  await prisma.$disconnect();

  console.log(fileParams)
  const FileDownloadUrl = `https://trashbox.ru/files20/${fileParams.file_url}_${fileParams.key}/${fileParams.package_name}`
  downloadFile(FileDownloadUrl, '.temp/', fileParams.package_name).then((e)=>{
    ctx.sendChatAction('upload_document');
    ctx.sendDocument({ source: readFileSync(e), filename: fileParams.package_name })

  });
}

async function getParams(id: number) {
  return await prisma.fileMetadata.findFirst({
    where: {
      file_id: id
    }
  });
}


export default sendFile;
