 import React from 'react'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton' 
import {blue500, red500, greenA200} from 'material-ui/styles/colors'
const styles = {
    title: {
        cursor: 'pointer'
    },
    iconRight: {
        marginLeft: ''
    }
}


const Bar = React.createClass({
    render: function () {
        return(
            <div>
                <AppBar title={<span style={styles.title}>My Blog</span>}
                    onLeftIconButtonTouchTap = {() => {this.handleToogle()}}
                    onTitleTouchTap = {()=>{this.handleToggle()}}
                    iconElementRight = {
                        <IconButton>
                            <a href="https://github.com/HugoSky" target="_blank">
                                <FontIcon 
                                    className = 'muidocs-icon-custom-github'
                                    color = 'white'
                                /> 
                            </a>
                        </IconButton>
                    }
                    iconStyleRight = {styles.iconRight}
                />
            </div>
        )
    }
})

export default Bar