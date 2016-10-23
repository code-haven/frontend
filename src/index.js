import PlotSizeInputForm from './components/form';
// import SpatialPlanner from './components/spatial';
import React from 'react';
import { render } from 'react-dom';
import Appbar from 'muicss/lib/react/appbar';
import Container from 'muicss/lib/react/container';
import { Router, Route, Link, browserHistory } from 'react-router'
import RecursiveTreeBuilder from './components/treebuilder'

class App extends React.Component {

	constructor() {
		super();
		this.state = {
			page: 1
		};
		this.globalData = {};
	}

	nextPage() {
		this.setState({page: this.state.page + 1})
	}

	previousPage() {
		this.setState({page: this.state.page - 1})
	}

	render() {
		switch (this.state.page) {
			case 1:
			  return (
		            <PlotSizeInputForm globalData={this.globalData} nextPage={this.nextPage.bind(this)} previousPage={this.previousPage.bind(this)}/>
				)
			case 2:
			  return (
		            <RecursiveTreeBuilder />
				)
		}
		
	}
}
render(<App />, document.getElementById('app'));
