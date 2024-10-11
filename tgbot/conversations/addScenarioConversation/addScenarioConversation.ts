import { MyConversation, MyContext } from "../../types/types";

export async function addScenarioConversation(
	conversation: MyConversation,
	ctx: MyContext
) {
	try {
		await ctx.reply(
			"Дайте название сценарию одним словом (или введите 'отмена' для выхода):"
		);
		const name = (await conversation.form.text()).trim().toLowerCase();

		if (name === 'отмена') {
			await ctx.reply('Создание сценария отменено.');
			return;
		}

		if (ctx.session.scenarios[name]) {
			await ctx.reply(
				'Сценарий с таким именем уже существует. Пожалуйста, выберите другое имя.'
			);
			return;
		}

		await ctx.reply(
			"Введите текст для поиска (или введите 'отмена' для выхода):"
		);
		const query = await conversation.form.text();

		if (query.toLowerCase() === 'отмена') {
			await ctx.reply('Создание сценария отменено.');
			return;
		}

		await ctx.reply(
			"Введите фильтр для минимальной цены (или 'отмена' для выхода)"
		);
		const minCostResponse = await conversation.form.text();

		if (minCostResponse.toLowerCase() === 'отмена') {
			await ctx.reply('Создание сценария отменено.');
			return;
		}

		const minCost = parseInt(minCostResponse);

		await ctx.reply(
			"Введите фильтр для максимальной цены (или 'отмена' для выхода)"
		);
		const maxCostResponse = await conversation.form.text();

		if (maxCostResponse.toLowerCase() === 'отмена') {
			await ctx.reply('Создание сценария отменено.');
			return;
		}

		const maxCost = parseInt(maxCostResponse);

		await ctx.reply(
			"Как часто нужно совершать поиск? (Введите число часов или 'отмена' для выхода)"
		);
		const intervalResponse = await conversation.form.text();

		if (intervalResponse.toLowerCase() === 'отмена') {
			await ctx.reply('Создание сценария отменено.');
			return;
		}

		const interval = parseFloat(intervalResponse);

		if (isNaN(interval) || interval <= 0) {
			await ctx.reply(
				'Некорректный ввод. Пожалуйста, введите положительное число.'
			);
			return;
		}

		conversation.session.scenarios[name] = {
			name,
			query,
			interval,
			minCost,
			maxCost,
			isActive: true,
			lastRun: new Date(),
		};

		await ctx.reply(
			`Сценарий "${name}" добавлен и будет запускаться каждые ${interval} ч.`
		);

		const user = ctx.from;
		console.log('🚀 ~ parseAllScenarios ~ user:', user);

		// const results = await runScenarioForUser(
		// 	user,
		// 	conversation.session.scenarios[name]
		// );
		// await ctx.reply(
		// 	`По вашему запросу найдено объявлений: Новых ${results.newAds.length} / Старых : ${results.updatedAds.length}\n`
		// );

		// Explicitly save the session
		sessionStorage.write(ctx.from.id.toString(), conversation.session);
	} catch (error) {
		console.error('Ошибка в addScenarioConversation:', error);
		await ctx.reply(
			'Произошла ошибка при создании сценария. Пожалуйста, попробуйте еще раз.'
		);
	}
}