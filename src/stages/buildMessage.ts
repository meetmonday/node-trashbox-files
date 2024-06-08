import { Context, Markup } from "telegraf";
import { button } from "telegraf/markup";

function buildMessage(myFiles, ctx: Context) {
  const latestFiles = myFiles.slice(0,3)
  const buttons = latestFiles.map((el) => button.callback(`${el.title} — ${el.size.replace('&nbsp;', '')}`, `download-${el.file_id}`))
  ctx.sendMessage('Доступные файлы', Markup.inlineKeyboard(buttons, { columns: 1 }))
}

export default buildMessage;
