/**
 * Material Text Field
 */
import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import { FormGroup } from 'reactstrap';

import FormArrayErrorMessage from '../../../components/form/FormArrayErrorMessage';

// utils functions
import {
  prepareStateForCreateCompanySettingsRequest
} from '../../../util/prepareStateForRequest';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// actions
import {
	//
} from '../../../actions/types';

// redux action
import {
  createCompanySettins,
  getAccount
} from '../../../actions/index';

class TextFields extends React.Component {

  state = {
    accountInfo: {
      name: '',
      email: ''
    },
    companyInfo: {
      name: '',
      email: '',
      website: '',
      mobile_phone: '',
      telephone_number: '',
      fax_number: ''
    },
    locationInfo: {
      country: 'Serbia',
      region: '',
      city: '',
      zip_code: '',
      first_address_line: '',
      second_address_line: ''
    },
    departmentInfo: {
      name: '',
      description: ''
    },
    form_companies : [1],
    form_departments : [1]
  };

  componentWillMount() {
    let accountId = localStorage.getItem('account_id')
    if (accountId) {
      this.props.getAccount(accountId)
    }
  }

  /**
   * Update state for given field on text change event.
   * 
   * @param {string} key field key name which value need to be updated
   * @param {string} name field name which value need to be updated
   * @param {mix} event value for given field name
   */
  handleChangeByKeyAndName = (key, name, event) => {
    var someProperty = {...this.state}
    someProperty[key][name] = event.target.value;
    this.setState({someProperty})    
  }

	/**
	 * Prepare state for creating company settings, and save company settings.
	 */
	saveCompanySettings() {
		this.props.createCompanySettins(
      prepareStateForCreateCompanySettingsRequest(this.state),
      this.props.history
    );
  }

  /**
   * Check account info, if has account info, and state is empty, display account info.
   */
  checkAccountInfo = (account) => {
    if (this.state.accountInfo.name.length > 0) {
      return;
    } else if (Object.keys(account).length > 0) {
      const { email, name } = account;
      var someProperty = {...this.state}
      someProperty.accountInfo.email = email;
      someProperty.accountInfo.name = name;
      this.setState({someProperty})   
    }
  }

