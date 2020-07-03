declare var window: any;
import { IConfig } from '@sqltools/types';

let Config: IConfig;
if (typeof window === 'undefined' && process.env && (process.env.PRODUCT === 'ext' || String(process.env.IS_LANGUAGE_SERVER) !== '1')) {
  Config = require('./vscode').default;
} else {
  Config = require('./generic').default;
}

export default Config;