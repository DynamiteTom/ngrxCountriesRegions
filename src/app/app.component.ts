import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "NgRx Countries and Regions";
  links = [{ path: "/countries", icon: "country", label: "Countries" }];
}
