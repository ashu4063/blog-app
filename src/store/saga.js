import React, { useDispatch } from "react"
import "../firebaseConfig";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { eventChannel } from 'redux-saga';
import { put, takeEvery, all, takeLatest, take, cancelled } from 'redux-saga/effects'

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'

const auth = getAuth();

function* getUserSuccess() {
  console.log('in2')
  const authEventsChannel = eventChannel(emit => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      emit({ user });
    });

    return unsubscribe;

  })
  try {
    while (true) {
      const { user } = yield take(authEventsChannel);
      yield put({ type: GET_USER_SUCCESS, payload: user })

    }
  } finally {
    // unregister listener if the saga was cancelled
    if (yield cancelled()) authEventsChannel.close();
  }
}
function* watchGetUser() {
  console.log('in1')
  yield takeLatest("GET_USER_SUCCESS", getUserSuccess)
}

export default function* rootSaga() {
  yield all([
    getUserSuccess(),
  ])
}