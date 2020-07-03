import { InvalidActionError } from '@sqltools/util/exception';
import { IConnectionDriverConstructor, LSContextMap } from '@sqltools/types';
import logger from '@sqltools/util/log';

const log = logger.extend('ls-context');

const Context: Omit<LSContextMap, 'drivers'> = new Map();
class DriverMap<V = IConnectionDriverConstructor> extends Map<string, V> {
  set (key: string, value: V): this {
    if (typeof key !== 'string') throw 'invalid driver name!';
    log.extend('register-driver')(`Driver ${key} registered!`);
    return super.set(key.toLowerCase(), value);
  }
  get(key: string) {
    log.extend('get')('get %s %O', key, [...this.keys()]);
    return super.get(key.toLowerCase());
  }
  has(key: string) {
    log.extend('has')('keys %s %O', key, [...this.keys()]);
    return super.has(key.toLowerCase());
  }
  delete(key: string) { return super.delete(key.toLowerCase()); }
}
const DriversContext: LSContextMap['drivers'] = new DriverMap();

const handler = {
  get(_: never, prop: string) {
    if (
      prop === 'clear'
      || prop === 'delete'
    ) {
      throw new InvalidActionError(`Cannot ${prop} on LSContext!`);
    }
    if (prop === 'drivers') return DriversContext;
    return Context[prop];
  },
  set() {
    throw new InvalidActionError('Cannot set values to extension context directly!');
  },
};

const LSContext = new Proxy<LSContextMap>(Context as any, handler);
export default LSContext;