import { Bot } from 'grammy';

import * as dotenv from 'dotenv';

// Загружаем env переменные
dotenv.config();

export class BotManager {
	private bot: Bot;

	constructor() {
		this.bot = new Bot(process.env.BOT_TOKEN);

		this.setupMiddleware();
		this.setupHandlers();
	}

	private setupMiddleware() {}

	private setupHandlers() {}

	public start() {
		this.bot.start();
	}
}
