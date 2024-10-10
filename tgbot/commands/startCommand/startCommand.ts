import { CommandContext } from 'grammy';
import { MyContext } from '../../types/types.js';

export async function startCommand(ctx: CommandContext<MyContext>) {
	await ctx.reply(ctx.t('commands.start'));
}
