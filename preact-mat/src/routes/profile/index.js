import { h, Component } from 'preact';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class Profile extends Component {
	state = {
		count: 0
	};

	increment = () => {
		this.setState({ count: this.state.count+1 });
	};

	// Note: `user` comes from the URL, courtesy of our router
	render({ user }, { time, count }) {
		return (
			<div class={style.profile}>
				<h1>Profile: {user}</h1>
				<p>User profile for: {user}.</p>

				<p>
					<Button raised ripple onClick={this.increment}>Click Me</Button>
					{' '}
					Clicked {count} times.
				</p>
			</div>
		);
	}
}
