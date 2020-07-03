declare var window: any;
if (typeof window === 'undefined' && process.env) {
  process.env.DEBUG_HIDE_DATE = '1';
}

import debug, { Debugger, Debug } from 'debug';

debug.enable(process.env.NODE_ENV === 'development' ? '*,-babel*' : '*,-babel*,-*:debug,-*:*:debug,-*:*:*:debug,-*:*:*:*:debug,-*:*:*:*:*:debug');

const productLogger: Debugger & { _debug?: Debug } = debug(process.env.PRODUCT || 'ext');


if (typeof window !== 'undefined') {
  (debug as any).formatArgs = function(args: any) {
    args[0] = `['${this.namespace}'] ${args[0]}`;
  }
}

productLogger.log = console.log.bind(console);
(productLogger as any).show = () => productLogger.extend('warn')(`Method show not available within ${process.env.PRODUCT || 'ls'} context`);
productLogger._debug = debug;

export default productLogger;