import React from 'react';
import Panel from 'muicss/lib/react/panel';
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';	
import MandatoryProvisions from './PMAY/mandatory';
import PlanningParameters from './PMAY/planning'
import Incentives from './PMAY/incentives'
import Button from 'muicss/lib/react/button';


export default class SpatialPlanner extends React.Component {
    constructor(data) {
        super(data);
        this.data = data;
    }

	render() {
		return (
            <div className="spatial">
            <div className="topbar">
                <Button onClick={this.props.previousPage} variant="raised">Previous</Button>
                <span className="large_title">Optimising Large</span>
            </div>
			<Panel>
			  <Tabs initialSelectedIndex={0} justified={true}> 
                <Tab value="Mandatory Provisions" label="Mandatory Provisions">
                    <MandatoryProvisions data={this.data}/>              
                 </Tab>
                <Tab value="Planning Parameters" label="Planning Parameters">
                    <PlanningParameters data={this.data}/>
                </Tab>
                 <Tab value="Incentives" label="Incentives">
                    <Incentives data={this.data} />              
                 </Tab>

            </Tabs>
			</Panel>  
            </div>
		)
	}
}