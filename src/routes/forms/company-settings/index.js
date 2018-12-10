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
    name: '',
    email: '',
    website: '',
    mobile_phone: '',
    telephone_number: '',
    fax_number: '',
    account_id: '',

    country_id: 191,
    region: '',
    city: '',
    zip_code: '',
    first_address_line: '',
    second_address_line: '',


  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

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
                      value="Agencija dunav"
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
                      value="account@account.com"
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
                      value={this.state.name}
                      helperText=""
                      onChange={this.handleChange('name')} />
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      id="email"
                      error={false}
                      fullWidth
                      label="Email"
                      value={this.state.email}
                      helperText=""
                      onChange={this.handleChange('email')} />                  
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField 
                      id="website"
                      error={false}
                      fullWidth
                      label="Website"
                      value={this.state.website}
                      helperText=""
                      onChange={this.handleChange('website')} />
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
                      value={this.state.mobile_phone} 
                      helperText=""
                      onChange={this.handleChange('mobile_phone')} />
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField 
                      id="telephone_number"
                      error={false}
                      fullWidth 
                      label="Telephone Number" 
                      value={this.state.telephone_number} 
                      helperText=""
                      onChange={this.handleChange('telephone_number')} />
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField 
                      id="fax_number"
                      error={false}
                      fullWidth
                      label="Fax Number"
                      value={this.state.fax_number}
                      helperText=""
                      onChange={this.handleChange('fax_number')} />
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
                      value={this.state.region} 
                      helperText=""
                      onChange={this.handleChange('region')} />
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      id="city"
                      error={false}
                      fullWidth 
                      label="City" 
                      value={this.state.city} 
                      helperText=""
                      onChange={this.handleChange('city')} />
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      id="zip_code"
                      error={false}
                      fullWidth 
                      label="Zip Code" 
                      value={this.state.zip_code} 
                      helperText=""
                      onChange={this.handleChange('zip_code')} />
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      id="first_address_line"
                      error={false}
                      fullWidth 
                      label="First Address Line" 
                      value={this.state.first_address_line} 
                      helperText=""
                      onChange={this.handleChange('first_address_line')} />
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField
                      id="second_address_line"
                      error={false}
                      fullWidth 
                      label="Second Address Line" 
                      value={this.state.second_address_line} 
                      helperText=""
                      onChange={this.handleChange('second_address_line')} />
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
                      value={this.state.department_name}
                      helperText=""
                      onChange={this.handleChange('department_name')} />
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
                      value={this.state.department_description}
                      helperText=""
                      onChange={this.handleChange('department_description')} />
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
