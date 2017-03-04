import React from 'react';
import Tab from 'muicss/lib/react/tab';	
import Panel from 'muicss/lib/react/panel';
import ProgressBar from '../progress'
import Button from 'muicss/lib/react/button';
import Input from 'muicss/lib/react/input';


export default class FinalResult extends React.Component {
    constructor(params) {
        super(params);

        this.state = {
            'construction_cost': '',
            'land_cost': '',
            'infra_charges': '',
            'cost_for_approvals': '',
            'design_cost': '',
            'cess_and_taxes': '',
            'project_management_expenses': '',
            'adm_overheads': '',
            'contingencies': '',
            'finance_cost': '',
            'total_cost': 0
        }

        this.handleChange.bind(this);
    }

    handleChange(e) {
        if (e.target) {
            var new_state = {};
            new_state[e.target.name] = e.target.value;
            this.setState(new_state);

            var total = 0.0;
            console.log(this.state);
            for (var i in this.state){
                if (i == e.target.name)
                    total += parseFloat(e.target.value)
                else if (i == 'total_cost')
                    continue;
                else
                    if (this.state[i] != '')
                        total += parseFloat(this.state[i]);
            }
            this.setState({'total_cost': total});
        }

    }
	render() {
        debugger
		return (
            <div className="final">
                <Button onClick={this.props.previousPage} variant="raised">Previous</Button>
                <Panel>
               <ProgressBar step={3} step_name={"Calculate total cost of project"} />
               <div className="final">
                   <div className="cntrn">
                        <legend>Base FAR cost</legend>
                        <Input label="" name='construction_cost' value={this.state.construction_cost} onChange={this.handleChange.bind(this)} label=" Enter construction cost" required={true}/>
                        <Input label="" name='land_cost' value={this.state.land_cost} onChange={this.handleChange.bind(this)} label="Enter Land Cost" required={true}/>
                        <Input label="" name='infra_charges' value={this.state.infra_charges} onChange={this.handleChange.bind(this)} label="Enter Infra Charges" required={true}/>
                        <Input label="" name='cost_for_approvals' value={this.state.cost_for_approvals} onChange={this.handleChange.bind(this)} label="Enter cost for approvals" required={true}/>
                        <Input label="" name='design_cost' value={this.state.design_cost} onChange={this.handleChange.bind(this)} label="Enter Design Cost" required={true}/>
                        <Input label=""  name='cess_and_taxes' value={this.state.cess_and_taxes} onChange={this.handleChange.bind(this)} label=" Enter Cess and Taxes" required={true}/>
                        <Input label=""  name='project_management_expenses' value={this.state.project_management_expenses} onChange={this.handleChange.bind(this)} label=" Project Management Expenses" required={true}/>
                        <Input label=""  name='adm_overheads' value={this.state.adm_overheads} onChange={this.handleChange.bind(this)} label="Adm  overheads" required={true}/>
                        <Input label=""  name='contingencies' value={this.state.contingencies} onChange={this.handleChange.bind(this)} label="Contingencies" required={true}/>
                        <Input label=""  name='finance_cost' value={this.state.finance_cost} onChange={this.handleChange.bind(this)} label="Enter Finance Cost" required={true}/>
                    <h5>Total cost of project: {this.state.total_cost} Cr.</h5>
                    </div>

                    </div>
            </Panel>
            </div>
		)
	}
}