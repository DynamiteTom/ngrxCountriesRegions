import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";

import * as fromCountries from "./countries.reducer";

export interface State {
  countries: fromCountries.State;
}

export const reducers: ActionReducerMap<State> = {
  countries: fromCountries.reducer
};

export const metaReducers: MetaReducer<State>[] = [];

/**
 * Countries Selectors
 */
 export const selectCountriesState = (state: State) => state.countries;
 
 export const selectAllCountries = createSelector(
   selectCountriesState,
   fromCountries.selectAll
 );
 export const selectActiveCountry = createSelector(
   selectCountriesState,
   fromCountries.selectActiveCountry
 );
 