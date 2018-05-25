import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
    Collapse,
    Button
} from 'antd';
// import 'antd/dist/antd.css';

const Panel = Collapse.Panel;

let text = `
A dog is a type of domesticated animal.
Known for its loyalty and faithfulness,
it can be found as a welcome guest in many households across the world.
`;
const callback = (key) => {
    console.log(key);
};


class App extends Component{
    constructor(){
        super();
        
        // BINDING THE EVENTHANDELERS FOR THIS COMPONENT
    }

    render(){
        return(
            <div>
                <Collapse defaultActiveKey={['1']}>
                    {
                        this.props.data.panelTitles.map((title,index) => (
                            <Panel header={title} key={index+1}>
                                <p>{text}</p>
                            </Panel>
                        ))
                    }
                </Collapse>
            </div>
        );
    }
};

// CONNECTING THIS COMPONENT TO REDUX-----------------------
const mapStateToProps = (state) => {
    return {
        data: state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        testDispatch(){
            dispatch({
                type: "TEST",
                payload: "IOSD-course-portal"
            })
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(App); // HIGH ORDER COMPONENT