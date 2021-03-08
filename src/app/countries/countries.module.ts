import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { CountriesPageComponent } from "./components/countries-page/countries-page.component";
import { CountriesListComponent } from "./components/countries-list/countries-list.component";
import { CountriesApiEffects } from "./countries-api.effects";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([{ path: "countries", component: CountriesPageComponent }]),
    EffectsModule.forFeature([CountriesApiEffects])
  ],
  declarations: [
    CountriesPageComponent,
    CountriesListComponent
  ]
})
export class CountriesModule {}
