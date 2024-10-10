import { Composer } from 'grammy';
import { BotCommand } from 'grammy/types';
import {
	gamesCommand,
	helpCommand,
	languageCommand,
	parseCommand,
	startCommand,
	tapDimonCommand,
	unknownCommand,
} from '../../commands';
import { i18n } from '../../middleware';
import { MyContext } from '../../types/types';

export const getCommandList = (locale: string = 'ru' ): BotCommand[] => [
	{
		command: 'start',
		description: i18n.t(locale, 'commands.startDescription'),
	},
	{ command: 'help', description: i18n.t(locale, 'commands.helpDescription') },
	{ command: 'parse', description: i18n.t(locale, 'commands.parseDescription') },
	{ command: 'games', description: i18n.t(locale, 'commands.gamesDescription') },
	{
		command: 'language',
		description: i18n.t(locale, 'commands.languageDescription'),
	},
];

export const commandHandler = new Composer<MyContext>();
commandHandler.command('start', startCommand);
commandHandler.command('help', helpCommand);
commandHandler.command('parse', parseCommand);
commandHandler.command('games', gamesCommand);
commandHandler.command('language', languageCommand);


// Игры
commandHandler.command('tapDimon', tapDimonCommand);
// Обработка неизвестных команд
commandHandler.command('*', unknownCommand);
