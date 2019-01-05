/**
 * Tables Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
// async components
import {
    AsyncBasicTableComponent,
    AsyncDataTableComponent,
    AsyncResponsiveTableComponent,
    AsyncDepartmentTableComponent,
    AsyncPositionGetAllComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Pages = ({ match }) => (
    <div className="content-wrapper">
        <Helmet>
            <title>Reactify | Tables</title>
            <meta name="description" content="Reactify Tables" />
        </Helmet>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/basic`} />
            <Route path={`${match.url}/basic`} component={AsyncBasicTableComponent} />
            <Route path={`${match.url}/data-table`} component={AsyncDataTableComponent} />
            <Route path={`${match.url}/responsive`} component={AsyncResponsiveTableComponent} />
            <Route path={`${match.url}/department`} component={AsyncDepartmentTableComponent} />
            <Route path={`${match.url}/position-table`} component={AsyncPositionGetAllComponent} />
        </Switch>
    </div>
);

export default Pages;
