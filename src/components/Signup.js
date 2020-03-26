import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
// import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import DoneIcon from "@material-ui/icons/Done";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import Fade from "@material-ui/core/Fade";
import Back from "./common/Back";
import TextField from "@material-ui/core/TextField";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
	googleProvider: new firebase.auth.GoogleAuthProvider()
};

const backgroundShape = require("../images/shape.svg");

const logo = require("../images/logo.svg");

const numeral = require("numeral");
numeral.defaultFormat("0");

const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.secondary["A100"],
		overflow: "hidden",
		background: `url(${backgroundShape}) no-repeat`,
		backgroundSize: "cover",
		backgroundPosition: "0 400px",
		marginTop: 10,
		padding: 20,
		paddingBottom: 500
	},
	grid: {
		margin: `0 ${theme.spacing(2)}px`
	},
	smallContainer: {
		flexDirection: "column",
		alignItems: "",
		width: "60%"
	},
	bigContainer: {
		width: "80%"
	},
	logo: {
		marginBottom: 24,
		display: "flex",
		justifyContent: "center"
	},
	stepContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	stepGrid: {
		width: "80%"
	},
	buttonBar: {
		marginTop: 32,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center"
	},
	button: {
		backgroundColor: theme.palette.primary["A100"]
	},
	backButton: {
		marginRight: theme.spacing(1)
	},
	outlinedButtom: {
		textTransform: "uppercase",
		margin: theme.spacing(1)
	},
	stepper: {
		backgroundColor: "transparent"
	},
	paper: {
		padding: theme.spacing(3),
		textAlign: "left",
		color: theme.palette.text.secondary
	},
	topInfo: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 42
	},
	formControl: {
		width: "100%"
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
});

const getSteps = () => {
	return ["Login"];
};

class Signup extends Component {
	state = {
		activeStep: 0,
		newEmail: "",
		newPassword: "",
		email: "",
		password: "",
		termsChecked: false,
		loading: true,
		labelWidth: 0,
		loggedInUser: ""
	};

	// handleNext = () => {
	// 	this.setState(state => ({
	// 		activeStep: state.activeStep + 1
	// 	}));
	// 	if (this.state.activeStep === 2) {
	// 		setTimeout(() => this.props.history.push("/dashboard"), 5000);
	// 	}
	// };

	// handleBack = () => {
	// 	this.setState(state => ({
	// 		activeStep: state.activeStep - 1
	// 	}));
	// };

	// handleReset = () => {
	// 	this.setState({
	// 		activeStep: 0
	// 	});
	// };

	handleChange = event => {
		this.setState({ [event.target.id]: event.target.value });
	};

	// handleGoogleSignIn = event => {
	// 	this.props.signInWithGoogle
	// 	this.setState(currentState => {
	// 		return { ...currentState, newEmail: "", newPassword: "" };
	// 	});
	// }

