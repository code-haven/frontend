import React from 'react';
import Tab from 'muicss/lib/react/tab';	
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';


export default class PlanningParameters extends React.Component {
	constructor(data) {
		super(data);
		debugger
		this.data = data.data;

		const ground_coverage =  0.35 * this.data.globalData.area;
		const effective_area = ground_coverage - 0.03 * ground_coverage;

		this.state = {
			ground_coverage: ground_coverage,
			effective_area: effective_area,
			approach_road: '',
			height: '',
			saleable_area: {
				commercial: '',
				residential: ''
			},
			commercial_area: '',
			residential_area: '',
		}

		this.props.data.globalData.spatial_planning = this.state;
	}

	handleApproachRoadChange(e) {

		if (!parseInt(e.target.value)) {
			this.setState({approach_road: e.target.value});
			return;
		}

		this.setState({approach_road: parseInt(e.target.value)})

		if (this.state.approach_road < 12)
		  this.setState({height: '15 m'})

		if (this.state.approach_road >= 12 && this.state.approach_road < 18)
		  this.setState({height: '24 m'})

		if (this.state.approach_road >= 18 && this.state.approach_road < 36)
		  this.setState({height: '36 m'})

		if (this.state.approach_road >= 24 && this.state.approach_road < 45)
		  this.setState({height: '45 m'})	
		
		if (this.state.approach_road > 45)
		  this.setState({height: "As per Byelaws"})	
		
		
	}

	finalCalculation(e) {
		e.preventDefault();
		console.log(this.props);

		this.state.FAR = 2.25
		const commercial = this.state.commercial_area/100 * (this.state.effective_area * this.state.FAR); 
		this.state.saleable_area = {
			commercial: commercial,
			residential: (this.state.effective_area * this.state.FAR) - commercial
		}
		this.props.data.globalData.spatial_planning = this.state;
		this.props.data.nextPage();
	}

	handleCommercialAreaChange(e) {

		var c = parseFloat(e.target.value);
		
		if (c > 3) 
			c = 3;
  	else if (c.toString() != e.target.value) {
			this.setState({commercial_area: e.target.value})
			return
		}

		this.setState({commercial_area: c})
	  this.setState({residential_area: 100 - c});


	}

	handleResidentialAreaChange(e) {
	var r = parseFloat(e.target.value);

		if (r > 100) 
			r = 100;
		else if (r.toString() != e.target.value) {
			this.setState({residential_area: e.target.value})
			return
		}
		this.setState({residential_area: r})
	  this.setState({commercial_area: 100 - r})
	}

	render() {
		return (
            <div className="planning">
            	<Form onSubmit={this.finalCalculation.bind(this)}>
                 <table class="mui-table">
                    <tbody>
                        <tr>
                	        <td>Mandatory Provisions</td>
							<td>N/A</td>
						</tr>
						<tr>
                	        <td>Ground Coverage (35%) </td>
							<td>{this.state.ground_coverage.toFixed(2)} acres</td>
						</tr>
						<tr>
                	        <td>Civic Amenities (3%) </td>
							<td>{ (0.03 * this.state.ground_coverage).toFixed(2)} acres</td>
						</tr>
						<tr>
                	        <td>Approach Road </td>
							<td>
								<Input label="Input the approach Road"  value={this.state.approach_road} onChange={this.handleApproachRoadChange.bind(this)} hint="Input the approach Road in meters" required={true}/></td>
						</tr>
						<tr>
                	        <td>Height </td>
							<td>{this.state.height}</td>
						</tr>
						<tr>
                	        <td>FAR </td>
							<td><table class="mui-table">
                                <tbody>
                                    <tr>
                                    <td>Standard FAR (1.33)</td>
                                    <td>{(1.33 * this.state.ground_coverage).toFixed(2)} acres</td>
                                    </tr>
                                    <tr>
                                    <td>Maximum FAR (2.25) </td>
                                    <td>{(2.25 * this.state.ground_coverage).toFixed(2)} acres</td>
                                    </tr>
                                </tbody>
                            </table></td>
						</tr>
						<tr>
                	        <td>Commercial Area: Residential Area</td>
							<td>
								<Input label="Commercial Area %"  value={this.state.commercial_area} onChange={this.handleCommercialAreaChange.bind(this)} hint=" <= 3%" required={true}/>
								<Input label="Residential Area %"  value={this.state.residential_area} onChange={this.handleResidentialAreaChange.bind(this)} hint="" required={true}/></td>
						</tr>
						
					</tbody>
				</table>
	          	<Button variant="raised">Generate Output</Button>
	          	</Form>
            </div>
		)
	}
}