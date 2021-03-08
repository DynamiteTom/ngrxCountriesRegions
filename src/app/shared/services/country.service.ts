import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as uuid from "uuid/v4";
import { CountryModel, CountryRequiredProps } from "../models";

// const BASE_URL = "http://localhost:3000/Countries";

const HEADER = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class CountriesService {

  regn = 'Europe';
  regnUrl = '';

  constructor(private http: HttpClient) {
      this.regnUrl = this.getUrl(this.regn);
  }
   
  getUrl(reg: string) {
       console.log('getURL'); 
      let retVal = ''; 
      switch(reg) {
        case 'Europe': {retVal = 'https://restcountries.eu/rest/v2/region/europe';
            break;}
        case 'Asia': { retVal = 'https://restcountries.eu/rest/v2/region/asia';
            break; }
         default: { retVal = 'https://restcountries.eu/rest/v2/region/europe'; }
    };
    // retVal = 'https://swapi.dev/api/people';
    return retVal;
 }

  all() {
//    alert('All');
    const url = this.http.get<CountryModel[]>(this.regnUrl);
    // console.log("Ver 11 Service - ", Object.values(url.subscribe()).length);
    // alert("Ver 11 Service - " + Object.values(url.subscribe()).length);
    return  url;
  }

  load(name: string) {
   const countries = this.http.get<CountryModel>(`${this.regnUrl}/${name}`);
   console.log('SERVICE Load - Countries - ', countries);
   return countries;
  }

  create(countryProps: CountryRequiredProps) {
    const country: CountryModel = {
      population: 0,
      currencies: [],
      flag: '',
      ...countryProps
    };

    return this.http.post<CountryModel>(
      `${this.regnUrl}`,
      JSON.stringify(country),
      HEADER
    );
  }

  update(name: string, updates: CountryRequiredProps) {
    return this.http.patch<CountryModel>(
      `${this.regnUrl}/${name}`,
      JSON.stringify(updates),
      HEADER
    );
  }

  delete(name: string) {
    return this.http.delete(`${this.regnUrl}/${name}`);
  }
}
