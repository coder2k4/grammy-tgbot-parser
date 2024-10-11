import { createConversation } from '@grammyjs/conversations';
import { Composer } from 'grammy';
import { addScenarioConversation } from '../../conversations';
import { MyContext } from '../../types/types';

export const conversationsMiddleware = () => {
	const composer = new Composer<MyContext>();

	composer.use(createConversation(addScenarioConversation));

	return composer;
};
