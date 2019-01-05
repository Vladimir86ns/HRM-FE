/**
 * User Management Page
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import {
	Pagination,
	PaginationItem,
	PaginationLink,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Badge
} from 'reactstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { NotificationManager } from 'react-notifications';
import Avatar from '@material-ui/core/Avatar';

// redux action
import {
	getCompanyPositions,
	getCompanyPositionsByPage
} from '../../../actions/index';

// api
import api from 'Api';
import apiLaravel from '../../../Axios-laravel';

// delete confirmation dialog
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';

// add new user form
import AddNewUserForm from '../../../../src/routes/users/user-management/AddNewUserForm'; 

// update user form
import UpdateUserForm from '../../../../src/routes/users/user-management/UpdateUserForm';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// rct section loader
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';

class TextFields extends Component {

	state = {
		positions: null,
		meta: null,
		previousPage: 0,
		nextPage: 0,

		
		all: false,
		users: null, // initial user data
		selectedUser: null, // selected user to perform operations
		loading: false, // loading activity
		addNewUserModal: false, // add new user form modal
		addNewUserDetail: {
			id: '',
			name: '',
			avatar: '',
			type: '',
			emailAddress: '',
			status: 'Active',
			lastSeen: '',
			accountType: '',
			badgeClass: 'badge-success',
			dateCreated: 'Just Now',
			checked: false
		},
		openViewUserDialog: false, // view user dialog box
		editUser: null,
		allSelected: false,
		selectedUsers: 0
	}

	componentDidMount() {
		let companyId = localStorage.getItem('company_id');
		this.props.getCompanyPositions(companyId);
	}

	/**
	 * On Delete
	 */
	onDelete() {
		this.refs.deleteConfirmationDialog.open();
		this.setState({ selectedUser: data });
	}

	/**
	 * Delete User Permanently
	 */
	deleteUserPermanently() {
		const { selectedUser } = this.state;
		let users = this.state.users;
		let indexOfDeleteUser = users.indexOf(selectedUser);
		users.splice(indexOfDeleteUser, 1);
		this.refs.deleteConfirmationDialog.close();
		this.setState({ loading: true });
		let self = this;
		setTimeout(() => {
			self.setState({ loading: false, users, selectedUser: null });
			NotificationManager.success('User Deleted!');
		}, 2000);
	}

	/**
	 * On Change Add New User Details
	 */
	onChangeAddNewUserDetails(key, value) {
		this.setState({
			addNewUserDetail: {
				...this.state.addNewUserDetail,
				[key]: value
			}
		});
	}

	/**
	 * Add New User
	 */
	addNewUser() {
		const { name, emailAddress } = this.state.addNewUserDetail;
		if (name !== '' && emailAddress !== '') {
			let users = this.state.users;
			let newUser = {
				...this.state.addNewUserDetail,
				id: new Date().getTime()
			}
			users.push(newUser);
			this.setState({ addNewUserModal: false, loading: true });
			let self = this;
			setTimeout(() => {
				self.setState({ loading: false, users });
				NotificationManager.success('User Created!');
			}, 2000);
		}
	}

	/**
	 * View User Detail Hanlder
	 */
	viewUserDetail(data) {
		this.setState({ openViewUserDialog: true, selectedUser: data });
	}

	/**
	 * On Edit User
	 */
	onEditUser(user) {
		this.setState({ addNewUserModal: true, editUser: user });
	}

	/**
	 * On Add & Update User Modal Close
	 */
	onAddUpdateUserModalClose() {
		this.setState({ addNewUserModal: false, editUser: null })
	}

	/**
	 * On Update User Details
	 */
	onUpdateUserDetails(key, value) {
		this.setState({
			editUser: {
				...this.state.editUser,
				[key]: value
			}
		});
	}

	/**
	 * Update User
	 */
	updateUser() {
		const { editUser } = this.state;
		let indexOfUpdateUser = '';
		let users = this.state.users;
		for (let i = 0; i < users.length; i++) {
			const user = users[i];
			if (user.id === editUser.id) {
				indexOfUpdateUser = i
			}
		}
		users[indexOfUpdateUser] = editUser;
		this.setState({ loading: true, editUser: null, addNewUserModal: false });
		let self = this;
		setTimeout(() => {
			self.setState({ users, loading: false });
			NotificationManager.success('User Updated!');
		}, 2000);
	}

	//Select All user
	onSelectAllUser(e) {
		const { selectedUsers, users } = this.state;
		let selectAll = selectedUsers < users.length;
		if (selectAll) {
			let selectAllUsers = users.map(user => {
				user.checked = true
				return user
			});
			this.setState({ users: selectAllUsers, selectedUsers: selectAllUsers.length })
		} else {
			let unselectedUsers = users.map(user => {
				user.checked = false
				return user;
			});
			this.setState({ selectedUsers: 0, users: unselectedUsers });
		}
	}

	onSelectPage = (pageNumber) => {
			let companyId = localStorage.getItem('company_id');
			this.props.getCompanyPositionsByPage(companyId, pageNumber);
	}

	render() {
		const { users, positions, loading, selectedUser, editUser, allSelected, selectedUsers } = this.state;
		let paginationPrevious;
		let rowNumber = 1;
		let paginationNext;
		let pagination = [];

		// TODO make global function to check is object empty with lodash empty
		if (Object.keys(this.props.paginationMeta).length > 0) {
			let { total_pages, current_page, links, count} = this.props.paginationMeta;
			rowNumber = current_page * count - count + 1;
			for (let i = 1; i <= total_pages; i++) { 
				pagination.push(
					<PaginationItem key={i} active={i === current_page}>
						<PaginationLink onClick={() => this.onSelectPage(i)} >{i}</PaginationLink>
					</PaginationItem>
				);
			}

			if (links.previous) {
				paginationPrevious = (
					<PaginationItem>
						<PaginationLink previous onClick={() => this.onSelectPage(this.state.previousPage)} />
					</PaginationItem>
				);
			}

			if (links.next) {
				paginationNext = (
					<PaginationItem>
						<PaginationLink next onClick={() => this.onSelectPage(this.state.nextPage)}/>
					</PaginationItem>
				);
			}
		}

		return (
			<div className="user-management">
				<Helmet>
					<title>Reactify | Users Management</title>
					<meta name="description" content="Reactify Widgets" />
				</Helmet>
				<RctCollapsibleCard fullBlock>
					<div className="table-responsive">
						<div className="d-flex justify-content-between py-20 px-10 border-bottom">
							<div>
								<a 
									href="javascript:void(0)" 
									onClick={() => this.props.history.push('/app/forms/position')} 
									color="primary" 
									className="caret btn-sm mr-10"><IntlMessages id='table.position.row.addNewPosition'/>
									<i className="zmdi zmdi-plus"></i>
								</a>
							</div>
						</div>
						<table className="table table-middle table-hover mb-0">
							<thead>
								<tr>
									<th>#</th>
									<th><IntlMessages id='table.position.row.name'/></th>
									<th><IntlMessages id='table.position.row.departmentName'/></th>
									<th><IntlMessages id='table.position.row.action'/></th>
								</tr>
							</thead>
							<tbody>
								{this.props.positions && this.props.positions.map((position, key) => (
									<tr key={key}>
										<td>{rowNumber++}</td>
										<td>{position.name}</td>
										<td>{position.department_name}</td>
										<td className="list-action">
											<a href="javascript:void(0)" onClick={() => this.onEditUser(position)}><i className="ti-pencil"></i></a>
											<a href="javascript:void(0)" onClick={() => this.onDelete(position)}><i className="ti-close"></i></a>
										</td>
									</tr>
								))}
							</tbody>
							<tfoot className="border-top">
								<tr>
									<td colSpan="100%">
										<Pagination className="mb-0 py-10 px-10">
											{paginationPrevious}
											{pagination}
											{paginationNext}
										</Pagination>
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
					{loading &&
						<RctSectionLoader />
					}
				</RctCollapsibleCard>
				<DeleteConfirmationDialog
					ref="deleteConfirmationDialog"
					title="Are You Sure Want To Delete?"
					message="This will delete user permanently."
					onConfirm={() => this.deleteUserPermanently()}
				/>
				<Modal isOpen={this.state.addNewUserModal} toggle={() => this.onAddUpdateUserModalClose()}>
					<ModalHeader toggle={() => this.onAddUpdateUserModalClose()}>
						{editUser === null ?
							'Add New User' : 'Update User'
						}
					</ModalHeader>
					<ModalBody>
						{editUser === null ?
							<AddNewUserForm
								addNewUserDetails={this.state.addNewUserDetail}
								onChangeAddNewUserDetails={this.onChangeAddNewUserDetails.bind(this)}
							/>
							: <UpdateUserForm user={editUser} onUpdateUserDetail={this.onUpdateUserDetails.bind(this)} />
						}
					</ModalBody>
					<ModalFooter>
						{editUser === null ?
							<Button variant="raised" className="text-white btn-success" onClick={() => this.addNewUser()}>Add</Button>
							: <Button variant="raised" color="primary" className="text-white" onClick={() => this.updateUser()}>Update</Button>
						}
						{' '}
						<Button variant="raised" className="text-white btn-danger" onClick={() => this.onAddUpdateUserModalClose()}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

// map state to props
const mapStateToProps = (state) => {
	const { positions, paginationMeta } = state.positionReducer

	return { positions, paginationMeta };
};

export default connect(mapStateToProps, {
	getCompanyPositions,
	getCompanyPositionsByPage
})(TextFields);
