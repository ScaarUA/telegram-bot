import axios from 'axios';

export const getPlannedOutages = () => {
  return axios
    .get(
      'https://app.yasno.ua/api/blackout-service/public/shutdowns/regions/25/dsos/902/planned-outages'
    )
    .then((res) => res.data);
};
