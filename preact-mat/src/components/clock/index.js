import { h, Component } from 'preact';
import style from './style';
import moment from 'moment';

export default class Clock extends Component {

	state = {
		time: '',
	};

	// gets called when this route is navigated to
	componentDidMount() {
		// start a timer for the clock:
		this.timer = setInterval(this.updateTime, 100);
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	// update the current time
	updateTime = () => {
		this.setState({ time: moment().format('YYYY-MM-DD hh:mm:ss.SSS A') });
	};

	render() {
		return (
			<div class={style.clock}>
				Current time: {this.state.time}
			</div>
		);
	}
}
