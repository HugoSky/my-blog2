import { SET_SNACKBAR, SET_LOADING } from '../actions'
 
export default function category(state={},action) {
	switch(action.type){
		case SET_LOADING:{
			return Object.assign({},state,{isLoading:action.isLoading})
		}
		case SET_SNACKBAR:{
			return Object.assign({},state,{message:action.message})
		}
		default: {
			return state
		}
	}
}