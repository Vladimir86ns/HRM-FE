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
  //
} from '../../../actions/index';

class TextFields extends React.Component {

  state = {
    name: '',
    department: '',
    company: '',
    isFormUpdated: false
  };

  componentWillMount() {
    //
  }

  componentWillReceiveProps(nextProps) {
    //
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
                    <TextField id="company" 
                      select 
                      label={<IntlMessages id='form.position.addNew.company'/>}
                      value={this.state.company}
                      onChange={(e) => this.handleChangeByKeyAndName('company', e)}
                      SelectProps={{
                        MenuProps: {
                        },
                      }}
                      helperText={formErrorMessage(errorMessage['company'])}
                      fullWidth>
                      {/* {userStatus.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))} */}
                    </TextField>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 col-xl-4">
                  <div className="form-group">
                    <TextField id="department" 
                      select 
                      label={<IntlMessages id='form.position.addNew.department'/>}
                      value={this.state.department}
                      onChange={(e) => this.handleChangeByKeyAndName('department', e)}
                      SelectProps={{
                        MenuProps: {
                        },
                      }}
                      helperText={formErrorMessage(errorMessage['department'])}
                      fullWidth>
                      {/* {userStatus.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))} */}
                    </TextField>
                  </div>
                </div>
              </div>
            </RctCollapsibleCard>
            <FormGroup className="mb-5">
              <Button
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
  //
};

export default connect(null, null)(TextFields);
