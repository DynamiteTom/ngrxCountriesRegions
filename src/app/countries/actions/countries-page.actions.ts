import { createAction, props } from "@ngrx/store";
import { CountryRequiredProps } from "src/app/shared/models";

export const enter = createAction("[Countries Page] Enter");

export const selectCountry = createAction(
  "[Countries Page] Select Country",
  props<{ countryId: string }>()
);

export const clearSelectedCountry = createAction(
  "[Countries Page] Clear Selected Country"
);

export const createCountry = createAction(
  "[Countries Page] Create Country",
  props<{ country: CountryRequiredProps }>()
);

export const updateCountry = createAction(
  "[Countries Page] Update Country",
  props<{ countryId: string; changes: CountryRequiredProps }>()
);

export const deleteCountry = createAction(
  "[Countries Page] Delete Country",
  props<{ countryId: string }>()
);
