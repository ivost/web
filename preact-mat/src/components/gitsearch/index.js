import { h, Component } from 'preact';
import style from './style';

const SEARCH = '//api.github.com/search/repositories';

export default class GitSearch extends Component {

	async componentDidMount() {
		// GET request to github search API
		let res = await fetch(`${SEARCH}?q=ivo`),
			json = await res.json(),
			results = json && json.items || [];
		this.setState({ results });
	}

	render({ }, { results=[] }) {
		return (
			<div>
				<h1 style="text-align:center;">Git repos</h1>
				<div class="list">
					{ results.map( result => (
						<Result result={result} />
					)) }
				</div>
			</div>
		);
	}
}

const Result = ({ result }) => (
	<div style={{
		padding: 10,
		margin: 10,
		background: 'white',
		boxShadow: '0 1px 5px rgba(0,0,0,0.5)'
	}}>
		<div>
			<a href={result.html_url} target="_blank">
				{result.full_name}
			</a>
			🌟<strong>{result.stargazers_count}</strong>
		</div>
		<p>{result.description}</p>
	</div>
);
