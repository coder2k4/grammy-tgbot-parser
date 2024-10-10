import { MyContext } from '../../types/types';

import { sessionStorage } from '../session/session';

export const restoreSessionFromDB = async (ctx: MyContext) => {
	if (ctx.from?.id && !ctx.session.scenarios) {
		try {
			// TODO: Замените на реальный вызов к MongoDB
			// ctx.session.scenarios = await loadUserScenarios(ctx.from.id);
			if (ctx.session.scenarios) {
				await sessionStorage.write(ctx.from.id.toString(), ctx.session);
			}
		} catch (error) {
			console.error(
				`Ошибка при восстановлении сессии для пользователя ${ctx.from.id}:`,
				error
			);
		}
	}
};
