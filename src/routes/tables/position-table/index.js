import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import Button from '@material-ui/core/Button';
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';
import UpdatePositionForm from '../../../../src/routes/forms/position/components/updatePositionForm';
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';
import AppConfig from 'Constants/AppConfig';

import {
	Pagination,
	PaginationItem,
	PaginationLink,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from 'reactstrap';

// redux action
import {
	getCompanyPositions,
	getCompanyPositionsByPage
} from '../../../actions/index';

// helper function
import {
	isObjectEmpty
} from '../../../util/index';

class TextFields extends Component {

	state = {
		positions: null,
		meta: null,
		formaChanged: false,
		editPositionOpen: false,
		updatePositionName: '',
		updatePositionId: false,
		selectedPosition: {},
		previousPage: 0,
		nextPage: 0
	}

	componentDidMount() {
		let companyId = localStorage.getItem('company_id');
		this.props.getCompanyPositions(companyId);
	}

	/**
	 * On edit position.
	 *
	 * @param {object} position selected position.
   */
	onEditPosition(position) {
		this.setState({ editPositionOpen: true, selectedPosition: position, updatePositionName: position.name, updatePositionId: position.id });
	};

	/**
	 * Update Position Name And Id In Store.
	 *
	 * @param {string} value position name.
	 * @param {int} positionId position Id.
   */
	updatePositionName(value) {
		this.setState({ updatePositionName: value, formaChanged: true });
	};

	/**
	 * Delete Position.
	 * 
	 * @param {object} position selected position.
	 */
	onDelete(position) {
		this.refs.deleteConfirmationDialog.open();
		this.setState({ selectedPosition: position });
	};

	/**
	 * Delete Position From Server.
	 */
	deletePosition() {
		// TODO delete position from company.
		console.log('update user from name ' , this.state.selectedPosition.name, 'ID ', this.state.selectedPosition.id);
		this.refs.deleteConfirmationDialog.close();
	};

	/**
	 * Update Position.
	 */
	updatePosition() {
		// TODO update position from company.
		console.log('update user from name ' , this.state.updatePositionName, 'ID ', this.state.updatePositionId);
		this.setState({ formaChanged: false });
	};

	/**
	 * Close update form position.
	 */
	onUpdatePositionModalClose() {
		this.setState({ addNewUserModal: false, editUser: null, editPositionOpen: false })
	};

	/**
	 * Get new position for page.
	 */
	onSelectPage = (pageNumber) => {
		let companyId = localStorage.getItem('company_id');
		this.props.getCompanyPositionsByPage(companyId, pageNumber);
	};

	render() {
		const { loading, updatePositionName, selectedPosition, editPositionOpen, formaChanged } = this.state;
		let paginationPrevious;
		let rowNumber = 1;
		let paginationNext;
		let pagination = [];

		if (!isObjectEmpty(this.props.paginationMeta)) {
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
					<title>{AppConfig.brandName} | Positions List</title>
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
											<a href="javascript:void(0)" onClick={() => this.onEditPosition(position)}><i className="ti-pencil"></i></a>
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
					message="This will delete position from company."
					onConfirm={() => this.deletePosition()}
				/>
				<Modal isOpen={this.state.editPositionOpen} toggle={() => this.onUpdatePositionModalClose()}>
					<ModalHeader toggle={() => this.onUpdatePositionModalClose()}>
						Update User
					</ModalHeader>
					<ModalBody>
						{
							editPositionOpen ? 
								<UpdatePositionForm 
									position={selectedPosition} 
									updatedName={updatePositionName} 
									updatePositionName={(value) => this.updatePositionName(value)} 
								/> 
							: null
						}
					</ModalBody>
					<ModalFooter>
						<Button disabled={!formaChanged} variant="raised" color="primary" className="text-white" onClick={() => this.updatePosition()}>Update</Button>
						<Button style={{marginLeft: 20}} variant="raised" className="text-white btn-danger" onClick={() => this.onUpdatePositionModalClose()}>Cancel</Button>
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
