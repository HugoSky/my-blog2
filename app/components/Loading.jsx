import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

var style = {
    marginTop:'25%',
    marginBottom:'25%',
    marginLeft:'46%'
}

const Loading = React.createClass({
    render: function(){
        return (
            <CircularProgress style={style} size={2}/>
        )
    }
})
export default Loading