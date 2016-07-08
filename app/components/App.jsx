import React from 'react'

import Bar from './Bar.jsx'
import Nav from './Nav.jsx'
import ShowSnackbar from './ShowSnackerbar.jsx'
import Bottom from './Bottom.jsx'
 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Paper from 'material-ui/Paper'
import { GridList, GridTile } from 'material-ui/GridList'

const styles = {
    paper: {
        margin: '0px 0px 0px 0px',
        height: '100%'
    },
    non:{
        display: 'none'
    },
    nav: {
        width: '250px',
        position: 'fixed',
        top: '0px',
        left: '0px',
        height: '100%',
        background: '#eef4ed'
    },
    main: {
        paddingLeft: '250px',
        maxWidth: '1200px'
    },
    nonMain: {
        paddingLeft: '0px'
    },
    bar: {
        position: 'fixed',
        height: '64px',
        top: '0px',
        left: '0px',
        right: '0px'
    }
}

const App = React.createClass({
    getInitialState() {
        if(window.innerWidth > 980){
            return {
                smallScreen: false  
            }
        }else{
            return {
                smallScreen:true
            }
        }
    },
    componentDidMount: function() {
        var that = this
        window.addEventListener('resize',function(event) {
            if(that.state.smallScreen && window.innerWidth > 980){
                that.setState({
                    smallScreen: false
                }) 
            }else if(!that.state.smallScreen && window.innerWidth <= 980){
                that.setState({
                    smallScreen: true
                }) 
            }
        })  
    },
    render: function(){
        return(
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <div style={{width: '100%'}}>
                        <div style={this.state.smallScreen ? styles.non : styles.nav}>
                            <Paper style={styles.paper}>
                            {
                                this.state.smallScreen ? '' : <Nav />
                            }
                            </Paper>
                        </div>
                        <div style={this.state.smallScreen ? styles.nonMain : styles.main}>
                            {this.props.children}
                            <Bottom />
                        </div>
                    </div>
                    <ShowSnackbar />
                </div>
            </MuiThemeProvider>
        )
    }
})

export default App