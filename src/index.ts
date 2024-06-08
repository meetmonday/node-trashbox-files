import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN!);
bot.command('start', (ctx) => ctx.reply('test'))

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));