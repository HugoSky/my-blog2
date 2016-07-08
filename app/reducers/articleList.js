import { SET_ARTICLE_LIST } from '../actions'
 


export default function category(state=[],action) {
	switch(action.type){
		case SET_ARTICLE_LIST:{
			return action.articleList
		}
		default: {
			return state
		}
	}
}