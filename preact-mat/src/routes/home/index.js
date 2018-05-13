import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import Clock from '../../components/clock';
import GitSearch from '../../components/gitsearch';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<h1>Home route</h1>
				<Card>
					<div class={style.cardHeader}>
						<h2 class="mdc-typography--title">Home card</h2>
						<div class="mdc-typography--caption">Welcome to home route</div>
					</div>
					<div class={style.cardBody}>
						foo bar
					</div>

					<div><Clock/></div>

					<div><GitSearch/></div>

					<Card.Actions>
						<Card.ActionButton>OKAY</Card.ActionButton>
					</Card.Actions>
				</Card>
			</div>
		);
	}
}
