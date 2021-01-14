import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import causesSaga from './causes.saga';
import activitiesSaga from './activities.saga';
import agesSaga from './ages.saga';
import backBtnHistorySaga from './back.history.saga';
import filterPostingsSaga from './filter.postings.saga';
import imageUploadSaga from './imageUpload.saga';
import adminSaga from './admin.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    causesSaga(),
    activitiesSaga(),
    agesSaga(),
    backBtnHistorySaga(),
    filterPostingsSaga(),
    imageUploadSaga(),
    adminSaga(),
  ]);
}
