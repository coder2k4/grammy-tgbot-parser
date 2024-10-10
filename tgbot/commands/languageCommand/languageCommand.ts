import { CommandContext } from 'grammy';
import { getCommandList } from '../../handlers';
import { MyContext } from '../../types/types';

export const languageCommand = async (ctx: CommandContext<MyContext>) => {
	const currentLocale = await ctx.i18n.getLocale();
	const newLocale = currentLocale === 'ru' ? 'en' : 'ru';

	await ctx.i18n.setLocale(newLocale); // Меняем язык

	// Удаляем команды для текущего чата
	await ctx.api.deleteMyCommands({
		scope: {
			type: 'chat',
			chat_id: ctx.chat.id,
		},
	});

	// Устанавливаем команды для текущего чата
	await ctx.api.setMyCommands(getCommandList(newLocale), {
		scope: {
			type: 'chat',
			chat_id: ctx.chat.id,
		},
	});

	await ctx.reply(ctx.t('language.set')); // Ответ пользователю
};
