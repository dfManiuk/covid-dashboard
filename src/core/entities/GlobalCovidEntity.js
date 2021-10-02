export class GlobalCovidEntity {
  constructor({ Date, NewConfirmed, NewDeaths, NewRecovered, TotalConfirmed, TotalDeaths, TotalRecovered }) {
    this.Date = Date;
    this.NewConfirmed = NewConfirmed;
    this.NewDeaths = NewDeaths;
    this.NewRecovered = NewRecovered;
    this.TotalConfirmed = TotalConfirmed;
    this.TotalDeaths = TotalDeaths;
    this.TotalRecovered = TotalRecovered;
  }
}