	handleSignUp = submitEvent => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(
				this.state.newEmail,
				this.state.newPassword
			)
			.catch(function(error) {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
				// ...
			})
			.then(() => {
				this.setState(currentState => {
					return { ...currentState, newEmail: "", newPassword: "" };
				});
			});
	};

	handleSignIn = submitEvent => {
		firebase
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode, errorMessage);
				// ...
			})
			.then(() => {
				this.setState(currentState => {
					return {
						...currentState,
						loggedInUser: currentState.email,
						email: "",
						password: ""
					};
				});
			});
	};

	handleSignOut = event => {
		this.setState({
			loggedInUser: ""
		});
	};

	// handleTerms = event => {
	// 	this.setState({ termsChecked: event.target.checked });
	// };

	// stepActions() {
	// 	if (this.state.activeStep === 0) {
	// 		return "Sign in";
	// 	}
	// 	if (this.state.activeStep === 1) {
	// 		return "Next";
	// 	}
	// 	if (this.state.activeStep === 2) {
	// 		return "Accept";
	// 	}
	// 	return "Next";
	// }

	render() {
		const { classes } = this.props;
		const steps = getSteps();
		const { activeStep } = this.state;

		const { user, signOut, signInWithGoogle } = this.props;

		return (
			<React.Fragment>
				<CssBaseline />
				<div className={classes.root}>
					<Back />
					<Grid container justify="center">
						<Grid
							spacing={10}
							alignItems="center"
							justify="center"
							container
							className={classes.grid}
						>
							<Grid item xs={12}>
								<div className={classes.logo}>
									<img width={100} height={100} src={logo} alt="" />
								</div>
								<div className={classes.stepContainer}>
									<div className={classes.stepGrid}>
										<Stepper
											classes={{ root: classes.stepper }}
											activeStep={activeStep}
											alternativeLabel
										>
											{steps.map(label => {
												return (
													<Step key={label}>
														<StepLabel>{label}</StepLabel>
													</Step>
												);
											})}
										</Stepper>
									</div>
									{activeStep === 0 && (
										<div className={classes.smallContainer}>
											<Paper className={classes.paper}>
												<div>
													<div style={{ marginBottom: 32 }}>
														<Typography
															variant="subtitle1"
															style={{ fontWeight: "bold" }}
															gutterBottom
														>
															Select
														</Typography>
														<Typography variant="body1" gutterBottom>
															Sign-in option
														</Typography>
													</div>
													<div>
														<Typography
															style={{
																textTransform: "uppercase",
																marginBottom: 20
															}}
															color="secondary"
															gutterBottom
														>
															Sign-in using Google account
														</Typography>
														<div className={classes.buttonBar}>
															{user ? (
																<Typography variant="body1" gutterBottom>
																	Hello, {user.displayName}
																</Typography>
															) : (
																<Typography variant="body1" gutterBottom>
																	Please sign in
																</Typography>
															)}
															{user ? (
																<Button
																	className={classes.backButton}
																	size="large"
																	onClick={signOut}
																>
																	Sign out
																</Button>
															) : (
																<Button
																	className={classes.backButton}
																	size="large"
																	onClick={signInWithGoogle}
																>
																	Sign in with Google
																</Button>
															)}
														</div>
														<Typography
															style={{
																textTransform: "uppercase",
																marginBottom: 20
															}}
															color="secondary"
															gutterBottom
														>
															Sign-in using an existing account
														</Typography>
														<div className={classes.buttonBar}>
															{this.state.loggedInUser ? (
																<Typography variant="body1" gutterBottom>
																	Hello, {this.state.loggedInUser}
																</Typography>
															) : (
																<Typography variant="body1" gutterBottom>
																	Please sign in
																</Typography>
															)}
															{this.state.loggedInUser ? (
																<Button
																	className={classes.backButton}
																	size="large"
																	onClick={this.handleSignOut}
																>
																	Sign out
																</Button>
															) : (
																<FormControl
																	variant="outlined"
																	className={classes.formControl}
																>
																	<Typography variant="body1" gutterBottom>
																		Email
																	</Typography>
																	<TextField
																		required
																		id="email"
																		label="Required"
																		// defaultValue="email"
																		variant="outlined"
																		onChange={this.handleChange}
																		value={this.state.email}
																	/>
																	<br></br>
																	<Typography variant="body1" gutterBottom>
																		Password
																	</Typography>
																	<TextField
																		required
																		id="password"
																		label="Required"
																		// defaultValue="password"
																		variant="outlined"
																		onChange={this.handleChange}
																		value={this.state.password}
																	/>
																	<br></br>
																	<Button
																		onClick={this.handleSignIn}
																		variant="contained"
																		color="primary"
																	>
																		Sign in
																	</Button>
																</FormControl>
															)}
														</div>

														<br></br>
														<Typography
															style={{
																textTransform: "uppercase",
																marginBottom: 20
															}}
															color="secondary"
															gutterBottom
														>
															Create an account
														</Typography>
														<br></br>
														<FormControl
															variant="outlined"
															className={classes.formControl}
														>
															<Typography variant="body1" gutterBottom>
																Email
															</Typography>
															<TextField
																required
																id="newEmail"
																label="Required"
																// defaultValue="email"
																variant="outlined"
																onChange={this.handleChange}
																value={this.state.newEmail}
															/>
															<br></br>
															<Typography variant="body1" gutterBottom>
																Password
															</Typography>
															<TextField
																required
																id="newPassword"
																label="Required"
																// defaultValue="password"
																variant="outlined"
																onChange={this.handleChange}
																value={this.state.newPassword}
															/>
															<br></br>
															<Button
																onClick={this.handleSignUp}
																variant="contained"
																color="primary"
															>
																Sign up
															</Button>
														</FormControl>
													</div>
												</div>
											</Paper>
										</div>
									)}
									{/* {activeStep === 1 && (
										<div className={classes.smallContainer}>
											<Paper className={classes.paper}>
												<Grid item container xs={12}>
													<Grid item xs={12}>
														<Typography variant="subtitle1" gutterBottom>
															Sign & confirm
														</Typography>
														<Typography variant="body1" gutterBottom>
															Sign and confirm loan agreement
														</Typography>
														<Typography variant="body1" gutterBottom>
															One text to explain that
														</Typography>
													</Grid>
												</Grid>
											</Paper>
										</div>
									)}
									{activeStep === 2 && (
										<div className={classes.smallContainer}>
											<Paper className={classes.paper}>
												<div>
													<div style={{ marginBottom: 32 }}>
														<Typography variant="subtitle1" gutterBottom>
															Permissions
														</Typography>
														<Typography variant="body1" gutterBottom>
															We need some permissions to proceed.
														</Typography>
													</div>
													<div>
														<Typography color="secondary" gutterBottom>
															Accounts
														</Typography>
														<List component="nav">
															<ListItem>
																<ListItemIcon>
																	<DoneIcon />
																</ListItemIcon>
																<ListItemText
																	inset
																	primary="0297 00988200918"
																/>
															</ListItem>
															<ListItem>
																<ListItemIcon>
																	<DoneIcon />
																</ListItemIcon>
																<ListItemText
																	inset
																	primary="0297 00988200920"
																/>
															</ListItem>
														</List>
													</div>
												</div>
											</Paper>
										</div>
									)}
									{activeStep === 3 && (
										<div className={classes.bigContainer}>
											<Paper className={classes.paper}>
												<div
													style={{ display: "flex", justifyContent: "center" }}
												>
													<div style={{ width: 380, textAlign: "center" }}>
														<div style={{ marginBottom: 32 }}>
															<Typography
																variant="h6"
																style={{ fontWeight: "bold" }}
																gutterBottom
															>
																Collecting your data
															</Typography>
															<Typography variant="body1" gutterBottom>
																We are processing your request
															</Typography>
														</div>
														<div>
															<Fade
																in={loading}
																style={{
																	transitionDelay: loading ? "800ms" : "0ms"
																}}
																unmountOnExit
															>
																<CircularProgress
																	style={{
																		marginBottom: 32,
																		width: 100,
																		height: 100
																	}}
																/>
															</Fade>
														</div>
													</div>
												</div>
											</Paper>
										</div>
									)} */}
									{/* {activeStep !== 3 && (
										<div className={classes.buttonBar}>
											{activeStep !== 2 ? (
												<Button
													disabled={activeStep === 0}
													onClick={this.handleBack}
													className={classes.backButton}
													size="large"
												>
													Back
												</Button>
											) : (
												<Button
													disabled={activeStep === 0}
													onClick={this.handleBack}
													className={classes.backButton}
													size="large"
												>
													Cancel
												</Button>
											)}
											<Button
												variant="contained"
												color="primary"
												onClick={this.handleNext}
												size="large"
												style={
													this.state.email.length
														? { background: classes.button, color: "white" }
														: {}
												}
												disabled={!this.state.email.length}
											>
												{this.stepActions()}
											</Button>
										</div>
									)} */}
								</div>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</React.Fragment>
		);
	}
}

export default withFirebaseAuth({
	providers,
	firebaseAppAuth
})(withRouter(withStyles(styles)(Signup)));
