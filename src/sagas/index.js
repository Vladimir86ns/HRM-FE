/**
 * Root Sagas
 */
import { all } from 'redux-saga/effects';

// sagas
import authSagas from './Auth';
import emailSagas from './Email';
import todoSagas from './Todo';
import feedbacksSagas from './Feedbacks';

import accountSagas from './AccountSaga';
import companySettingsSagas from './CompanySaga';
import userSagas from './UserSaga';
import positionSagas from './PositionSaga';

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        emailSagas(),
        todoSagas(),
        feedbacksSagas(),

        accountSagas(),
        companySettingsSagas(),
        userSagas(),
        positionSagas()
    ]);
}
