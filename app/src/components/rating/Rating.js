import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }];

const ratingToChart = (rating) => rating.map((item) => item.rating);

function Rating() {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    api('/api/rating').then((res) => setRating(res.data));
  }, []);

  if (!rating) {
    return null;
  }

  console.log(rating);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart data={rating}>
        {rating[0].rating.map((line, index) => (
          <Line
            type="monotone"
            name={line.user}
            dataKey={(data) => data.rating[index].rank}
            stroke="#8884d8"
            strokeWidth={3}
          />
        ))}
        <CartesianGrid stroke="#ccc" />
        <XAxis
          dataKey={(data) => data.date}
          tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
        />
        <YAxis />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Rating;
