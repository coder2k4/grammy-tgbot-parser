import { Bot, GrammyError, HttpError } from 'grammy';

import { conversations } from '@grammyjs/conversations';
import * as dotenv from 'dotenv';
import {
	commandHandler,
	errorAdminNotifyHandler,
	getCommandList,
} from './handlers';
import { i18n, restoreSessionFromDB, setupSession } from './middleware';
import { MyContext } from './types/types';

// Загружаем env переменные
dotenv.config();

export class BotManager {
	private bot: Bot<MyContext>;

	constructor() {
		this.bot = new Bot(process.env.BOT_TOKEN);

		this.setupMiddleware();
		this.setupHandlers();
		this.setupErrorHandling();
	}

	private async setupMiddleware() {
		this.bot.use(setupSession()); // Инициализируем сессию
		this.bot.use(i18n); // Подключаем интернационализацию i18n

		this.bot.use(async (ctx, next) => {
			// Восстанавливаем сессию
			await restoreSessionFromDB(ctx);
			await next();
		});

		this.bot.use(conversations()); // Подключаем middleware для работы c "разговорами"
	}

	private setupHandlers() {
		// this.bot.on('message', messageHandler);
		this.bot.api.setMyCommands(getCommandList('ru'));
		this.bot.use(commandHandler);
	}

	private setupErrorHandling() {
		// Глобальный обработчик ошибок
		this.bot.catch(async err => {
			const ctx = err.ctx;
			await errorAdminNotifyHandler(err, this.bot);
			console.error(`Ошибка при обработке обновления ${ctx.update.update_id}:`);
			const e = err.error;
			if (e instanceof GrammyError) {
				console.error('Ошибка в запросе к Telegram:', e.description);
			} else if (e instanceof HttpError) {
				console.error('Ошибка при соединении с Telegram:', e);
			} else {
				console.error('Неизвестная ошибка:', e);
			}
		});
	}

	public async start() {
		try {
			await this.bot.start({
				onStart: botInfo => {
					console.log(
						`Бот @${botInfo.username} успешно подключен к Telegram API`
					);
				},
			});
			await this.bot.start();
		} catch (error) {
			console.error('Ошибка при запуске бота:', error);
		}
	}
}
