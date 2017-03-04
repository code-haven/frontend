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
		this.state.max_floors = 5;
		this.state.design_floors = 0;
		this.state.available_far = 2;
		this.state.new_bua = 0;
		this.state.available_land_area = this.state.effective_area;
		this.state.bua = parseFloat(this.state.available_land_area) * this.state.available_far;
		this.state.far_status = 'Need not buy extra FAR - add floors';
		this.state.maximum_far_utilization_status = '';
		this.state.maximum_far_available = 0;	
		this.state.floor_diff = 0;
		this.state.additional_paid_far = 0;
		this.state.bua_per_floor = 0;
		this.state.total_far = 0;
		this.state.available_bua_with_additional_far = 0;
		this.state.betterment_levy_for_paid = 0;
		this.state.total_amount_pair_for_far = 0;
		this.props.data.globalData.results = this.state;

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
		debugger;
		this.state.FAR = 1.33;
		this.props.data.globalData.results = this.state;
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

		var available_land_area = this.state.effective_area - (ca/100) * this.state.effective_area;
		this.setState({
			'civic_amenities_perc': ca,
			'civic_amenities': (ca/100) * this.state.effective_area,
			'available_land_area': available_land_area,
			'bua': available_land_area * this.state.available_far
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

			var design_floors = parseInt(e.target.value);

			if (design_floors * this.state.ground_coverage < this.state.bua)
				this.state.far_status = 'Need not buy extra FAR - add floors' 
			else
				this.state.far_status = 'Should buy extra FAR: Check for Extra BUA - Need not buy if No additional floors need to be added'
			
			var break_even_floors = 0;
			if (design_floors <= this.state.max_floors)
				break_even_floors = Math.ceil(((parseInt(e.target.value) * this.state.ground_coverage) - this.state.bua)/this.state.ground_coverage);
			else
				break_even_floors = "Floors exceed the limit"

			this.setState({'break_even_floors': break_even_floors});


			var bua_per_floor = (design_floors * this.state.ground_coverage) / design_floors;
			this.setState({'bua_per_floor': bua_per_floor});
			
			var floor_diff = this.state.max_floors - design_floors;
			if (floor_diff > 0)
				this.setState({maximum_far_available: (this.state.ground_coverage / this.state.available_land_area) * floor_diff})
			else
				this.setState({maximum_far_available: 0})

			if (bua_per_floor > this.state.ground_coverage)
				this.setState({maximum_far_utilization_status: "Need not buy additional FAR as BUA/floor exceeds Permissible Gr. Co. - Increase the no. of floors"})
			else
				this.setState({maximum_far_utilization_status: `Can buy extra FAR: Check for max no. of floors - No of extra floors available to reach the limit is ${this.state.max_floors - design_floors}`});
			
			var additional_paid_far = 0;
			if (typeof(break_even_floors) == "Floors exceed the limit!")
				additional_paid_far = -1
			else
				additional_paid_far = (break_even_floors * this.state.ground_coverage) / this.state.available_land_area;

			var total_far = 0;
			if (typeof(additional_paid_far) == -1)
				total_far = -1
			else
				total_far =this.state.available_far + additional_paid_far;

			var available_bua_with_additional_far = 0;
			if (typeof(total_far) != -1)
				available_bua_with_additional_far = total_far * this.state.available_land_area;
			else
				available_bua_with_additional_far = -1;

			var betterment_levy_for_paid = 0;
			if (typeof(total_far) != 'string'){
				if (total_far < 2)
					betterment_levy_for_paid = 100;
				else if (total_far >= 2 && total_far < 2.25)
					betterment_levy_for_paid = 150;
				else if (total_far >= 2.25 && total_far < 2.75)
					betterment_levy_for_paid = 300;
				else
					betterment_levy_for_paid = 400;
			}
			else 
				betterment_levy_for_paid = "Floors exceed the limit, cannot compute."

			var total_amount_pair_for_far = 0;
			if (typeof(available_bua_with_additional_far) != "string" && typeof(betterment_levy_for_paid) != "string")
				total_amount_pair_for_far = ((available_bua_with_additional_far - this.state.bua) * betterment_levy_for_paid) / 10000000;
			else
				total_amount_pair_for_far = 'Invalid'

			this.setState({total_far: total_far});
			this.setState({additional_paid_far: additional_paid_far})
			this.setState({betterment_levy_for_paid: betterment_levy_for_paid})
			this.setState({available_bua_with_additional_far: available_bua_with_additional_far})
			this.setState({total_amount_pair_for_far: total_amount_pair_for_far})
		}
	}

	render() {
		var show_extra_far = this.state.new_bua < this.state.bua? true: false;
		var extra_far_style = {}
		if (show_extra_far)
			extra_far_style = {display: 'none'}
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
						<tr style={extra_far_style}>
							<td className="constant">No. of floors to be added after breaking even with Base FAR</td>
							<td>{this.state.break_even_floors}</td>
						</tr>
						<tr style={extra_far_style}>
							<td className="constant">BUA/Floor</td>
							<td>{this.state.bua_per_floor.toFixed(2)} sq.ft</td>
						</tr>
						<tr style={extra_far_style}>
							<td className="constant">Check for Maximum FAR utilization</td>
							<td>{this.state.maximum_far_utilization_status}</td>
						</tr>
						<tr style={extra_far_style}>
							<td className="constant">Max. FAR available (incremental to the current value)</td>
							<td>{this.state.maximum_far_available}</td>
						</tr>
						<tr style={extra_far_style}>
							<td className="constant">Additional Paid FAR</td>
							<td>{this.state.additional_paid_far.toFixed(6)}</td>
						</tr>
						<tr style={extra_far_style}>
							<td className="constant">Total FAR</td>
							<td>{this.state.total_far.toFixed(6)}</td>
						</tr>
						<tr style={extra_far_style}>
							<td className="constant">Available BUA with additional Paid FAR</td>
							<td>{this.state.available_bua_with_additional_far.toFixed(4)} sq.ft </td>
						</tr>
						<tr style={extra_far_style}>
							<td className="constant">Betterment levy for Paid FAR</td>
							<td>{this.state.betterment_levy_for_paid} Rs / sq.ft </td>
						</tr>
						<tr style={extra_far_style}>
							<td className="constant">Total amount paid for Extra FAR</td>
							<td>{this.state.total_amount_pair_for_far.toFixed(4)} Cr.</td>
						</tr>
						
					</tbody>	
				</table>
	          	<Button variant="raised">Calculate Cost of Project</Button>
	          	</Form>
            </div>
		)
	}
}