import axios from 'axios';
import config from '../config.js';

export const makeTenorRequest = async (prompt) => {
  return axios(
    `https://tenor.googleapis.com/v2/search?q=${prompt}&key=${config.tenorApiKey}&client_key=my_test_app&limit=3`
  );
};
