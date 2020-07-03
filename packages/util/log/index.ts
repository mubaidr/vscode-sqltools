declare var window: any;
import { Debugger } from 'debug';
import { OutputChannel } from 'vscode';

/**
 * Export logger based on environment.
 *
 * When inside of VSCode, use extension output channel,
 * Otherwise write to console.log/stdout.
 *
 * logs when in LS: language server output channel
 * logs on webviews: webview devtools
  */
let logger: Debugger & { outputChannel?: OutputChannel, show?: () => void };
if (typeof window === 'undefined' && process.env && String(process.env.IS_LANGUAGE_SERVER) !== '1') {
  logger = require('./vscode').default;
} else {
  logger = require('./generic').default;
}

export default logger;