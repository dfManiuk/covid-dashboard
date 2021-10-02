export class CovidEntity {
  constructor({
    Country, CountryCode, Date,
    ID, NewConfirmed, NewDeaths, NewRecovered, TotalConfirmed, TotalDeaths, TotalRecovered,
  }) {
    this.Country = Country;
    this.CountryCode = CountryCode;
    this.Date = Date;
    this.id = ID;
    this.NewConfirmed = NewConfirmed;
    this.NewDeaths = NewDeaths;
    this.NewRecovered = NewRecovered;
    this.TotalConfirmed = TotalConfirmed;
    this.TotalDeaths = TotalDeaths;
    this.TotalRecovered = TotalRecovered;
  }
}
