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

// utility functions
import {
  checkObjectInArrayHasEmptyProperty
} from '../../../util/index';

// redux action
import {
  storePositionsBeforeCreating,
  resetStorePositionsBeforeCreating,
  createPositions
} from '../../../actions/index';

class TextFields extends React.Component {

  state = {
    rows: 1
  };

  componentWillUnmount() {
    this.props.resetStorePositionsBeforeCreating();
  }

  /**
   * Add one more row with position form.
   */
  addOneMorePositionRow = () => {
    let rows = this.state.rows;
    rows++;
    this.setState({rows: rows});
  }

  /**
   * Remove last row, if have more then one, 
   * and remove data from temporary store for position.
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
    this.props.createPositions(this.props.beforeCreatePositions, this.props.history);
  }

  /**
   * Make button clickable for creating position.
	 */
  enableCreatePositionsButton = () => {
    let { beforeCreatePositions } = this.props;

    if (beforeCreatePositions.length > 0 && !checkObjectInArrayHasEmptyProperty(beforeCreatePositions)) {
      return true;
    } else if (beforeCreatePositions.length > 0) {
      return false;
    }
  }

  render() {
    let departmentRows = [];
    let buttonToAddRow;

    for (let i = 0; i < this.state.rows; i++) {
      departmentRows.push(<OneRowInputs key={i} rowKey={i}/>);
    }

    if (this.state.rows > 1 ) {
      buttonToAddRow = (
        <Button
          className="btn-info text-white"
          style={{marginBottom: 20, marginLeft: 20}}
          size="small"
          onClick={() => this.removeLastPositionRow()}><IntlMessages id='form.position.addNew.removeLastRow'/>
        </Button>
      );
    }

    let showButton = !this.enableCreatePositionsButton();
      
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
              { buttonToAddRow }
            </RctCollapsibleCard>
            <FormGroup className="mb-5">
              <Button
                disabled={showButton}
                className={showButton ? "btn-secondary text-white btn-block w-40" : "btn-info text-white btn-block w-40"} 
                mini={true}
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
  storePositionsBeforeCreating,
  resetStorePositionsBeforeCreating,
  createPositions
})(TextFields);
