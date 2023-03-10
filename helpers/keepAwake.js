import https from "https";
import config from "../config.js";

export const keepAwake = () => {
    setInterval(() => {
        https.get(`https://${config.envUrl}`, (res) => {
            if (res.statusCode === 200) {
                console.log('Pinged server to keep awake');
            } else {
                console.error('Failed to ping server');
            }
        });
    }, config.minsToPing * 60 * 1000);
}