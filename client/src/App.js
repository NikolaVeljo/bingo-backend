import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Bingo from "./components/Bingo/Bingo";
import Navigation from "./components/Navigation/Navigation";
import Tickets from "./components/Tickets/Ticket";
import Statistic from "./components/Statistic/Statistic";
import Footer from "./components/Footer/Footer";
import Profile from "./components/Profile";
import Signout from "./components/Signout";
import EmailConfirm from "./components/EmailConfirm/EmailConfirm";

export default function App() {
	  
	return (
		<div className='grid-container'>
			<BrowserRouter>
			<Navigation />
			
			<Switch>
				
			<Route path='/' exact>
					<Bingo />
				</Route>

				<Route path='/tickets' exact>
					<Tickets />
				</Route>

				<Route path='/statistic' exact>
					<Statistic />
				</Route>

				<Route path='/profile' exact>
					<Profile />
				</Route>

				<Route path='/sign-out' exact>
					<Signout />
				</Route>

				<Route path='/confirm-email/:emailToken' exact>
					<EmailConfirm />
				</Route>
				
				</Switch>
				<Footer />
				</BrowserRouter>
		</div>
	);
}
