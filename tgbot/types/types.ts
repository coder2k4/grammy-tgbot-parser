import { Conversation, ConversationFlavor } from "@grammyjs/conversations";
import { I18nFlavor } from "@grammyjs/i18n";
import { Context, SessionFlavor } from "grammy";


export interface SessionData {
	scenarios: Record<string, ScenarioSchema>,
	__language_code?: string;
}


export type MyContext = Context & SessionFlavor<SessionData> & ConversationFlavor & I18nFlavor;
export type MyConversation = Conversation<MyContext>;


export interface ScenarioSchema {
	name: string
	query: string
	interval: number
	minCost: number
	maxCost: number
	isActive: boolean
	lastRun?: Date
}

export type CommandInfo = {
	handler: (ctx: MyContext) => Promise<void>;
	description: string;
	isListable: boolean;
};
