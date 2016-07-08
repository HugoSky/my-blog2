import React from 'react'
import { Link } from 'react-router'
import ArticleCard from './ArticleCard.jsx'
import Loading from '../../../components/Loading.jsx'


const ArticleList = React.createClass({
    componentDidMount: function() {
        var page = this.props.page || 1
        var category = this.props.category || ''
        this.props.setLoading(true)
        this.props.getArticles(page, category)  
    },
    componentWillReceiveProps: function(nextProps) {
          if(this.props.page && (this.props.page !== nextProps.page || this.props.category !== nextProps.category)){
            var page = nextProps.page || 1
            var category = nextProps.category || ''
            this.props.setLoading(true)
            this.props.getArticles(page, category)  
          }
    },
    render: function () {
        var articles = this.props.articles;
        console.log(this.props)
        return (
            this.props.isLoading ?
                <Loading />
                :
                    <div>
                    {
                        articles.map(function (item) {
                            return (
                                <ArticleCard 
                                    article={item}
                                />
                            );
                        })
                    }
                    </div>
            )
    }
})

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setArticles , LIMIT, getArticles, setLoading }  from '../../../actions'

function mapStateToProps(state) {
  return {
    articles: state.articleList,
    isLoading: state.resState.isLoading
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setArticles, LIMIT, getArticles, setLoading },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ArticleList);
