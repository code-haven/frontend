import React from 'react';
import Tab from 'muicss/lib/react/tab';	
import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';

export default class Incentives extends React.Component {
	constructor(data) {
		super();
		this.data = data.data;

		this.state = {
			first_level_dropdown: false,
			second_level_dropdown: false,
			third_level_dropdown: false
		}
	}
	handleFirstLevelChange(e) {
		this.setState({first_level_dropdown: e.target.value})
	}
	handleSecondLevelChange(e) {
			this.setState({second_level_dropdown: e.target.value})
		}
	handleThirdLevelChange(e) {
		this.setState({third_level_dropdown: e.target.value})
	}
	render() {
	if (!this.state.first_level_dropdown) {
			return (
				<div className="incentive">
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleFirstLevelChange.bind(this)}>
						<Option value="" label="" />
						<Option value="Developer" label="Developer"/>
						<Option value="Buyer" label="Buyer"/>
					</Select>
				</div>
			)
	}
	else if(this.state.first_level_dropdown == "Developer") {
		if (this.state.second_level_dropdown == "Monetary") {
			if (this.state.third_level_dropdown == "Center") {
				<div className="incentive">
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleFirstLevelChange.bind(this)}>
						<Option value="Developer" label="Developer"/>
						<Option value="Buyer" label="Buyer"/>
					</Select>
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleSecondLevelChange.bind(this)}>
						<Option value="Monetary" label="Monetary"/>
						<Option value="Regulatory" label="Regulatory"/>
					</Select>
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleThirdLevelChange.bind(this)}>
						<Option value="Center" label="Center"/>
						<Option value="State" label="State"/>
					</Select>
					<label>Incentives</label>
					<p>Section 80IBA - 100% Tax Excemption on profits on qualifying projects.<br/>Service Tax Excemption.</p>
				</div>
			}
			else if (this.state.third_level_dropdown == "State") {
				<div className="incentive">
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleFirstLevelChange.bind(this)}>
						<Option value="Developer" label="Developer"/>
						<Option value="Buyer" label="Buyer"/>
					</Select>
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleSecondLevelChange.bind(this)}>
						<Option value="Monetary" label="Monetary"/>
						<Option value="Regulatory" label="Regulatory"/>
					</Select>
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleThirdLevelChange.bind(this)}>
						<Option value="State" label="State"/>
						<Option value="Center" label="Center"/>
					</Select>
					<label>Incentives</label>
					<p>Nil</p>
				</div>
			}
			return (
				<div className="incentive">
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleFirstLevelChange.bind(this)}>
						<Option value="Developer" label="Developer"/>
						<Option value="Buyer" label="Buyer"/>
					</Select>
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleSecondLevelChange.bind(this)}>
						<Option value="Monetary" label="Monetary"/>
						<Option value="Regulatory" label="Regulatory"/>
					</Select>
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleThirdLevelChange.bind(this)}>
						<Option value="" label="" />
						<Option value="Center" label="Center"/>
						<Option value="State" label="State"/>
					</Select>
				</div>
			)
		}
		else if (this.state.second_level_dropdown == "Regulatory") {
			if (this.state.third_level_dropdown == "Center") {
				<div className="incentive">
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleFirstLevelChange.bind(this)}>
						<Option value="Developer" label="Developer"/>
						<Option value="Buyer" label="Buyer"/>
					</Select>
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleSecondLevelChange.bind(this)}>
						<Option value="Regulatory" label="Regulatory"/>
						<Option value="Monetary" label="Monetary"/>
					</Select>
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleThirdLevelChange.bind(this)}>
						<Option value="Center" label="Center"/>
						<Option value="State" label="State"/>
					</Select>
					<label>Incentives</label>
					<p>Nil</p>
				</div>
			}
			else if (this.state.third_level_dropdown == "State") {
				<div className="incentive">
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleFirstLevelChange.bind(this)}>
						<Option value="Developer" label="Developer"/>
						<Option value="Buyer" label="Buyer"/>
					</Select>
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleSecondLevelChange.bind(this)}>
						<Option value="Regulatory" label="Regulatory"/>
						<Option value="Monetary" label="Monetary"/>
					</Select>
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleThirdLevelChange.bind(this)}>
						<Option value="State" label="State"/>
						<Option value="Center" label="Center"/>
					</Select>
					<label>Incentives</label>
					<p>Depends on Planning Authority.</p>
				</div>
			}
			return (
				<div className="incentive">
					<Select label="Select an option" required={true} onChange={this.handleFirstLevelChange.bind(this)}>
						<Option value="Developer" label="Developer"/>
						<Option value="Buyer" label="Buyer"/>
					</Select>
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleSecondLevelChange.bind(this)}>
						<Option value="Monetary" label="Monetary"/>
						<Option value="Regulatory" label="Regulatory"/>
					</Select>
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleThirdLevelChange.bind(this)}>
						<Option value="" label="" />
						<Option value="Center" label="Center"/>
						<Option value="State" label="State"/>
					</Select>
				</div>
			)
		}
		return (
				<div className="incentive">
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleFirstLevelChange.bind(this)}>
						<Option value="Developer" label="Developer"/>
						<Option value="Buyer" label="Buyer"/>
					</Select>
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleSecondLevelChange.bind(this)}>
						<Option value="" label="" />
						<Option value="Monetary" label="Monetary"/>
						<Option value="Regulatory" label="Regulatory"/>
					</Select>
				</div>
			)
	}
	else if(this.state.first_level_dropdown == "Buyer") {
		if (this.state.second_level_dropdown == "Center") {
			return (
				<div className="incentive">
					<Select label="Select an option" defaultValue="Buyer" required={true} onChange={this.handleFirstLevelChange.bind(this)}>
						<Option value="Buyer" label="Buyer"/>
						<Option value="Developer" label="Developer"/>
					</Select>
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleSecondLevelChange.bind(this)}>
						<Option value="" label="" />
						<Option value="Center" label="Center"/>
						<Option value="State" label="State"/>
					</Select>
					<label>Incentives</label>
					<p>PMAY Subsidy</p>
				</div>
			)
		}
		else if (this.state.second_level_dropdown == "State") {
			return (
				<div className="incentive">
					<Select label="Select an option" defaultValue="Buyer" required={true} onChange={this.handleFirstLevelChange.bind(this)}>
						<Option value="Buyer" label="Buyer"/>
						<Option value="Developer" label="Developer"/>
					</Select>
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleSecondLevelChange.bind(this)}>
						<Option value="" label="" />
						<Option value="Center" label="Center"/>
						<Option value="State" label="State"/>
					</Select>
					<label>Incentives</label>
					<p>Nil</p>
				</div>
			)
		}
		return (
				<div className="incentive">
					<Select label="Select an option" defaultValue="Buyer" required={true} onChange={this.handleFirstLevelChange.bind(this)}>
						<Option value="Buyer" label="Buyer"/>
						<Option value="Developer" label="Developer"/>
					</Select>
					<Select label="Select an option" defaultValue="" required={true} onChange={this.handleSecondLevelChange.bind(this)}>
						<Option value="" label="" />
						<Option value="Center" label="Center"/>
						<Option value="State" label="State"/>
					</Select>
				</div>
			)
	}
	}
}