import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* updateContactInfo(action) {
  try {
    yield axios.put('/api/user/update/phone', action.payload);
    yield axios.put('/api/user/update/email', action.payload);
    yield put({ type: 'FETCH_USER' });
  } catch (err) {
    console.log('could not update user contact info', err);
  }
}

function* getPostings() {
  try {
    const postingsForVolunteerUser = yield axios.get('/api/volunteer');
    yield put({
      type: 'SET_POSTINGS_FOR_VOLUNTEER',
      payload: postingsForVolunteerUser.data,
    });
  } catch (err) {
    console.lof('could not get postings for user', err);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('UPDATE_CONTACT_INFO', updateContactInfo);
  yield takeLatest('GET_POSTINGS_FOR_VOLUNTEER', getPostings);
}

export default userSaga;
