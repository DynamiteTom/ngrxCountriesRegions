import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  State,
  selectAllCountries,
  selectActiveCountry
} from "src/app/shared/state";
import { CountryModel, CountryRequiredProps } from "src/app/shared/models";
import { CountriesPageActions } from "../../actions";

@Component({
  selector: "app-countries",
  templateUrl: "./countries-page.component.html",
  styleUrls: ["./countries-page.component.css"]
})
export class CountriesPageComponent implements OnInit {
  countries$: Observable<CountryModel[]>;
  currentCountry$: Observable<CountryModel | null>;
  total$: Observable<number>;

  constructor(private store: Store<State>) {
    this.countries$ = store.select(selectAllCountries);
    this.currentCountry$ = store.select(selectActiveCountry);
  }

  ngOnInit() {
    this.store.dispatch(CountriesPageActions.enter());
  }

  onSelect(country: CountryModel) {
    // this.store.dispatch(CountriesPageActions.selectCountry({ countryId: country.name }));
  }

  onCancel() {
    this.removeSelectedCountry();
  }

  removeSelectedCountry() {
    this.store.dispatch(CountriesPageActions.clearSelectedCountry());
  }
/*
  onSave(country: CountryRequiredProps | CountryModel) {
    if ("name" in country) {
      this.updateCountry(country);
    } else {
      this.saveCountry(country);
    }
  }
*/
  saveCountry(countryProps: CountryRequiredProps) {
    this.store.dispatch(CountriesPageActions.createCountry({ country: countryProps }));
  }

  updateCountry(country: CountryModel) {
    this.store.dispatch(
      CountriesPageActions.updateCountry({ countryId: country.name, changes: country })
    );
  }

  onDelete(country: CountryModel) {
    this.store.dispatch(CountriesPageActions.deleteCountry({ countryId: country.name }));
  }
}
