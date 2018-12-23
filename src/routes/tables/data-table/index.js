/**
 * Data Table
 */
import React from 'react';
import MUIDataTable from "mui-datatables";
import axios from '../../../Axios-laravel';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

class DataTable extends React.Component {

	state = {
		employees: []
	};
	componentWillMount() {	
    axios.get(`/company/1/employees`)
      .then(success => success)
      .catch(error => error.response)
      .then(success => this.setState({employees: success.data.data}));
	};

	render() {
		let employeesArray = this.state.employees.map(employee => {
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
				<RctCollapsibleCard heading="All Employees" fullBlock>
					<MUIDataTable
						title={"Employee list"}
						data={employeesArray}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>
			</div>
		);
	}
}

export default DataTable;
