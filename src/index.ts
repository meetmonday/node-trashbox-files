import { Telegraf } from "telegraf";
import fetchMyFiles from "./stages/fetchMyFiles.js";

const bot = new Telegraf(process.env.BOT_TOKEN!);
bot.command('start', (ctx) => ctx.reply('test'))
bot.hears(/trashbox.ru\/link/, (ctx) => { fetchMyFiles(ctx.update.message.text, ctx) });

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));