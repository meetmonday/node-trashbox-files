import { Telegraf, Context } from "telegraf";
import { callbackQuery } from "telegraf/filters";
import fetchMyFiles from "./stages/fetchMyFiles.js";
import sendFile from "./stages/sendFile.js";
import { extractLink } from "./helpers.js";
import 'dotenv/config'

const localApi = process.env.BIG_FILES
  ? { telegram: { apiRoot: process.env.LOCAL_API } }
  : {};

const bot = new Telegraf(process.env.BOT_TOKEN!, localApi);
bot.command("start", (ctx) => ctx.reply("test"));
bot.hears(/trashbox.ru\/link/, (ctx) => {
  fetchMyFiles(extractLink(ctx.update.message.text), ctx);
});

bot.on(callbackQuery("data"), (ctx) => {
  const fileId: number = parseInt(ctx.callbackQuery.data.split("-")[1], 10);
  sendFile(ctx, fileId);
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
