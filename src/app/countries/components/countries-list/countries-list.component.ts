import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CountryModel } from "src/app/shared/models";

@Component({
  selector: "app-countries-list",
  templateUrl: "./countries-list.component.html",
  styleUrls: ["./countries-list.component.css"]
})
export class CountriesListComponent {
  @Input() countries: CountryModel[];
  @Input() readonly = false;
  @Output() select = new EventEmitter();
  @Output() delete = new EventEmitter();

  selectedCountry: CountryModel = <CountryModel>{};

  constructor() {
    this.selectedCountry.name = 'empty'
  }
  
  selectCountry(selCountry: CountryModel) {
    let obj = Object.values(selCountry);
   // alert(obj);
     this.selectedCountry = {
          name: selCountry.name,
          capital: selCountry.capital,
          population: selCountry.population,
          currencies: selCountry.currencies,
          flag: selCountry.flag
     };
  }
}
