import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
// import App from './routes/index.js'
 
import store from './store'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'


import App from './components/App.jsx'
import Home from './routes/home'

injectTapEventPlugin();
render(
    <Provider store={store}>
        <div>
	        <Router history = { browserHistory }>
	            <Route path='/' component={App} >
	                <IndexRoute component={Home} />
	            </Route>
	        </Router>
	    </div>
    </Provider>,
    document.getElementById('App')
)