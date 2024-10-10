import { BotManager } from './tgbot/bot';

async function main() {
	const botManager = new BotManager();
	botManager.start();
}

main();
