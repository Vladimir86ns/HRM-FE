/**
 * Material Text Field
 */
import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { NotificationManager } from 'react-notifications';
import IntlMessages from '../../../../util/IntlMessages';

// utility functions
import {
  formErrorMessage,
  splitStringWithCommaAndGetArray,
  getSameValuesFromArray,
  modifyEachElementWithQuotationMarks,
  checkInArrayOfObjectsPropertyWithValueExist
} from '../../../../util/index';

// redux constants
import {
  //
} from '../../../../constants/constants';

// redux action
import {
  getAccountCompanies,
  resetShowPositionButton,
  storePositionsBeforeCreating
} from '../../../../actions/index';

class TextFields extends React.Component {

  state = {
    name: '',
    department_name: '',
    company_name: '',
    companies: [],
    isMessageShown: false,
    isFormUpdated: false
  };

  componentWillMount() {
    this.props.resetShowPositionButton();
    let accountId = localStorage.getItem('account_id');
    if (accountId) {
      this.props.getAccountCompanies(accountId);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.companies !== nextProps.companies) {
      var newState = {...this.state};
      newState.company_name = nextProps.companies[0].name;
      newState.companies = nextProps.companies;
      this.setState(newState);
    }
  };

  /**
   * Update state for given field on text change event.
   * Update store position before creating with new changes.
   * 
   * @param {string} fieldName field name which value need to be updated
   * @param {mix} event value for given field name
   */
  handleChangeByKeyAndName = (fieldName, event) => {
    var newState = {...this.state}
    newState[fieldName] = event.target.value;
    newState.isFormUpdated = true;
    newState.isMessageShown = false;
    this.setState(newState);

    let createdPosition = this.props.beforeCreatePositions;
    if(createdPosition[this.props.rowKey]) {
      createdPosition[this.props.rowKey][fieldName] = event.target.value;;
      this.props.storePositionsBeforeCreating(createdPosition);
    }
  };

  /**
   * Validate duplication names of position, and duplication departments.
   * 
   */
  validateAndSaveTemporaryInStore = () => {
    let {name, department_name, company_name} = this.state;
    
    let duplicatedDepartments = this.checkSameDepartmentNames(department_name);
    if (duplicatedDepartments && !this.state.isMessageShown) {
      this.getDuplicatedDepartmentsMessage(duplicatedDepartments);
      this.setState({isMessageShown: true});
      return;
    }

    let duplicatedNames = this.checkSameNames(name);
    if (duplicatedNames.length > 0 && !this.state.isMessageShown) {
      this.getDuplicatedPositionNamesMessage(duplicatedNames);
      this.setState({isMessageShown: true});
      return;
    }

    // if message is shown, stop here.
    if (this.state.isMessageShown) {
      return;
    }

    if (name.trim() && department_name && company_name) {
      let createdPosition = this.props.beforeCreatePositions;
      createdPosition[this.props.rowKey] = {
        name, department_name, company_name
      };
      this.props.storePositionsBeforeCreating(createdPosition);
    }
  };

  /**
   * Return names which are duplicated.
   * 
   * @param {string} names string with names, separated with comma.
   */
  checkSameNames = (names) => {
    let allNames = splitStringWithCommaAndGetArray(names);
    let sameNames = getSameValuesFromArray(allNames);
    return modifyEachElementWithQuotationMarks(sameNames);
  };

  /**
   * Check duplication department name.
   * 
   * @param {string} departmentNames selected department name.
   */
  checkSameDepartmentNames = (departmentNames) => {
    let { beforeCreatePositions, rowKey } = this.props;
    return checkInArrayOfObjectsPropertyWithValueExist(beforeCreatePositions, 'department_name', departmentNames, rowKey);
  };

  /**
   * Return validation message on duplication position names.
   * 
   * @param {array} duplicatedNames array with duplicated names.
   */
  getDuplicatedPositionNamesMessage = (duplicatedNames) => {
    let message = (
      <div>
        <p>
          <IntlMessages id='form.position.addNew.duplicatedNames.firstText'/>
          {duplicatedNames.toString().split(',').join(', ')}
          <IntlMessages id='form.position.addNew.duplicatedNames.for'/>
          <IntlMessages id='form.position.addNew.duplicatedNames.department'/>
        </p>
      </div>
    );
    NotificationManager.error(message);
  };

  /**
   * Return validation message on duplication department name.
   * 
   * @param {array} duplicatedDepartments array with duplicated names.
   */
  getDuplicatedDepartmentsMessage = (duplicatedDepartments) => {
    let message = (
      <div>
      <p>
        <IntlMessages id='form.position.addNew.duplicatedDepartment.firstText'/>
        {`"${duplicatedDepartments}"`}
        <IntlMessages id='form.position.addNew.duplicatedDepartment.secondText'/>
      </p>
    </div>
    );
    NotificationManager.error(message);
  };



  render() {
    const errorMessage = {};

    return (
      <div className="row">
        <div className="col-sm-6 col-md-3 col-xl-4">
          <div className="form-group">
            <TextField
              id="name"
              error={errorMessage['name'] ? true : false}
              fullWidth 
              label={<IntlMessages id='form.position.addNew.name'/>} 
              value={this.state.name}
              helperText={formErrorMessage(errorMessage['name'], true)}
              onChange={(e) => this.handleChangeByKeyAndName('name', e)}
              onBlur={() => this.validateAndSaveTemporaryInStore()}/>
          </div>
        </div>
        <div className="col-sm-6 col-md-3 col-xl-4">
          <div className="form-group">
            <TextField
              id="company_name"
              disabled={true}
              error={errorMessage['company_name'] ? true : false}
              fullWidth 
              label={<IntlMessages id='form.position.addNew.company'/>} 
              value={this.state.company_name}
              helperText={formErrorMessage(errorMessage['company_name'], true)}
              onChange={(e) => this.handleChangeByKeyAndName('company_name', e)}/>
          </div>
        </div>
        <div className="col-sm-6 col-md-3 col-xl-4">
          <div className="form-group">
            <TextField id="department_name" 
              select
              onBlur={() => this.validateAndSaveTemporaryInStore()}
              label={<IntlMessages id='form.position.addNew.department'/>}
              value={this.state.department_name}
              onChange={(e) => this.handleChangeByKeyAndName('department_name', e)}
              SelectProps={{
                MenuProps: {
                },
              }}
              helperText={formErrorMessage(errorMessage['department_name'], true)}
              fullWidth>
              {this.state.companies.map((company) => (
                company.departments.map((department, key) => (
                  <MenuItem key={key} value={department.name}>
                    {department.name}
                  </MenuItem>
                ))
              ))}
            </TextField>
          </div>
        </div>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = (state) => {
  const { companies, } = state.companyReducer;
  const { beforeCreatePositions, } = state.positionReducer;
	return { companies, beforeCreatePositions };
};

export default connect(mapStateToProps, {
  getAccountCompanies,
  storePositionsBeforeCreating,
  resetShowPositionButton
})(TextFields);
