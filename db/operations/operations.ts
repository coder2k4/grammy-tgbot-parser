import Scenario from '../models/Scenario';
import User from '../models/User';

/**
 * Возвращает список сценариев, принадлежащих пользователю
 * @param userId - id пользователя
 * @returns список сценариев или null, если пользователь не найден
 */
export async function loadUserScenarios(
	userId: number
): Promise<Awaited<ReturnType<typeof Scenario.find>> | null> {
	try {
		const user = await User.findOne({ id: userId });
		if (!user) return null;

		const scenarios = await Scenario.find({ user: user._id });

		if (scenarios && scenarios.length > 0) return scenarios;
	} catch (error) {
		console.error('Error loading user scenarios:', error);
		return null;
	}
}

/**
 * Удаляет сценарий из MongoDB
 * @param userId - id пользователя, которому принадлежит сценарий
 * @param scenarioName - имя сценария
 * @returns null
 */
export async function deleteScenarioFromMongoDB(
	userId: number,
	scenarioName: string
) {
	try {
		const user = await User.findOne({ id: userId });
		if (user) {
			await Scenario.deleteOne({ name: scenarioName, user: user._id });
		}
	} catch (error) {
		console.error('Error deleting user scenarios:', error);
	}
}



// Функция сохранения сценария в MongoDB
export async function saveAndUpdateScenarioToMongoDB(
	userId: number,
	scenario: IScenarioInput
) {
	try {
		
		let user = await User.findOne({ id: userId });
		
		if (!user) {
			user = await new User({ id: userId }).save();
		}

		const existingScenario = await Scenario.findOne({
			name: scenario.name,
			user: user._id,
		});

		if (existingScenario) {
			await Scenario.updateOne(
				{ _id: existingScenario._id },
				{
					query: scenario.query,
					interval: scenario.interval,
					minCost: scenario.minCost,
					maxCost: scenario.maxCost,
					isActive: scenario.isActive,
					lastRun: scenario.lastRun,
				}
			);
		} else {
			await new Scenario({
				...scenario,
				user: user._id,
			}).save();
		}
	} catch (error) {
		console.error('Error deleting user scenarios:', error);
	}
}