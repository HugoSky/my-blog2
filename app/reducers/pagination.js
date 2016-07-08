import { SET_CUR_PAGE, SET_MAX_PAGE } from '../actions'

const defaultState = {
	curPage: 1,
	maxPage: 1
}
 
export default function pagination(state = defaultState, action) {
	switch(action.type){
		case SET_CUR_PAGE:{
			return Object.assign({},state,{curPage:action.curPage})
		}
		case SET_MAX_PAGE:{
			return Object.assign({},state,{maxPage:action.maxPage})
		}
		default: {
			return state
		}
	}
}