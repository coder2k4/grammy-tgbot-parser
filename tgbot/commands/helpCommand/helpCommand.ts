import { CommandContext } from 'grammy';
import { MyContext } from '../../types/types.js';

export async function helpCommand(ctx: CommandContext<MyContext>) {
	await ctx.reply(ctx.t('commands.help'), {
		parse_mode: 'MarkdownV2',
	});
}
