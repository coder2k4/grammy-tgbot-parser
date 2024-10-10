import { I18n } from '@grammyjs/i18n';
import path from 'path';
import { MyContext } from 'tgbot/types/types';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.resolve(__dirname, '../../locales');

export const i18n = new I18n<MyContext>({
	defaultLocale: 'ru',
	useSession: true,
	directory: localesDir,
});
