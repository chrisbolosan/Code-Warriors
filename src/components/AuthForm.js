import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authenticate, signUpThunk } from '../store';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
  text: {
    backgroundColor: "whitesmoke",
    borderRadius: "5px",
    paddingTop: "2px"
  },
  title: {
    color: "whitesmoke"
  },
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
    backgroundColor: "#464866",
    '&:hover': {
			backgroundColor: 'rgb(154, 156, 156)',
		},
	},
  more: {
    color: "whitesmoke"
  }
}))

const AuthForm = (props) => {
  const classes = useStyles()
  const { name, displayName, handleSubmit, error } = props;

  return displayName === 'Sign Up' ? (
    <div id="signup-container">
      <Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Typography component="h1" variant="h5" className={classes.title}>
					Create an Account
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit} name={name} id={name}>
					<TextField className={classes.text}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						autoFocus
					/>
					<TextField className={classes.text}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
          <TextField className={classes.text}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="email"
						label="Email"
						type="email"
						id="email"
						autoComplete="email"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Create Your Account
					</Button>
					<Grid container justifyContent="center">
						<Grid item className={classes.more}>
							Already have an account? Log in  <Link to="/signup">here</Link>
						</Grid>
					</Grid>
				</form>
			</div>
	  	</Container>
    </div>
  ) : (
    <div id="login-container">
      <Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Typography component="h1" variant="h5" className={classes.title}>
					Login
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit} name={name} id={name}>
					<TextField className={classes.text}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						autoFocus
					/>
					<TextField className={classes.text}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Login
					</Button>
					<Grid container justifyContent="center">
						<Grid item className={classes.more}>
							Don't have an account? Sign up <Link to="/login">here</Link>
						</Grid>
					</Grid>
				</form>
			</div>
	  	</Container>
      {/* {error && error.response && <div> {error.response.data} </div>} */}
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      if (formName === 'login') {
        const info = {
          username: evt.target.username.value,
          password: evt.target.password.value,
        };
        dispatch(authenticate(info.username, info.password, formName));
      } else {
        const info = {
          username: evt.target.username.value,
          password: evt.target.password.value,
          email: evt.target.email.value,
        };
        dispatch(
          signUpThunk(info.username, info.password, info.email, formName)
        );
      }
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const SignUp = connect(mapSignup, mapDispatch)(AuthForm);
