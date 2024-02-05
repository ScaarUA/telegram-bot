import { Button, TextField } from "@mui/material";
import { useState } from "react";
import api from "../../utils/api";

function BotPage() {
  const [message, setMessage] = useState(null);

  const sendBotMessage = () => api.post('/api/bot/sendMessage', {
    message,
  });

  return (
    <>
      <TextField label="Повідомлення" value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={sendBotMessage}>Відправити</Button>
    </>
  );
}

export default BotPage;
