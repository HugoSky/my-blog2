import React from 'react'
import reqwest from 'reqwest'
import {Link} from 'react-router'
import Subheader from 'material-ui/Subheader'
import { List, ListItem, MakeSelectable } from 'material-ui/List'
import { Step, Stepper, StepLabel, StepContent, StepButton } from 'material-ui/Stepper'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCategory } from '../actions'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import FontIcon from 'material-ui/FontIcon'
import FileFolder from 'material-ui/svg-icons/file/folder'
import ContentDrafts from 'material-ui/svg-icons/content/drafts'
 
const Nav = React.createClass({
    componentDidMount: function () {
       this.props.getCategory()
    },
    componentDidUpdate: function () {
    },
    generateItem: function () {
        return this.props.category.map((item) => {
            return (
                <ListItem 
                    key={item.category} 
                    leftIcon={<ActionGrade />}
                >
                    <Link 
                        to={'/page/' + item.category + '/1'}
                        onClick = {()=>{this.handleToggle()}}
                    >
                        {item.category}
                    </Link>
                </ListItem>
            )
        })
    },
    render:function () {
        var cont = [];
        var i = 0;        
        var data = this.props.category;

        return (
            <div>
                <List>
                    <Subheader><h1>ZZ...</h1></Subheader>
                    <Divider />
                    <Link to='/page/1'>
                        <ListItem primaryText="首页" onClick={()=>{this.handleToogle()}}
                            leftIcon = {<FontIcon className="muidocs-icon-action-home"/>}
                        /> 
                    </Link>
                    <ListItem primaryText="分类"
                            leftIcon = {<FileFolder />}
                            primaryTogglesNestedList = {true}
                            initiallyOpen = {true}
                            nestedItems = {this.generateItem()}
                    /> 
                    <Link to='/message'>
                        <ListItem
                            primaryText = '留言' 
                            onClick = {()=>{this.handleToggle()}}
                            leftIcon = {<ContentDrafts />}
                        />
                    </Link>
                </List>
            </div>
        );
    }
});


function mapStateToProps(state) {
    return {
        category:state.category
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCategory },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Nav);