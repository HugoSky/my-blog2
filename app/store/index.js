import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'
 
const store = createStore(reducer, applyMiddleware(thunk))
export default store

//thunk的作用
//允许返回一个函数而不是一个action
//可以去延迟dispatch一个action 或者只有当情况确认时再去dispatch一个action
//dispatch,getState作为返回函数的参数