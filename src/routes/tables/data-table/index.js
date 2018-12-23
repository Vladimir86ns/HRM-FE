/**
 * Data Table
 */
import React from 'react';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// redux action
import {
	getCompanyAllCompanyEmployees
} from '../../../actions/index';

class DataTable extends React.Component {

	componentWillMount() {
    let companyId = localStorage.getItem('company_id');

    if (companyId) {
      this.props.getCompanyAllCompanyEmployees(companyId);
    }
	};

	render() {
    let employeesArray = this.props.allEmployees.map(employee => {
			return [
				employee.first_name,
				employee.middle_name,
				employee.last_name,
				employee.email,
				employee.company_employee_id,
				employee.mobile_number,
				employee.date_hired,
				employee.city,
				employee.first_address_line
			]
		});

		const columns = [
			{
				name: "First Name",
				options: {
				  filter: true,
				}
			},
			'Middle Name',
			'Last Name',
			'Email',
			'Employee Company ID',
			'Mobile Number',
			'Date Hired',
			'City',
			'First Address Line',
			// {
			// 	name: "Active",
			// 	options: {
			// 	  filter: false,
			// 	  customBodyRender: (value, tableMeta, updateValue) => {
			// 		return (
			// 			<Badge color="success">Done</Badge>
			// 		);
			// 	}}
			//   }
    ];

		const options = {
			filterType: 'dropdown',
			responsive: 'scroll',
			textLabels: {
				body: {
				  noMatch: "Sorry, no matching records found",
				  toolTip: "Sort",
				}
			},
			downloadCsv: false,
			print: false,
			download: false
    };

		return (
			<div className="data-table-wrapper">
				<RctCollapsibleCard fullBlock>
					<MUIDataTable
						title={"Employees List"}
						data={employeesArray}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>
			</div>
		);
	}
}

// map state to props
const mapStateToProps = (state) => {
  const { allEmployees } = state.companyReducer;
	return { allEmployees };
};

export default connect(mapStateToProps, {
  getCompanyAllCompanyEmployees
})(DataTable);

