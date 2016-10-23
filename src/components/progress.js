import React from 'react';

export default class ProgressBar extends React.Component {
	render() {
		return (
			<div>
			  <h1 className="progressbar">Step {this.props.step} - {this.props.step_name}</h1>
			</div>  
		)
	}
}