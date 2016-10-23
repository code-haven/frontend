import React from 'react';
import ProgressBar from './progress'
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';
import Panel from 'muicss/lib/react/panel';
import $ from 'jquery'


export default class PlotSizeInputForm extends React.Component {

	constructor () {
		super();
		this.state =  {
			length: '', 
			breadth: '', 
			region: 'Karnataka'
		};
	}

	handleLengthChange(e) {
		this.setState({length: parseInt(e.target.value)})
	}

	handleBreadthChange(e) {
		this.setState({breadth: parseInt(e.target.value)})
	}

	handleRegionChange(e) {
		this.setState({region: e.target.value})
	}


	calculateArea(e) {
		e.preventDefault();

		this.props.globalData.length = this.state.length;
		this.props.globalData.breadth = this.state.breadth;
		this.props.globalData.area = this.state.length * this.state.breadth;

		const params = {
			'length': this.props.globalData.length,
			'area': this.props.globalData.area,
			'breadth': this.props.globalData.breadth
		}
		// $.ajax({
		// 	url: 'http://localhost:8000/api/spatial_planning', 
		// 	data: params,
		// 	success: (response) => {
		// 		this.props.globalData.spatial_planning = response
		// 		this.props.nextPage();
		// 	}
		// })
		this.props.globalData.spatial_planning = {}
		this.props.nextPage();
		
		
	}

	render() {
		return (
			<Panel id="formPanel">
			  <ProgressBar step={1} step_name={"Inputs"} />
			  <Form onSubmit={this.calculateArea.bind(this)}>
		          <legend>Calculate Maximizing Large</legend>
		          <Input label="Length of the Plot" value={this.state.length} onChange={this.handleLengthChange.bind(this)} hint="Enter value in meters" required={true}/>
		          <Input label="Breadth of the Plot" value={this.state.breadth} onChange={this.handleBreadthChange.bind(this)} hint="Enter value in meters" required={true}/>  
		        <Select label="Select a region" value={this.state.region} required={true} onChange={this.handleRegionChange.bind(this)}>
					<Option value="Andaman and Nicobar Islands" defaultValue="Karnataka" label="Andaman and Nicobar Islands"/>
					<Option value="Andhra Pradesh" label="Andhra Pradesh"/>
					<Option value="Arunachal Pradesh" label="Arunachal Pradesh"/>
					<Option value="Assam" label="Assam"/>
					<Option value="Bihar" label="Bihar"/>
					<Option value="Chandigarh" label="Chandigarh"/>
					<Option value="Chhattisgarh" label="Chhattisgarh"/>
					<Option value="Dadra and Nagar Haveli" label="Dadra and Nagar Haveli"/>
					<Option value="Daman and Diu" label="Daman and Diu"/>
					<Option value="Delhi" label="Delhi"/>
					<Option value="Goa" label="Goa"/>
					<Option value="Gujarat" label="Gujarat"/>
					<Option value="Haryana" label="Haryana"/>
					<Option value="Himachal Pradesh" label="Himachal Pradesh"/>
					<Option value="Jammu and Kashmir" label="Jammu and Kashmir"/>
					<Option value="Jharkhand" label="Jharkhand"/>
					<Option value="Karnataka" label="Karnataka"/>
					<Option value="Kerala" label="Kerala"/>
					<Option value="Lakshadweep" label="Lakshadweep"/>
					<Option value="Madhya Pradesh" label="Madhya Pradesh"/>
					<Option value="Maharashtra" label="Maharashtra"/>
					<Option value="Manipur" label="Manipur"/>
					<Option value="Meghalaya" label="Meghalaya"/>
					<Option value="Mizoram" label="Mizoram"/>
					<Option value="Nagaland" label="Nagaland"/>
					<Option value="Orissa" label="Orissa"/>
					<Option value="Pondicherry" label="Pondicherry"/>
					<Option value="Punjab" label="Punjab"/>
					<Option value="Rajasthan" label="Rajasthan"/>
					<Option value="Sikkim" label="Sikkim"/>
					<Option value="Tamil Nadu" label="Tamil Nadu"/>
					<Option value="Tripura" label="Tripura"/>
					<Option value="Uttaranchal" label="Uttaranchal"/>
					<Option value="Uttar Pradesh" label="Uttar Pradesh"/>
					<Option value="West Bengal" label="West Bengal"/>
				   </Select>
	          	<Button variant="raised">Next</Button>
	        </Form>
	      </Panel>  
		)
	}
}

