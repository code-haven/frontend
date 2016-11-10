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
			area: '',
			model: '',
			region: 'Karnataka'
		};
	}

	handleAreaChange(e) {

		if (parseFloat(e.target.value).toString() != e.target.value) {
			this.setState({area: e.target.value})
			return
		}

		this.setState({area: parseFloat(e.target.value)})
	}

	handleRegionChange(e) {
		this.setState({region: e.target.value})
	}

	handleModelChange(e) {
		this.setState({model: e.target.value})
	}

	calculateArea(e) {
		e.preventDefault();


		this.props.globalData.area = this.state.area;
		this.props.globalData.spatial_planning = {}

		if (this.props.globalData.area < 5) {
			alert('Minimimum required area is 5 acres.');
			return;
		}

		this.props.globalData.area = 43560 * this.props.globalData.area;
		this.props.nextPage();
		
		
	}

	render() {
		return (
			<Panel id="formPanel">
			  <ProgressBar step={1} step_name={"WELCOME TO MAXIMISING LARGE"} />
			  <Form className="inputForm" onSubmit={this.calculateArea.bind(this)}>
		          <Select label="Select a State" value={this.state.region} required={true} onChange={this.handleRegionChange.bind(this)}>
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
				   <Input label="Land Area (in Acres)"  value={this.state.area} onChange={this.handleAreaChange.bind(this)} hint="Enter Land Area > 5 Acres" required={true}/>
		          <Select label="Select the operating model" value={this.state.model} required={true} onChange={this.handleModelChange.bind(this)}>
				  	<Option value="PMAY" label="PMAY"/>
					<Option value="State" label="State"/>
				  </Select>
	          	<Button variant="raised">Optimise</Button>
	        </Form>
	      </Panel>  
		)
	}
}

