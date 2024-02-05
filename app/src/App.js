import './App.css';
import { Container } from "@mui/material";
import Header from "./components/header/Header";
import UsersList from "./components/users-list/UsersList";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Rating from "./components/rating/Rating";
import BotPage from "./components/bot-page/BotPage";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Container sx={{ mt: 2 }}>
          <Routes>
            <Route path="/" element={<Rating />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/bot" element={<BotPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
