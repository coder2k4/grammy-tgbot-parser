import { MemorySessionStorage, session } from 'grammy';
import { SessionData } from 'tgbot/types/types';

function initialSession(): SessionData {
	return {
		scenarios: {},
	};
}

export const sessionStorage = new MemorySessionStorage<SessionData>();


export function setupSession() {
	return session({
		initial: initialSession,
		storage: sessionStorage,
		getSessionKey: ctx => ctx.from?.id.toString(),
	});
}
