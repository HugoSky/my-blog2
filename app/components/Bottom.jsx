import React from 'react'
import FontIcon from 'material-ui/FontIcon'

var style = {
    bottom:{
        backgroundColor:'rgb(33,33,33)',
        textAlign:'center',
        padding:'20px 10px',
        color:'#444',
        margin:'20px 0px 0px 0px'
    }
}

const Bottom = React.createClass({
    render: function(){
        return (
        	<div style={style.bottom}>
	        	<p>@2016 produced by ZZ</p>
                <p>Powered by ReactJs & NodeJs</p>
            </div>
        )
    }
})
export default Bottom