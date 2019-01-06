/**
 * Update User Details Form
 */
import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import IntlMessages from '../../../../util/IntlMessages';

const UpdatePositionForm = ({ position, updatedName, updatePositionName }) => (
    <Form>
        <FormGroup>
            <Label for="positionName"><IntlMessages id='table.position.form.update.name'/></Label>
            <Input
                type="text"
                name="positionName"
                id="positionName"
                placeholder="Position Name"
                value={updatedName}
                onChange={(e) => updatePositionName(e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label for="userEmail"><IntlMessages id='table.position.form.update.departmentName'/></Label>
            <Input
                disabled={true}
                type="text"
                name="department"
                id="department"
                placeholder="Enter Department"
                value={position.department_name}
            />
        </FormGroup>
    </Form>
);

export default UpdatePositionForm;
