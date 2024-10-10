import { MyContext } from "tgbot/types/types";

export async function messageHandler(ctx: MyContext) {
  if (ctx.message?.text) {
    const text = ctx.message.text.toLowerCase();
    const t = ctx.t;

    if (text.includes('hello') || text.includes('hi')) {
      await ctx.reply(t('messages.greeting'));
    } else if (text.includes('bye') || text.includes('goodbye')) {
      await ctx.reply(t('messages.farewell'));
    } else if (text.includes('help')) {
      await ctx.reply(t('messages.help'));
    } else if (text.includes('parse')) {
      await ctx.reply(t('messages.parse_prompt'));
    } else {
      await ctx.reply(t('messages.default'));
    }
  }
}