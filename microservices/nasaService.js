import axios from "axios";

const NasaService = (function () {
  const _props = new WeakMap();

  class NasaService {
    constructor( apiKey ) {
      _props.set(this, { apiKey: apiKey }); // this is private
    }

    async getApodPicture (date) {
      const apiKey = _props.get(this).apiKey;

      return axios.get('https://api.nasa.gov/planetary/apod?api_key=' + apiKey + '&date=' + date)
      .then((resp) => {
          return resp.data;
      });
    }
  }
  return NasaService;
 })();



export default NasaService;
