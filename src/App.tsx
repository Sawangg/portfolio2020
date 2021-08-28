import { Suspense } from "react";
import { createUseStyles } from 'react-jss';
import injectSheet from 'react-jss';
import Particules from "./Particules";
import ComponentTransition from "./components/ComponentTransition";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Progression from "./components/Progression";
import './services/i18n';

const defaultStyle = {
	'@global': {
		'*, *::before, *::after': {
			scrollbarColor: '#202324 #454a4d',
			boxSizing: 'inherit'
		},
		html: {
			WebkitFontSmoothing: 'antialiased',
			MozFontSmoothing: 'grayscale',
			boxSizing: 'border-box',
			overflowX: 'hidden',
			backgroundColor: "#252934",
		},
		body: {
			margin: 0,
			overflowX: 'hidden',
			fontFamily: 'Raleway',
			color: "#FFFFFF",
			backgroundColor: "#252934", //#fffafa
			fontWeight: 400,
			lineHeight: 1.43,
			letterSpacing: "0.01071em",
			direction: 'ltr',
			overscrollBehavior: "contain",
			fontSize: '0.875rem',
			position: "relative",
			minHeight: "4600px",
		},
		h1: {
			margin: 0,
		},
		a: {
			"&:focus": {
				outline: 0
			}
		}
	},
};

const App = () => {

	const useStyles = createUseStyles({
		rootFixed: {
			position: "fixed",
			width: "100vw",
			height: "100vh"
		},
		footer: {
			zIndex: 1,
			width: "100vw",
			position: "absolute",
			bottom: 0,
			marginBottom: "2.5em",
		},

		'@media screen and (max-width: 600px)': {
			footer: {
				marginBottom: "3.5em",
			},
		}
	});

	const classes = useStyles();

	return (
		<div className={classes.rootFixed}>
			<Particules />
			<Suspense fallback="Loading...">
				<Progression />
				<ComponentTransition />
				<div className={classes.footer}>
					<LanguageSwitcher />
				</div>
			</Suspense>
		</div>
	);
}

export default injectSheet(defaultStyle)(App);