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

  getClubLeaderboard() {
    return this.fetcher(`https://api.leetify.com/api/dashboard/leaderboard/${config.leetify.clubId}`)
      .then(response => response.positions.sort((a,b) => a.rank - b.rank));
  }

  getClubSessions() {
    return this.fetcher(`https://api.leetify.com/api/sessions/${config.leetify.clubId}`).then(res => res.sessions);
  }

  async fetcher(url, options = {}, isRetry) {
    try {
      const res = await axios(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${this.token}`
        }
      });

      return res.data;
    } catch (e) {
      if (!isRetry) {
        await this.login();
        return this.fetcher(url, options, true);
      }
    }
  }
}