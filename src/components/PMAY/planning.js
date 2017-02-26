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

		this.state = this.data.globalData.spatial_planning;
		this.state.effective_area = this.data.globalData.area;
		this.state.ground_coverage = 0.0;
		this.state.civic_amenities = 0.0;
		this.state.max_floors = 6;
		this.state.design_floors = 0;
		this.state.available_far = 2;
		this.state.new_bua = 0;
		this.state.available_land_area = this.state.effective_area;
		this.state.bua = parseFloat(this.state.available_land_area) * this.state.available_far;
		this.state.far_status = 'Need not buy extra FAR - add floors'
		this.props.data.globalData.spatial_planning = this.state;

		this.handleGroundCoverageChange.bind(this);
	}

	handleApproachRoadChange(e) {

		this.setState({approach_road: e.target.value});
		if (!parseFloat(e.target.value)) {
			return;
		}

		var approach_road = parseFloat(e.target.value);
		
		if (approach_road < 9)
		  this.setState({height: 'Approach Road too small for group housing'})
		if (approach_road > 9 && approach_road <= 12)
		  this.setState({height: '15 m'})

		if (approach_road > 12 && approach_road <= 18)
		  this.setState({height: '24 m'})

		if (approach_road > 18 && approach_road <= 36)
		  this.setState({height: '36 m'})

		if (approach_road > 24 && approach_road <= 45)
		  this.setState({height: '45 m'})	
		
		if (approach_road > 45)
		  this.setState({height: "Too high a value for Affordable Housing"})	
		
		
	}

	finalCalculation(e) {
		e.preventDefault();

		this.state.FAR = 1.33;
		const commercial = this.state.commercial_area/100 * (this.state.effective_area * this.state.FAR); 
		this.state.saleable_area = {
			commercial: commercial,
			residential: ((this.state.effective_area * this.state.FAR) - commercial)
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

	handleCivicAmenitiesChange(e) {
		let ca = parseFloat(e.target.value);

		if (ca > 100)
			ca = 100;
		else if (ca.toString() != e.target.value) {
			this.setState({civic_amenities_perc: e.target.value})
			return
		}
		this.setState({
			'civic_amenities_perc': ca,
			'civic_amenities': (ca/100) * this.state.effective_area,
			'available_land_area': this.state.effective_area - (ca/100) * this.state.effective_area
		});
	}

	handleGroundCoverageChange(e) {
		let gc = parseFloat(e.target.value);

		if (gc > 100)
			gc = 100;
		else if (gc.toString() != e.target.value) {
			this.setState({ground_coverage_perc: e.target.value})
			return
		}
		this.setState({
			'ground_coverage_perc': gc,
			'ground_coverage': (gc/100) * this.state.effective_area
		});
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

	handleDesignFloorChange(e) {
		if (!e.target.value)
			this.setState({design_floors: 0})
		else{
			this.setState({design_floors: parseInt(e.target.value)});
			this.setState({new_bua: parseInt(e.target.value) * this.state.ground_coverage})

			console.log(this.state.bua)
			if ((parseInt(e.target.value) * this.state.ground_coverage) < this.state.bua)
				this.state.far_status = 'Need not buy extra FAR - add floors' 
			else
				this.state.far_status = 'Should buy extra FAR: Check for Extra BUA - Need not buy if No additional floors need to be added'
		}
	}

	render() {
		return (
            <div className="planning">
            	<Form onSubmit={this.finalCalculation.bind(this)}>
                 <table class="mui-table">
                    <tbody>
						<tr>
							<td className="constant">Land Area</td>
							<td>{(this.state.effective_area).toFixed(2)} sq.ft</td>
						</tr>
						<tr>
                	        <td>Input Civic Amenities</td>
							<td><Input label="" value={this.state.civic_amenities_perc} onChange={this.handleCivicAmenitiesChange.bind(this)} label=" Enter % of Civic Amenities acc to Byelaws" required={true}/></td>
						</tr>
						<tr>
							<td className="constant">Civic Amenities</td>
							<td>{(this.state.civic_amenities).toFixed(2)} sq.ft</td>
						</tr>
						<tr>
							<td className="constant">Available Land Area</td>
							<td>{(this.state.available_land_area).toFixed(2)} sq.ft</td>
						</tr>
						<tr>
                	        <td>Input Ground Coverage</td>
							<td>
								<Input label=""  value={this.state.ground_coverage_perc} onChange={this.handleGroundCoverageChange.bind(this)} label="Enter % of Ground Coverage acc to Byelaws" required={true}/></td>
						</tr>
						<tr>
							<td className="constant">Ground Coverage</td>
							<td>{(this.state.ground_coverage).toFixed(2)} sq.ft</td>
						</tr>
						
						<tr>
                	        <td>Approach Road </td>
							<td>
								<Input value={this.state.approach_road} onChange={this.handleApproachRoadChange.bind(this)} label="Input the approach Road in meters" required={true}/></td>
						</tr>
						<tr>
                	        <td className="constant">Allowable Height</td>
							<td>{this.state.height}</td>
						</tr>
						<tr>
							<td className="constant">Max number of floors</td>
							<td>{this.state.max_floors}</td>
						</tr>
						<tr>
                	        <td>Input no. of floors</td>
							<td>
								<Input value={this.state.design_floors} onChange={this.handleDesignFloorChange.bind(this)} label="Enter no. of floors as per your design" required={true}/></td>
						</tr>
						<tr>
							<td className="constant">Available FAR</td>
							<td>{this.state.available_far}</td>
						</tr>
						<tr>
							<td className="constant">Available Built Up Area (BUA)</td>
							<td>{this.state.bua} sq.ft</td>
						</tr>
						<tr>
							<td className="constant">New BUA with the given floors</td>
							<td>{this.state.new_bua} sq.ft</td>
						</tr>
						<tr>
							<td className="constant">FAR</td>
							<td>{this.state.far_status}</td>
						</tr>
						<tr>
                	        <td>Commercial Area: Residential Area</td>
							<td>
								<Input label="Commercial Area %"  value={this.state.commercial_area} onChange={this.handleCommercialAreaChange.bind(this)} hint=" <= 3%" required={true}/>
								<Input label="Residential Area %"  value={this.state.residential_area} onChange={this.handleResidentialAreaChange.bind(this)} hint="" required={true}/></td>
						</tr>
						<tr>
                	        <td>Residential Area Planning Regulations</td>
                	        <td>
                	        	<table class="mui-table">
                                <tbody>
                                	<tr>
                                	<td>Minimum Setback</td>
                                	<td><table class="mui-table">
		                                <tbody>
		                                    <tr>
		                                    <td>Front</td>
		                                    <td>15m</td>
		                                    </tr>
		                                    <tr>
		                                    <td>Side</td>
		                                    <td>9m</td>
		                                    </tr>
		                                    <tr>
		                                    <td>Back</td>
		                                    <td>9m</td>
		                                    </tr>
		                                </tbody>
		                            </table>
		                            </td>
		                            </tr>
		                            <tr>
		                            <td>Height</td>
		                            	<td>N/A</td>
		                            </tr>
		                            <tr>
		                            <td>Parking</td>
		                            <td>
		                            	<table class="mui-table">
		                                <tbody>

		                                    <tr>
		                                    <td className="listing">1 ECU per 150 sq.m FAR for <b>Residential</b> projects with plot size greater than 500 sq.m
		                                    	<br />
		                                    	<ul>
		                                    		<li>1 ECU = 23 sqm in Open Area</li>

													<li>1 ECU = 28 sqm in Ground Level Parking</li>

													<li>1 ECU = 32 sqm in Basement Parking</li>

													<li>75% of total ECU is reserved for car, 20% for Two- wheelers, 5% for Bicycle</li>
		                                    	</ul>
		                                    </td>
		     								</tr>
				                            
		                                </tbody>
		                            </table>
		                            </td>
                                    </tr>
                                </tbody>
                            </table>
                            </td>
							
							
						</tr>
						<tr>
                	        <td>Commercial Area Planning Regulations</td>
                	        <td>
                	        	<table class="mui-table">
                                <tbody>
                                	<tr>
                                	<td>Minimum Setback</td>
                                	<td><table class="mui-table">
		                                <tbody>
		                                    <tr>
		                                    <td>Front</td>
		                                    <td>15m</td>
		                                    </tr>
		                                    <tr>
		                                    <td>Side</td>
		                                    <td>9m</td>
		                                    </tr>
		                                    <tr>
		                                    <td>Back</td>
		                                    <td>9m</td>
		                                    </tr>
		                                </tbody>
		                            </table>
		                            </td>
		                            </tr>
		                            <tr>
		                            <td>Height</td>
		                            	<td>N/A</td>
		                            </tr>
		                            <tr>
		                            <td>Parking</td>
		                            <td>
		                            	<table class="mui-table">
		                                <tbody>
		                                    <tr>
		                                    <td className="listing">1 ECU per 50 sq.m FAR for <b>Commercial</b> projects.
		                                    <br />	
		                                    	<ul>
		                                    		<li>1 ECU = 23 sqm in Open Area</li>

													<li>1 ECU = 28 sqm in Ground Level Parking</li>

													<li>1 ECU = 32 sqm in Basement Parking</li>

													<li>75% of total ECU is reserved for car, 20% for Two- wheelers, 5% for Bicycle</li>
		                                    	</ul>
		                                    </td>
		     								</tr>
				                            
		                                </tbody>
		                            </table>
		                            </td>
                                    </tr>
                                </tbody>
                            </table>
                            </td>
							
							
						</tr>

					</tbody>	
				</table>
	          	<Button variant="raised">Generate Output</Button>
	          	</Form>
            </div>
		)
	}
}