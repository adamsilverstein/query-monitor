import {
	iPanelProps,
	Tabular,
	Time,
	TotalTime,
} from 'qmi';
import {
	DB_Callers as DB_CallersData,
} from 'qmi/data-types';
import * as React from 'react';

import { __ } from '@wordpress/i18n';

interface iDBCallersProps extends iPanelProps {
	data: DB_CallersData;
}

class DBCallers extends React.Component<iDBCallersProps, Record<string, unknown>> {

	render() {
		const { data } = this.props;

		if ( ! data.times || ! data.times.length ) {
			return null;
		}

		return (
			<Tabular id={ this.props.id }>
				<thead>
					<tr>
						<th scope="col">
							{ __( 'Caller', 'query-monitor' ) }
						</th>
						{ Object.keys( data.types ).map( key => (
							<th key={ key } className="qm-num" scope="col">
								{ key }
							</th>
						) ) }
						<th className="qm-num" scope="col">
							{ __( 'Time', 'query-monitor' ) }
						</th>
					</tr>
				</thead>
				<tbody>
					{ data.times.map( caller => (
						<tr key={ caller.caller }>
							<td>
								{ caller.caller }
							</td>
							{ Object.keys( data.types ).map( key => (
								<td key={ key } className="qm-num">
									{ caller.types[key] || '' }
								</td>
							) ) }
							<Time value={ caller.ltime }/>
						</tr>
					) ) }
				</tbody>
				<tfoot>
					<tr>
						<td></td>
						{ Object.keys( data.types ).map( key => (
							<td key={ key } className="qm-num">
								{ data.types[key] }
							</td>
						) ) }
						<TotalTime rows={ data.times }/>
					</tr>
				</tfoot>
			</Tabular>
		);
	}

}

export default DBCallers;
