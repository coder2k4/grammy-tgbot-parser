import { Composer } from 'grammy';
import { BotCommand } from 'grammy/types';
import {
	gamesCommand,
	helpCommand,
	languageCommand,
	parseCommand,
	payCommand,
	profileCommand,
	startCommand,
	tapDimonCommand,
	unknownCommand,
} from '../../commands';
import { i18n } from '../../middleware';
import { CommandInfo, MyContext } from '../../types/types';

// Создаем объект, содержащий все команды и их обработчики
const commands: Record<string, CommandInfo> = {
	start: {
		handler: startCommand,
		description: 'commands.startDescription',
		isListable: true,
	},
	help: {
		handler: helpCommand,
		description: 'commands.helpDescription',
		isListable: true,
	},
	parse: {
		handler: parseCommand,
		description: 'commands.parseDescription',
		isListable: true,
	},
	games: {
		handler: gamesCommand,
		description: 'commands.gamesDescription',
		isListable: true,
	},
	profile: {
		handler: profileCommand,
		description: 'commands.profileDescription',
		isListable: true,
	},
	pay: {
		handler: payCommand,
		description: 'commands.payDescription',
		isListable: true,
	},
	language: {
		handler: languageCommand,
		description: 'commands.languageDescription',
		isListable: true,
	},
	tapDimon: {
		handler: tapDimonCommand,
		description: 'commands.tapDimonDescription',
		isListable: false,
	},
};

export const getCommandList = (locale: string = 'ru'): BotCommand[] =>
	Object.entries(commands)
		.filter(([_, info]) => info.isListable)
		.map(([command, info]) => ({
			command,
			description: i18n.t(locale, info.description),
		}));

export const commandHandler = new Composer<MyContext>();

Object.entries(commands).forEach(([command, info]) => {
	commandHandler.command(command, info.handler);
});

// Обработка неизвестных команд
commandHandler.command('*', unknownCommand);
