import { all } from "redux-saga/effects"
import { combineReducers } from "redux"
import { authReducer, authSaga } from "./modules/auth"

export const rootReducers = combineReducers({
  authReducer
})

export function* rootSagas() {
  yield all([
    authSaga()
  ])
}
