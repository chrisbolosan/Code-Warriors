import React from "react";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ handleClick, isLoggedIn, user, userId }) => {
  const classes = useStyles();

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 5,
      border: `1px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }))(Badge);

  return (
    <nav id="navbar">
      {isLoggedIn ? (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              ></IconButton>
              <Typography variant="h4" className={classes.title}>
                <Link to="/">
                  <Button>Home</Button>
                </Link>
              </Typography>

              <Typography variant="h4" className={classes.title}>
                <Link to="/IDE">
                  <Button>Play</Button>
                </Link>
              </Typography>
              <Typography variant="h4" className={classes.title}>
                <Link to="/IDE">
                  <Button>IDE</Button>
                </Link>
              </Typography>
              <Typography variant="h4" className={classes.title}>
                <Button>Profile</Button>
              </Typography>
              <Typography variant="h4" className={classes.title}>
                <Link to="/">
                  <Button color="primary" href="#" onClick={handleClick}>
                    Logout
                  </Button>
                </Link>
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      ) : (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              ></IconButton>
              <Typography variant="h4" className={classes.title}>
                <Link to="/">
                  <Button>Home</Button>
                </Link>
              </Typography>
              <Typography variant="h4" className={classes.title}>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </Typography>
              <Typography variant="h4" className={classes.title}>
                <Link to="/signup">
                  <Button>Signup</Button>
                </Link>
              </Typography>
              <Typography variant="h4" className={classes.title}>
                <Link to="/IDE">
                  <Button>IDE</Button>
                </Link>
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
