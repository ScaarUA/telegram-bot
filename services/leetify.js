import config from '../config.js';
import axios from "axios";

export class Leetify {

  token = null;

  constructor() {
    this.login();
  }

  login() {
    return axios("https://api.leetify.com/api/login", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "uk",
        "content-type": "application/json",
      },
      "data": { email: process.env.LEETIFY_USER, password: process.env.LEETIFY_PASSWORD },
      "method": "POST"
    })
      .then(response => this.token = response.data.token);
  }

  getClubStats() {
    return this.fetcher(`https://api.leetify.com/api/dashboard/leaderboard/${config.leetify.clubId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).then(response => response.positions.sort((a,b) => a.rank - b.rank))
  }

  async fetcher(url, options, isRetry) {
    try {
      const res = await axios(url, options);

      return res.data;
    } catch (e) {
      if (!isRetry) {
        await this.login();
        return this.fetcher(url, options, true);
      }
    }
  }
}