import { CommandContext } from 'grammy';
import { MyContext } from '../../types/types.js';

export async function tapDimonCommand(ctx: CommandContext<MyContext>) {
	await ctx.reply('Тап-тап, Димон!');
	// Здесь может быть дополнительная логика для команды tapDimon
}
