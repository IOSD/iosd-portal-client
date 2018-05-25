import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
// import 'antd/dist/antd.css';

import {store} from './store/store'

// Importing external components----
import App from './components/App';

class Layout extends Component{
    render(){
        return(
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}

const target = document.getElementById('app');
ReactDOM.render(<Layout/>, target);