  render() {
    const { errorMessage, account } = this.props;
    this.checkAccountInfo(account);

    return (
      <div className="textfields-wrapper">
        <div>
          <form noValidate autoComplete="off">
          <RctCollapsibleCard heading="Account Info">
              <div className="row">
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      disabled
                      id="name"
                      error={false}
                      fullWidth 
                      label="Name of account" 
                      value={this.state.accountInfo.name}
                      onChange={(e) => this.handleChangeByKeyAndName('accountInfo', 'name', e)}
                      helperText=""/>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      disabled
                      id="email"
                      error={false}
                      fullWidth 
                      label="Email" 
                      value={this.state.accountInfo.email}
                      onChange={(e) => this.handleChangeByKeyAndName('accountInfo', 'email', e)}
                      helperText=""/>
                  </div>
                </div>
              </div>
          </RctCollapsibleCard>
          {
            this.state.form_companies.map((value, key) => {
              return (
                <div key={key}>
                  <RctCollapsibleCard heading="Company Info">
              <div className="row">
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      id="name"
                      error={errorMessage['company_info.' + key + '.company.name'] ? true : false}
                      fullWidth
                      label="Name"
                      helperText={
                        <FormArrayErrorMessage
                          hasError={errorMessage['company_info.' + key + '.company.name']}
                          required={true}/> 
                        }
                      value={this.state.companyInfo.name}
                      onChange={(e) => this.handleChangeByKeyAndName('companyInfo', 'name', e)} />  
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      id="email"
                      error={errorMessage['company_info.' + key + '.company.email'] ? true : false}
                      fullWidth
                      label="Email"
                      value={this.state.companyInfo.email}
                      helperText={
                        <FormArrayErrorMessage
                          hasError={errorMessage['company_info.' + key + '.company.email']}
                          required={true}/> 
                        }
                      onChange={(e) => this.handleChangeByKeyAndName('companyInfo', 'email', e)} />
                           
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField 
                      id="website"
                      error={false}
                      fullWidth
                      label="Website"
                      value={this.state.companyInfo.website}
                      helperText=""
                      onChange={(e) => this.handleChangeByKeyAndName('companyInfo', 'website', e)} />  
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      id="mobile_phone"
                      error={false}
                      fullWidth 
                      label="Mobile Phone" 
                      value={this.state.companyInfo.mobile_phone} 
                      helperText=""
                      onChange={(e) => this.handleChangeByKeyAndName('companyInfo', 'mobile_phone', e)} />  
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField 
                      id="telephone_number"
                      error={false}
                      fullWidth 
                      label="Telephone Number" 
                      value={this.state.companyInfo.telephone_number} 
                      helperText=""
                      onChange={(e) => this.handleChangeByKeyAndName('companyInfo', 'telephone_number', e)} />  
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField 
                      id="fax_number"
                      error={false}
                      fullWidth
                      label="Fax Number"
                      value={this.state.companyInfo.fax_number}
                      helperText=""
                      onChange={(e) => this.handleChangeByKeyAndName('companyInfo', 'fax_number', e)} />  
                  </div>
                </div>
              </div>
              <h4 style={{marginBottom: 40, marginTop: 15}}>Location</h4>
              <div className="row">
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      disabled
                      id="country"
                      error={false}
                      fullWidth 
                      label="Country" 
                      value={this.state.locationInfo.country} 
                      helperText=""/>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      id="region"
                      error={false}
                      fullWidth 
                      label="Region" 
                      value={this.state.locationInfo.region} 
                      helperText=""
                      onChange={(e) => this.handleChangeByKeyAndName('locationInfo', 'region', e)} /> 
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      id="city"
                      error={errorMessage['company_info.' + key + '.location.city'] ? true : false}
                      fullWidth 
                      label="City" 
                      value={this.state.locationInfo.city} 
                      helperText={
                        <FormArrayErrorMessage
                          hasError={errorMessage['company_info.' + key + '.location.city']}
                          required={true}/> 
                        }
                      onChange={(e) => this.handleChangeByKeyAndName('locationInfo', 'city', e)} /> 
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      id="zip_code"
                      error={errorMessage['company_info.' + key + '.location.zip_code'] ? true : false}
                      fullWidth 
                      label="Zip Code" 
                      value={this.state.locationInfo.zip_code} 
                      helperText={
                        <FormArrayErrorMessage
                          hasError={errorMessage['company_info.' + key + '.location.zip_code']}
                          required={true}/> 
                        }
                      onChange={(e) => this.handleChangeByKeyAndName('locationInfo', 'zip_code', e)} /> 
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      id="first_address_line"
                      error={errorMessage['company_info.' + key + '.location.first_address_line'] ? true : false}
                      fullWidth 
                      label="First Address Line" 
                      value={this.state.locationInfo.first_address_line} 
                      helperText={
                        <FormArrayErrorMessage
                          hasError={errorMessage['company_info.' + key + '.location.first_address_line']}
                          required={true}/> 
                        }
                      onChange={(e) => this.handleChangeByKeyAndName('locationInfo', 'first_address_line', e)} /> 
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      id="second_address_line"
                      error={false}
                      fullWidth 
                      label="Second Address Line" 
                      value={this.state.locationInfo.second_address_line} 
                      helperText=""
                      onChange={(e) => this.handleChangeByKeyAndName('locationInfo', 'second_address_line', e)} /> 
                  </div>
                </div>
              </div>
            </RctCollapsibleCard>
                </div>
              )
            })
          }
          {
            this.state.form_companies.map((value, key) => {
              return (
                <div key={key}>
                  <RctCollapsibleCard heading="Department Info">
                    <div className="row">
                      <div className="col-sm-6 col-md-3 col-xl-4">
                        <div className="form-group">
                          <TextField
                            id="department_name"
                            error={errorMessage['company_info.' + key + '.department_info.' + key + '.name'] ? true : false}
                            fullWidth
                            label="Name"
                            value={this.state.departmentInfo.name}
                            helperText={
                              <FormArrayErrorMessage
                                hasError={errorMessage['company_info' + key + 'department_info.' + key + '.name']}/>
                            }
                            onChange={(e) => this.handleChangeByKeyAndName('departmentInfo', 'name', e)} /> 
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-3 col-xl-8">
                        <div className="form-group">
                          <TextField
                            id="department_description"
                            error={errorMessage['company_info' + key + 'department_info.' + key + '.description'] ? true : false}
                            fullWidth
                            multiline
                            label="Description"
                            value={this.state.departmentInfo.description}
                            helperText={
                              <FormArrayErrorMessage
                                hasError={errorMessage['company_info' + key + 'department_info.' + key + '.description']}/>
                            }
                            onChange={(e) => this.handleChangeByKeyAndName('departmentInfo', 'description', e)} /> 
                        </div>
                      </div>
                    </div>
                  </RctCollapsibleCard>
                </div>
              )
            })
          }
            <FormGroup className="mb-5">
              <Button
                className="btn-info text-white btn-block w-40"
                style={{marginBottom: 20}}
                variant="raised"
                size="medium"
                onClick={() => this.saveCompanySettings()}>Save Company Info
              </Button>
            </FormGroup>
          </form>
        </div>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ accountReducer, companySettingsReducer }) => {
	const { loading, account } = accountReducer;
  const { errorMessage } = companySettingsReducer;
  
	return { loading, account, errorMessage };
};

export default connect(mapStateToProps, {
  createCompanySettins,
  getAccount
})(TextFields);
