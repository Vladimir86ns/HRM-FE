/**
 * Material Text Field
 */
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import Components from './components/componets-field';
import Layouts from './components/layouts';
import InputAdornments from './components/input-adornment';
import FormattedInputs from './components/formated-input';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

export default class TextFields extends React.Component {

  state = {
    accountInfo: {
      name: 'Agencija dunav',
      email: 'account@account.com'
    },
    companyInfo: {
      name: '',
      email: '',
      website: '',
      mobile_phone: '',
      telephone_number: '',
      fax_number: '',
      account_id: ''
    },
    locationInfo: {
      country_id: 191,
      region: '',
      city: '',
      zip_code: '',
      first_address_line: '',
      second_address_line: ''
    },
    departmentInfo: {
      name: '',
      description: ''
    }
  };

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

  render() {
    return (
      <div className="textfields-wrapper">
        <div>
          <form noValidate autoComplete="off">
          <RctCollapsibleCard heading="Account Info">
              <div className="row">
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      id="account_id"
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
            <RctCollapsibleCard heading="Company Info">
              <div className="row">
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      id="name"
                      error={false}
                      fullWidth
                      label="Name"
                      value={this.state.companyInfo.name}
                      helperText=""
                      onChange={(e) => this.handleChangeByKeyAndName('companyInfo', 'name', e)} />
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      id="email"
                      error={false}
                      fullWidth
                      label="Email"
                      value={this.state.companyInfo.email}
                      helperText=""
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
                      label="country" 
                      value="Serbia" 
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
                      error={false}
                      fullWidth 
                      label="City" 
                      value={this.state.locationInfo.city} 
                      helperText=""
                      onChange={(e) => this.handleChangeByKeyAndName('locationInfo', 'city', e)} /> 
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      id="zip_code"
                      error={false}
                      fullWidth 
                      label="Zip Code" 
                      value={this.state.locationInfo.zip_code} 
                      helperText=""
                      onChange={(e) => this.handleChangeByKeyAndName('locationInfo', 'zip_code', e)} /> 
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      id="first_address_line"
                      error={false}
                      fullWidth 
                      label="First Address Line" 
                      value={this.state.locationInfo.first_address_line} 
                      helperText=""
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
            <RctCollapsibleCard heading="Department Info">
              <div className="row">
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      id="department_name"
                      error={false}
                      fullWidth
                      label="Name"
                      value={this.state.departmentInfo.name}
                      helperText=""
                      onChange={(e) => this.handleChangeByKeyAndName('departmentInfo', 'name', e)} /> 
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-8">
                  <div className="form-group">
                    <TextField
                      id="department_description"
                      error={false}
                      fullWidth
                      multiline
                      label="Description"
                      value={this.state.departmentInfo.description}
                      helperText=""
                      onChange={(e) => this.handleChangeByKeyAndName('departmentInfo', 'description', e)} /> 
                  </div>
                </div>
              </div>
            </RctCollapsibleCard>
          </form>
        </div>
      </div>
    );
  }
}
