import { Telegraf, Context } from "telegraf";
import { callbackQuery } from "telegraf/filters";
import fetchMyFiles from "./stages/fetchMyFiles.js";
import sendFile from "./stages/sendFile.js";
import { extractLink } from "./helpers.js";

const bot = new Telegraf(process.env.BOT_TOKEN!, {
  telegram: {
    apiRoot: 'http://127.0.0.1:8081/'
  }
});
bot.command('start', (ctx) => ctx.reply('test'))
bot.hears(/trashbox.ru\/link/, (ctx) => { fetchMyFiles(extractLink(ctx.update.message.text), ctx) });

bot.on(callbackQuery("data"), ctx => {
  const fileId: number = parseInt(ctx.callbackQuery.data.split('-')[1], 10);
  sendFile(ctx, fileId);
});

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));