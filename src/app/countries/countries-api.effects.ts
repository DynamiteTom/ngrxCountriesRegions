import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, map, exhaustMap, concatMap, tap } from "rxjs/operators";
import { CountriesService } from "../shared/services";
import { CountriesPageActions, CountriesApiActions } from "./actions";

@Injectable()
export class CountriesApiEffects {
  constructor(private countriesService: CountriesService, private actions$: Actions) {}
/*
  loadcountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesPageActions.enter),
      exhaustMap(() =>
        this.countriesService
          .all()
          .pipe(map(countries => CountriesApiActions.countriesLoaded({ countries })))
      )
    )
  );
*/
  loadCountries$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CountriesPageActions.enter),
    exhaustMap(() =>
      this.countriesService
        .all()
        .pipe(map(countries => CountriesApiActions.countriesLoaded({ countries })),
         tap((countries) => { console.log('countries',countries)}, error =>console.log('Error = ',error)  )
       )
    )
  )
);


  createCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesPageActions.createCountry),
      concatMap(action =>
        this.countriesService
          .create(action.country)
          .pipe(map(country => CountriesApiActions.countryCreated({ country })))
      )
    )
  );

  updateCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesPageActions.updateCountry),
      concatMap(action =>
        this.countriesService
          .update(action.countryId, action.changes)
          .pipe(map(country => CountriesApiActions.countryUpdated({ country })))
      )
    )
  );

  deleteCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesPageActions.deleteCountry),
      mergeMap(action =>
        this.countriesService
          .delete(action.countryId)
          .pipe(
            map(() => CountriesApiActions.countryDeleted({ countryId: action.countryId }))
          )
      )
    )
  );
}
