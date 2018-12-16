/**
 * Material Text Field
 */
import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import { FormGroup } from 'reactstrap';

// utility functions
import {
  formErrorMessage,
  prepareStateForCreateCompanySettingsRequest
} from '../../../util/index';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// redux action
import {
  createCompanySettings,
  getAccount
} from '../../../actions/index';

class TextFields extends React.Component {

  state = {
    user_info: {
      name: '',
      email: ''
    }
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
		this.props.createCompanySettings(
      prepareStateForCreateCompanySettingsRequest(this.state),
      this.props.history
    );
  }

  /**
   * Check account info, if has account info, and state is empty, display account info.
   */
  checkAccountInfo = (account) => {
    // if (this.state.account_info.name.length > 0) {
    //   return;
    // } else if (Object.keys(account).length > 0) {
    //   const { email, name } = account;
    //   var someProperty = {...this.state}
    //   someProperty.account_info.email = email;
    //   someProperty.account_info.name = name;
    //   this.setState({someProperty})   
    // }
  }

  render() {
    const { errorMessage, account } = this.props;
    // this.checkAccountInfo(account);

    return (
      <div className="textfields-wrapper">
        <div>
          <form noValidate autoComplete="off">
            <RctCollapsibleCard heading="Account Info">
                <div className="row">
                  <div className="col-sm-6 col-md-3 col-xl-4">
                    <div className="form-group">
                      <TextField
                        id="name"
                        error={errorMessage['user_info.name'] ? true : false}
                        fullWidth 
                        label="Name of account" 
                        value={this.state.user_info.name}
                        helperText={formErrorMessage(errorMessage['user_info.name'], true)}
                        onChange={(e) => this.handleChangeByKeyAndName('user_info', 'name', e)}/>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-xl-4">
                    <div className="form-group">
                      <TextField
                        id="email"
                        error={errorMessage['user_info.email'] ? true : false}
                        fullWidth 
                        label="Email" 
                        value={this.state.user_info.email}
                        helperText={formErrorMessage(errorMessage['user_info.email'], true)}
                        onChange={(e) => this.handleChangeByKeyAndName('user_info', 'email', e)} />
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
  createCompanySettings,
  getAccount
})(TextFields);
