import './App.css';
import { Container } from "@mui/material";
import Header from "./components/header/Header";
import UsersList from "./components/users-list/UsersList";

function App() {
  return (
    <div>
      <Header />
      <Container sx={{ mt: 2 }}><UsersList /></Container>
    </div>
  );
}

export default App;
