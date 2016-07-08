import reqwest from 'reqwest'


//返回action action中包含数据和类型  reducer接收  并更新数据 


export const LIMIT = 5
 

export const SET_CATEGORY = 'SET_CATEGORY';
export const setCategory = (category) => {
	return{
		type: SET_CATEGORY,
		category
	}
} 
export const getCategory = () => {
	return (dispatch) => {
		reqwest({
			url: '/newArticleList',
			method: 'get',
			type: 'json',
			success: function(data) {
				dispatch(setCategory(data.newArticleList))
			}
		})
	}
}

//resState
export const SET_LOADING = 'SET_LOADING'
export const setLoading = (isLoading) => {
	return {
		type:SET_LOADING,
		isLoading
	}
}
export const SET_SNACKBAR = 'SET_SNACKBAR'
export const setSnacker = (message) => {
	return {
		type:SET_SNACKBAR,
		message
	}
}


export const SET_ARTICLE_LIST = 'SET_ARTICLE_LIST'
export const setArticleList = (articleList) => {
	return{
		type: SET_ARTICLE_LIST,
		articleList
	}
}
export const getArticles = (curPage, category='') => {
	return (dispatch) => {
		reqwest({
			url: '/article/list',
			method: 'get',
			type: 'json',
			data:{
				page: curPage,
				limit: LIMIT,
				category: category
			},
			error: function (error) {
				// dispatch(setSnackbar('加载文章列表失败了T—T 刷新试试'));
			},
			success: function(data){
				console.log(data.data)
				dispatch(setLoading(false))
				dispatch(setArticleList(data.data))
				dispatch(setCurpage(curPage))
			}
		})
	}
} 

export const SET_CUR_PAGE = 'SET_CUR_PAGE'
export const SET_MAX_PAGE = 'SET_MAX_PAGE'
export const setMaxPage = (maxPage) => {
	return {
		type: SET_MAX_PAGE,
		maxPage
	}
}
export const getMaxPage = (category = '') => {
	return (dispatch) => {
		reqwest({
			url: '/countArticle',
			type: 'json',
			method: 'get',
			data: {
				category: category
			},
			success: function(data) {
				let maxPage =Math.ceil(parseInt(data.count)/LIMIT)
				dispatch(setMaxPage(maxPage))
			},
			error: function() {
				dispatch(setSnackbar('获取分页数据失败T_T'))
			}
		})
	}
}
export const setCurpage = (curPage) => {
	return{
		type: SET_CUR_PAGE,
		curPage
	}
}