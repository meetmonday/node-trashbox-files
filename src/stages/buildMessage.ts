import { Context } from "telegraf";
import { FileCollection, FileMetadata } from '../../types/myFiles.js';
import { code } from '../helpers.js'

function buildMessage(myFiles: FileCollection, ctx: Context) {
  const latestFiles: FileCollection = {'0': myFiles[1], '1': myFiles[2]}
  ctx.sendMessage(code(JSON.stringify(latestFiles, null, 2), 'json'), { parse_mode: 'MarkdownV2' })
}

export default buildMessage;
