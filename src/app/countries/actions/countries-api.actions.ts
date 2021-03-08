import { createAction, props } from "@ngrx/store";
import { CountryModel } from "src/app/shared/models";

export const countriesLoaded = createAction(
  "[Countries API] Countries Loaded Success",
  props<{ countries: CountryModel[] }>()
);

export const countryCreated = createAction(
  "[Countries API] Country Created",
  props<{ country: CountryModel }>()
);

export const countryUpdated = createAction(
  "[Countries API] Country Updated",
  props<{ country: CountryModel }>()
);

export const countryDeleted = createAction(
  "[Countries API] Country Deleted",
  props<{ countryId: string }>()
);
