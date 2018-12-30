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

import OneRowInputs from './components/one-row-inputs';

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
    isFormUpdated: false,
    rows: 1
  };

  addOneMoreDepartmentRow = () => {
    let rows = this.state.rows;
    rows++;
    this.setState({rows: rows});
  }

  /**
   * First check is form updated.
	 * Create position for company.
	 */
	createPosition() {
    //
  }

  render() {
    let departmentRows = [];
    for (let i = 0; i < this.state.rows; i++) {
      departmentRows.push(<OneRowInputs key={i} rowKey={i}/>);
    }

    return (
      <div className="textfields-wrapper">
        <div>
            <div className="alert alert-info">
              <p><IntlMessages id='form.position.addNew.description'/> </p>
            </div>
          <form noValidate autoComplete="off">
            <RctCollapsibleCard heading={<IntlMessages id='form.position.addNew.heading'/>}>
              {departmentRows}
              <Button
                disabled={!this.props.showAddButton}
                className={this.props.showAddButton ? "btn-info text-white" : "btn-secondary text-white"}
                style={{marginBottom: 20}}
                size="small"
                onClick={() => this.addOneMoreDepartmentRow()}><IntlMessages id='form.position.addNew.addOneMore'/>
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
  const { showAddButton } = state.positionReducer;
	return { showAddButton };
};

export default connect(mapStateToProps, {
  getAccountCompanies
})(TextFields);
