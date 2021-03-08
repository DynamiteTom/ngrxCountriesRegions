import { createReducer, on, Action, createSelector } from "@ngrx/store";
import { CountryModel } from "src/app/shared/models";
import { CountriesPageActions, CountriesApiActions } from "src/app/countries/actions";

const createCountry = (countries: CountryModel[], country: CountryModel) => [...countries, country];
const updateCountry = (countries: CountryModel[], changes: CountryModel) =>
  countries.map(country => {
    return country.name === changes.name ? Object.assign({}, country, changes) : country;
  });
const deleteCountry = (countries: CountryModel[], countryId: string) =>
  countries.filter(country => countryId !== country.name);

export interface State {
  collection: CountryModel[];
  activeCountryId: string | null;
}

export const initialState: State = {
  collection: [],
  activeCountryId: null
};

export const CountriesReducer = createReducer(
  initialState,
  on(CountriesPageActions.clearSelectedCountry, CountriesPageActions.enter, state => {
    return {
      ...state,
      activeCountryId: null
    };
  }),
  on(CountriesPageActions.selectCountry, (state, action) => {
    return {
      ...state,
      activeCountryId: action.countryId
    };
  }),
  on(CountriesApiActions.countriesLoaded, (state, action) => {
    return {
      ...state,
      collection: action.countries
    };
  }),
  on(CountriesApiActions.countryCreated, (state, action) => {
    return {
      collection: createCountry(state.collection, action.country),
      activeCountryId: null
    };
  }),
  on(CountriesApiActions.countryUpdated, (state, action) => {
    return {
      collection: updateCountry(state.collection, action.country),
      activeCountryId: null
    };
  }),
  on(CountriesApiActions.countryDeleted, (state, action) => {
    return {
      ...state,
      collection: deleteCountry(state.collection, action.countryId)
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return CountriesReducer(state, action);
}

export const selectAll = (state: State) => state.collection;
export const selectActiveCountryId = (state: State) => state.activeCountryId;

export const selectActiveCountry = createSelector(
  selectAll,
  selectActiveCountryId,
  (countries, activeCountryId) => countries.find(country => country.name === activeCountryId) || null
);
/*
export const selectEarningsTotals = createSelector(
  selectAll
);
*/  