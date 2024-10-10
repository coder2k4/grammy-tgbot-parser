import { Bot } from "grammy";
import { MyContext } from "tgbot/types/types";

export const errorAdminNotifyHandler = async (error: Error, bot: Bot<MyContext>) => {
	const adminChatId = process.env.ADMIN_CHAT_ID;
	if (adminChatId) {
			try {
					await bot.api.sendMessage(adminChatId, `Критическая ошибка бота: ${error.message}`);
			} catch (e) {
					console.error("Не удалось отправить уведомление администратору:", e);
			}
	}
}