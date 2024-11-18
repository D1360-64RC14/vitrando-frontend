export interface Currency {
  code: string;
  symbol: string;
  name: string;
  format(value: number): string;
  unformat(value: string): number;
}

export class CurrencyBRL implements Currency {
  format(value: number): string {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  unformat(value: string): number {
    return Number(value.replace("R$", "").replace(".", "").replace(",", "."));
  }

  get code() {
    return "BRL";
  }
  get symbol() {
    return "R$";
  }
  get name() {
    return "Real";
  }
}

export class CurrencyUSD implements Currency {
  format(value: number): string {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: this.code,
    });
  }
  unformat(value: string): number {
    return Number(
      value.replace(this.symbol, "").replace(".", "").replace(",", ".")
    );
  }

  get code() {
    return "USD";
  }
  get symbol() {
    return "$";
  }
  get name() {
    return "Dolar";
  }
}
