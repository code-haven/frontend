import React from 'react';
import {PMAYSchema} from './treebuilder'
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';	
import $ from 'jquery'
import Panel from 'muicss/lib/react/panel';


class TreeNode extends React.Component {
    constructor(data) {
        super();
        this.data = data.data;
        console.log("Rendering Treenode, data = " + JSON.stringify(data));
    }

    render() {
        console.log("Render Called!!!");
        const is_leaf_node = typeof(this.data) == "string";
        if (is_leaf_node) {
            return (
                <p>
                    {this.data}
                </p>
            )
        }
    
      var tree;
      tree = $.map(this.data, (value, key) =>  {
            return (
                <Tab value={key} label={key}>
                    <TreeNode  data={value}/>
                </Tab>
            )
        });
        console.log('Tree =' + tree);
        return (
            <Tabs onChange={this.onChange} initialSelectedIndex={0}>
              {tree}
            </Tabs>
        )
    }
}


export default class RecursiveTreeBuilder extends React.Component {
    constructor() {
        super();
        this.data = {
    "Mandatory Privisions": {
        "Minimum Area Required": "NA",
        "Land Distribution FOR EWS/LIG": "Minimum 35% of constructed houses for EWS. Additionally, for Affordable Housing in Partnership, single project has atleast 250 houses.",
        "Infrastructure - Internal & External": "As per building Bylelaws",
        "AHP": {
            "SPC":"To be decided by the states",
            "Allotment Process": "As authorized by the state.",
            "Completion Period": "As prescribed in buidling byelaws or Township policy"
        }
    },

    "Incentives": {
        "Developer": {
            "Spatial": "NA",
            "Monetary": "NA",
            "Regulatory": "NA"
        },
        "Buyer": {
            "Center": "PMAY Subsidy",
            "State": "Nil"
        }
    }
        };
        console.log('Root node = ' + this.data);
    }

    render() {
       return (
        <Panel>
            <TreeNode data={this.data}/>
        </Panel>
       )
   }
}



