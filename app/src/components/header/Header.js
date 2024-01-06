import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import logo from './logo.jpg';
import { HeaderLogo } from "./styles";

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HeaderLogo src={logo} alt="russophobes" />
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
            RUSSOPHOBES
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
