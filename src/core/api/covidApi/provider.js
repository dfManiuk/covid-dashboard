class ProjectApi {
  getFetch(url) {
    return fetch(url).then((response) => response.json());
  }

  getCovid() {
    return this.getFetch('https://api.covid19api.com/summary');
  }

  getCountry() {
    return this.getFetch('https://restcountries.eu/rest/v2/all?fields=name;population;latlng;flag;');
  }

  getLookup() {
    return fetch('https://get.geojs.io').then((response) => response.text());
  }
}

export default new ProjectApi();
