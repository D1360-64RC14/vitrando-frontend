import type { Currency } from "./Currency";
import { CurrencyBRL, CurrencyUSD } from "./Currency";

export class CurrencyManager {
  private _currencyMapping: Map<string, Currency>;

  constructor() {
    this._currencyMapping = new Map();
    this._currencyMapping.set("BRL", new CurrencyBRL());
    this._currencyMapping.set("USD", new CurrencyUSD());
  }

  getCurrency(code: string): Currency {
    const currency = this._currencyMapping.get(code);

    if (!currency) {
      throw new Error(`Currency '${code}' not found`);
    }

    return currency;
  }

  getComputedCurrency(code: Ref<string>): ComputedRef<Currency> {
    return computed(() => this.getCurrency(code.value));
  }

  get current() {
    return this.getCurrency(useCurrency().value);
  }

  get currentComputed() {
    return this.getComputedCurrency(useCurrency());
  }
}
