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

// utility functions
import {
  formErrorMessage,
  prepareStateForUpdateUserInfoRequest
} from '../../../util/index';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// redux constants
import {
  genderType,
  userStatus
} from '../../../constants/constants';
import 
  APP_MESSAGES
 from '../../../constants/AppMessages';

// redux action
import {
  getUser,
  updateUserProfile
} from '../../../actions/index';

// constants
import {
  USER_ID
} from '../../../constants/constants';

class TextFields extends React.Component {

  state = {
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    gender: '',
    user_type: '',
    status: 'active',
    isFormUpdated: false
  };

  componentWillMount() {
    let userId = localStorage.getItem('user_id');
    if (userId) {
      this.props.getUser(userId)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      var someProperty = {...this.state};

      Object.keys(nextProps.user).forEach((key) => {
        someProperty[key] = nextProps.user[key] ? nextProps.user[key]: '';
      })

      this.setState(someProperty);
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
	 * Prepare state for updating profile info, and update in DB.
	 */
	updateProfileInfo() {
    if (!this.state.isFormUpdated) {
      NotificationManager.error(APP_MESSAGES.formNotUpdatedMessage);
      return;
    }
    this.state.isFormUpdated = false;

    this.props.updateUserProfile(
      prepareStateForUpdateUserInfoRequest(this.state),
      USER_ID
    )
  }

  render() {
    const  errorMessage = this.props.errorMessage;

    return (
      <div className="textfields-wrapper">
        <div>
          <form noValidate autoComplete="off">
            <RctCollapsibleCard heading="User Info">
                <div className="row">
                  <div className="col-sm-6 col-md-3 col-xl-4">
                    <div className="form-group">
                    <TextField id="user_type" select label="Select User Type"
                        disabled={true}
                        value={this.state.user_type}
                        onChange={(e) => this.handleChangeByKeyAndName('user_type', e)}
                        SelectProps={{
                          MenuProps: {
                          },
                        }}
                        helperText={formErrorMessage(errorMessage['user_type'])}
                        fullWidth>
                        {userStatus.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-3 col-xl-4">
                    <div className="form-group">
                      <TextField
                        id="first_name"
                        error={errorMessage['first_name'] ? true : false}
                        fullWidth 
                        label="First Name" 
                        value={this.state.first_name}
                        helperText={formErrorMessage(errorMessage['first_name'], true)}
                        onChange={(e) => this.handleChangeByKeyAndName('first_name', e)}/>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-xl-4">
                    <div className="form-group">
                      <TextField
                        id="middle_name"
                        error={errorMessage['middle_name'] ? true : false}
                        fullWidth 
                        label="Middle Name" 
                        value={this.state.middle_name}
                        helperText={formErrorMessage(errorMessage['middle_name'])}
                        onChange={(e) => this.handleChangeByKeyAndName('middle_name', e)} />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-xl-4">
                    <div className="form-group">
                      <TextField
                        id="last_name"
                        error={errorMessage['last_name'] ? true : false}
                        fullWidth 
                        label="Last Name" 
                        value={this.state.last_name}
                        helperText={formErrorMessage(errorMessage['last_name'], true)}
                        onChange={(e) => this.handleChangeByKeyAndName('last_name', e)}/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-3 col-xl-4">
                    <div className="form-group">
                      <TextField
                        id="email"
                        error={errorMessage['email'] ? true : false}
                        fullWidth 
                        label="Email" 
                        value={this.state.email}
                        helperText={formErrorMessage(errorMessage['email'], true)}
                        onChange={(e) => this.handleChangeByKeyAndName('email', e)}/>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-xl-4">
                    <div className="form-group">
                      <TextField id="gender" select label="Select Gender"
                        error={errorMessage['gender'] ? true : false}
                        value={this.state.gender}
                        onChange={(e) => this.handleChangeByKeyAndName('gender', e)}
                        SelectProps={{
                          MenuProps: {
                          },
                        }}
                        helperText={formErrorMessage(errorMessage['gender'])}
                        fullWidth>
                        {genderType.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-xl-4">
                    <div className="form-group">
                      <TextField
                        id="status"
                        disabled
                        error={errorMessage['status'] ? true : false}
                        fullWidth 
                        label="Status" 
                        value={this.state.status}
                        helperText={formErrorMessage(errorMessage['status'])}
                        onChange={(e) => this.handleChangeByKeyAndName('status', e)}/>
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
                onClick={() => this.updateProfileInfo()}>Update Profile Info
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
  let { account } = state.accountReducer;
  let { user, errorMessage } =  state.userReducer;

  return { account, user, errorMessage };
};

export default connect(mapStateToProps, {
  getUser,
  updateUserProfile
})(TextFields);
