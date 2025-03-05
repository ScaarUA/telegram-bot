import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import logo from './logo.jpg';
import { HeaderLogo } from './styles';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <HeaderLogo src={logo} alt="russophobes" />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              RUSSOPHOBES
            </Link>
          </Typography>
          <Box>
            <Link to="/users">
              <Button sx={{ color: '#fff' }}>Користувачі</Button>
            </Link>
            <Link to="/bot">
              <Button sx={{ color: '#fff' }}>Бот</Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
