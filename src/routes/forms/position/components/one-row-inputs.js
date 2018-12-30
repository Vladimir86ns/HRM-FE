/**
 * Material Text Field
 */
import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { NotificationManager } from 'react-notifications';
import IntlMessages from '../../../../util/IntlMessages';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import uniq from 'lodash/uniq';

// utility functions
import {
  formErrorMessage
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
    isFormUpdated: false
  };

  componentWillMount() {
    this.props.resetShowPositionButton();
    let accountId = localStorage.getItem('account_id');
    if (accountId) {
      this.props.getAccountCompanies(accountId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.companies !== nextProps.companies) {
      var newState = {...this.state};
      newState.company_name = nextProps.companies[0].name;
      newState.companies = nextProps.companies;
      this.setState(newState);
    }
  }

  /**
   * Update state for given field on text change event.
   * 
   * @param {string} fieldName field name which value need to be updated
   * @param {mix} event value for given field name
   */
  handleChangeByKeyAndName = (fieldName, event) => {
    var newState = {...this.state}
    newState[fieldName] = event.target.value;
    newState.isFormUpdated = true;
    this.setState(newState)    
  }

  checkState = () => {
    this.isValidForm();
  }

  isValidForm = () => {
    let {name, department_name, company_name} = this.state;
    
    let duplicatedNames = this.checkSameNames(name);
    
    if (duplicatedNames.length > 0) {
      let message = (
        <div>
          <p>
            <IntlMessages id='form.position.addNew.duplicatedNames.firstText'/>
            {this.putNamesInQuotationMarks(duplicatedNames).toString().split(',').join(', ')}
            <IntlMessages id='form.position.addNew.duplicatedNames.for'/>
            <IntlMessages id='form.position.addNew.duplicatedNames.department'/>
          </p>
        </div>
      );
      NotificationManager.error(message);
      return;
    }

    let duplicatedDepartments = this.checkSameDepartmentNames(department_name);
    if (duplicatedDepartments) {
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
      return;
    }

    if (name.trim() && department_name && company_name) {
      let createdPosition = this.props.beforeCreatePositions;
      createdPosition[this.props.rowKey] = {
        name, department_name, company_name
      };
      this.props.storePositionsBeforeCreating(createdPosition);
    } else {

    }
  }

  checkSameNames = (names) => {
    let arr = names.split(",");
    let newArr = arr.map(name =>  name.trim());

    return uniq(filter(newArr, (val, i, iteratee) => includes(iteratee, val, i + 1)));
  }

  checkSameDepartmentNames = (departmentNames) => {
    let duplicated = '';

    this.props.beforeCreatePositions.filter(position => {
      if(departmentNames === position.department_name) {
          duplicated = departmentNames;
      }
    });

    return duplicated;
  }

  putNamesInQuotationMarks = (duplicatedNames) => {
    return duplicatedNames.map(name => `"${name}"`);
  }

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
              onBlur={() => this.checkState()}/>
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
              onBlur={() => this.checkState()}
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
