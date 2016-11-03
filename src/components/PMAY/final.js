import React from 'react';
import Tab from 'muicss/lib/react/tab';	
import Panel from 'muicss/lib/react/panel';
import ProgressBar from '../progress'
import Button from 'muicss/lib/react/button';


export default class FinalResult extends React.Component {

	render() {
		return (
            <div className="final">
                <Button onClick={this.props.previousPage} variant="raised">Previous</Button>

                <Panel>
               <ProgressBar step={3} step_name={"Output"} />
               <div className="final">
                <table class="mui-table">
                    <tbody>
                        <tr>
                        <td>Total Saleable Area per the Mix</td>
                        <td><table class="mui-table">
                                <tbody>
                                    <tr>
                                    <td>Commercial Area</td>
                                    <td>{this.props.globalData.spatial_planning.saleable_area.commercial.toFixed(2)} acres</td>
                                    </tr>
                                    <tr>
                                    <td>Residential Area</td>
                                    <td>{this.props.globalData.spatial_planning.saleable_area.residential.toFixed(2)} acres</td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                         </td>
                        </tr>
                        <tr>
                        <td>Ground Coverage </td>
                        <td>{this.props.globalData.spatial_planning.ground_coverage.toFixed(2)} acres</td>
                        </tr>
                        <tr>
                        <td>Height</td>
                        <td>{this.props.globalData.spatial_planning.height}</td>
                        </tr>
                        <tr>
                        <td>FAR</td>
                        <td>{this.props.globalData.spatial_planning.FAR.toFixed(2)}</td>
                        </tr>
                        
                    </tbody>
                    </table>
                    </div>
            </Panel>
            </div>
		)
	}
}