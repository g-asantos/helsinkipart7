import { createStore, applyMiddleware, combineReducers } from 'redux'
import { blogReducer } from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import {loginReducer} from './reducers/loginReducer'
import {usersReducer} from './reducers/usersReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const combinedReducers = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  users: usersReducer,
  login: loginReducer
})


const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store