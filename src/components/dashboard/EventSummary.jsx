import React, {Component} from 'react' ;
import {Card, Row, Col} from 'antd' ;
import {connect} from "react-redux";
import {fetchEvents} from "../../actions/eventActions";
import isEmpty from 'lodash/isEmpty' ;
import {Link} from 'react-router-dom';

class EventSummary extends Component {
    state = {
        loading: true,
    };

    componentWillMount() {
        if (isEmpty(this.props.events)) {
            console.log("Fetching Events");
            this.props.fetchEvents().then(() => {
                console.log("Fetch Completed for Events");
                this.setState({loading: false});
            });
        } else {
            this.setState({loading: false});
        }
    }


    renderEvents() {
        console.log("Events", this.props.events);
        return (
            <div className='courses-list'>
                <p>
                    LATEST EVENTS
                </p>
                {this.props.events.slice(0,4).map((event,index) => {
                    return (
                        <div key={index}>
                            <p className="date">{event.date}</p>
                            <p className="name">
                                <Link to={'/events/'}>{event.title}</Link>
                            </p>
                        </div>
                    );
                })}
            </div>
        );
    }

    render() {

        let f = (

            <Row className='summary'>
                <Col span={8} className='bulb'>
                    <img height="68px" src="https://www.codingninjas.in/assets/images/events.png" alt={'Random Text'}
                         width="68px"/>

                </Col>
                <Col span={16} className='header'>
                    Events
                    <p>
                        Checkout the latest happenings and events
                    </p>
                </Col>
            </Row>


        );

        return (
            <div>
                <Card loading={this.state.loading} title={f}>
                    {this.renderEvents()}
                </Card>
            </div>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({loading: false});
        }, 1000);
    }
}


const mapStateToProps = (state) => ({
    events: state.events
});

export default connect(mapStateToProps, {
    fetchEvents
})(EventSummary);
