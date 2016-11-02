import React from 'react';
import Tab from 'muicss/lib/react/tab';	


export default class MandatoryProvisions extends React.Component {

	render() {
		return (
            <div className="mandatory">
                <table class="mui-table">
                    <tbody>
                        <tr>
                        <td>Income</td>
                        <td><table class="mui-table">
                                <tbody>
                                    <tr>
                                    <td>EWS</td>
                                    <td>Upto Rs. 3 Lakh pa</td>
                                    </tr>
                                    <tr>
                                    <td>LIG</td>
                                    <td>Between Rs. 3 - 6 Lakh pa</td>
                                    </tr>
                                </tbody>
                            </table>
                         </td>
                        </tr>
                        <tr>
                        <td>Carpet Area</td>
                        <td><table class="mui-table">
                                <tbody>
                                    <tr>
                                    <td>EWS</td>
                                    <td>Upto 30 sqm</td>
                                    </tr>
                                    <tr>
                                    <td>LIG</td>
                                    <td>Upto 60 sqm</td>
                                    </tr>
                                </tbody>
                            </table>
                         </td>
                        </tr>
                        <tr>
                            <td>Land Distribution</td>
                            <td>Minimum 35% of contructed houses for EWS. <br/>Additionally for Affordable Housing in Partnership
                            : Single Project has atleast 250 houses.</td>
                        </tr>
                        <tr>
                            <td>EWS/LIG Component</td>
                            <td>To be decided by the State.</td>
                        </tr>
                        <tr>
                            <td>Allotment Process</td>
                            <td>As Autorized by the State.</td>
                        </tr>
                    </tbody>
                    </table>
            </div>
		)
	}
}