export interface CountryModel {
  name: string;
  capital: string;
  population: number;
  currencies: string[];
  flag: string;
}

export type CountryRequiredProps = Pick<CountryModel, "name" | "capital">;
