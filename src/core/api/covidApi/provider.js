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
    return this.getFetch('https://api.ipdata.co/?api-key=c9faf9d288f6dacf57b138ee06915c854ae6d0b4ccc7fe72a7d5a32a');
  }
}

export default new ProjectApi();
