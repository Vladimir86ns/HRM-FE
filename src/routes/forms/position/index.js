/**
 * Material Text Field
 */
import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { FormGroup } from 'reactstrap';
import IntlMessages from '../../../util/IntlMessages';

import OneRowInputs from './components/one-row-inputs';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// redux action
import {
  storePositionsBeforeCreating
} from '../../../actions/index';


class TextFields extends React.Component {

  state = {
    rows: 1
  };

  /**
   * Add one more row with position form.
   * 
   */
  addOneMorePositionRow = () => {
    let rows = this.state.rows;
    rows++;
    this.setState({rows: rows});
  }

  /**
   * Remove last row, if have more then one, 
   * and remove data from temporary store for position.
   * 
   */
  removeLastPositionRow = () => {
    let createdPosition = this.props.beforeCreatePositions;

    if (this.state.rows === createdPosition.length) {
      let result = createdPosition.slice(0, createdPosition.length - 1);
      this.props.storePositionsBeforeCreating(result);
    }

    let rows = this.state.rows--;
    rows--;
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
    let button;

    for (let i = 0; i < this.state.rows; i++) {
      departmentRows.push(<OneRowInputs key={i} rowKey={i}/>);
    }

    if (this.state.rows > 1 ) {
      button = (
        <Button
          className="btn-info text-white"
          style={{marginBottom: 20, marginLeft: 20}}
          size="small"
          onClick={() => this.removeLastPositionRow()}><IntlMessages id='form.position.addNew.removeLastRow'/>
        </Button>
      );
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
                onClick={() => this.addOneMorePositionRow()}><IntlMessages id='form.position.addNew.addOneMore'/>
              </Button>
              { button }
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
  const { showAddButton, beforeCreatePositions } = state.positionReducer;
	return { showAddButton, beforeCreatePositions };
};

export default connect(mapStateToProps, {
  storePositionsBeforeCreating
})(TextFields);
