import { Constructor } from '../types/constructor.type';

export abstract class ProviderFinder<T> {
  private providerMap = new WeakMap<Constructor, T>();
  private checkedProviderSet = new WeakSet<Constructor>();

  protected constructor(private baseProvider: Constructor) {}

  public getProvider(target: Constructor): T | undefined {
    if (!this.providerMap.has(target) && !this.checkedProviderSet.has(target)) {
      for (const prop of Object.getOwnPropertyNames(target)) {
        if (target[prop] instanceof this.baseProvider) {
          this.providerMap.set(target, target[prop]);
          break;
        }
      }
      this.checkedProviderSet.add(target);
    }

    return this.providerMap.get(target);
  }
}
