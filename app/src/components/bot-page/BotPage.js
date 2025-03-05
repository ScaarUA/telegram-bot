import { Button, Chip, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import api from '../../utils/api';

const suggestions = ['Іван підарас', 'Маму їбав', 'Хохлииииииии'];

function BotPage() {
  const [message, setMessage] = useState('');

  const sendBotMessage = () =>
    api
      .post('/api/bot/sendMessage', {
        message,
      })
      .then(() => setMessage(''));

  return (
    <Stack spacing={2}>
      <Typography variant="h2">Написати від імені бота</Typography>
      <TextField
        label="Повідомлення"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Stack direction="row" spacing={2}>
        {suggestions.map((suggestion) => (
          <Chip
            key={suggestion}
            label={suggestion}
            onClick={() => setMessage(suggestion)}
          />
        ))}
      </Stack>
      <Button onClick={sendBotMessage}>Відправити</Button>
    </Stack>
  );
}

export default BotPage;
