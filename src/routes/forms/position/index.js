/**
 * Material Text Field
 */
import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { NotificationManager } from 'react-notifications';
import Button from '@material-ui/core/Button';
import { FormGroup } from 'reactstrap';
import IntlMessages from '../../../util/IntlMessages';

// utility functions
import {
  formErrorMessage
} from '../../../util/index';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// redux constants
import {
  //
} from '../../../constants/constants';

// redux action
import {
  getAccountCompanies
} from '../../../actions/index';

class TextFields extends React.Component {

  state = {
    name: '',
    department_name: '',
    company_name: '',
    companies: [],
    isFormUpdated: false
  };

  componentWillMount() {
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

  /**
   * First check is form updated.
	 * Create position for company.
	 */
	createPosition() {
    //
  }

  render() {
    const errorMessage = {};

    return (
      <div className="textfields-wrapper">
        <div>
          <form noValidate autoComplete="off">
            <RctCollapsibleCard heading={<IntlMessages id='form.position.addNew.heading'/>}>
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
                      onChange={(e) => this.handleChangeByKeyAndName('name', e)}/>
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
              <Button
                className="btn-info text-white"
                style={{marginBottom: 20}}
                size="small"
                onClick={() => alert('add one more')}>Add one more
              </Button>
            </RctCollapsibleCard>
            <FormGroup className="mb-5">
              <Button
                mini={true}
                className="btn-info text-white btn-block w-40"
                style={{marginBottom: 20}}
                variant="raised"
                size="medium"
                onClick={() => this.createPosition()}><IntlMessages id='form.position.addNew.create'/>
              </Button>
            </FormGroup>
          </form>
        </div>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = (state) => {
  const { companies } = state.companyReducer;
	return { companies };
};

export default connect(mapStateToProps, {
  getAccountCompanies
})(TextFields);
