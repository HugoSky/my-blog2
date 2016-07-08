import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const ShowSnackbar = React.createClass({
    getInitialState: function () {
        return {
            open: false
        }
    },
    hanleRequestClose: function () {
        this.setState({
            open:false,
        });
    },
    componentWillReceiveProps: function(nextProps) {
        if(nextProps.message !== ''){
            this.setState({
                open: true
            })
        }  
    },
    render: function(){
        return (
            <Snackbar open={this.state.open} message={this.props.message || ''}
                onRequestClose= {()=>{this.handleRequestClose()}}
                autoHideDuration={3000}
            />
        )
    }
})

function mapStateToProps(state) {
    return {
        message:state.resState.message
    }
}
export default connect(mapStateToProps)(ShowSnackbar); 