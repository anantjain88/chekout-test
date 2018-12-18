import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import articles from './articles/sagas';
import investors from './investors/sagas';
export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    articles(),
    investors(),
  ]);
}
