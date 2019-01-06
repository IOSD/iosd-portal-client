import React, {Component} from 'react' ;
import {Card, Row, Col} from 'antd' ;
import {connect} from "react-redux";
import isEmpty from 'lodash/isEmpty' ;
import {Link} from 'react-router-dom';

import {fetchAllCourses} from "../../actions/courseActions";


class CoursesSummary extends Component {
    state = {
        loading: true,
    };

    componentWillMount() {
        if (isEmpty(this.props.courses.list)) {
            console.log("Fetching Courses");
            this.props.fetchAllCourses().then(() => {
                console.log("Fetch Completed for Courses");
                this.setState({loading: false});
            });
        } else {
            this.setState({loading: false});
        }
    }


    renderCourses() {
        // console.log(this.props.courses);
        return (
            <div className='courses-list'>
                <p>
                    COURSES WE PROVIDE
                </p>
                {
                    this.props.courses.list.slice(0, 5).map(course => {
                        return (
                            <div className="problem" key={course.id}>
                                <Link to={`/course/${course.id}`}>{course.title}</Link>
                                <p>{course.sub_title}</p>
                            </div>
                        );
                    })
                }
                {/*<div className="problem">*/}
                {/*<a>Eminence</a>*/}
                {/*<p>Competitive Programming Course</p>*/}
                {/*</div>*/}
                {/*<div className="problem">*/}
                {/*<a>Eminence</a>*/}
                {/*<p>Competitive Programming Course</p>*/}
                {/*</div>*/}
                {/*<div className="problem">*/}
                {/*<a>Eminence</a>*/}
                {/*<p>Competitive Programming Course</p>*/}
                {/*</div>*/}
                {/*<div className="problem">*/}
                {/*<a>Eminence</a>*/}
                {/*<p>Competitive Programming Course</p>*/}
                {/*</div>*/}
                {/*<div className="problem">*/}
                {/*<a>Eminence</a>*/}
                {/*<p>Competitive Programming Course</p>*/}
                {/*</div>*/}
            </div>
        );
    }

    render() {

        let f = (

            <Row className='summary'>
                <Col span={8} className='bulb'>
                    <img height="68px" src="https://www.codingninjas.in/assets/images/Courses.png" width="68px"
                         alt={'Random Text'}/>

                </Col>
                <Col span={16} className='header'>
                    Courses
                    <p>
                        Learning was never this easy.
                        Checkout the courses we provide
                    </p>
                </Col>
            </Row>


        );

        return (
            <div>
                <Card loading={this.state.loading} title={f}>
                    {this.renderCourses()}
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
    courses: state.courses
});

export default connect(mapStateToProps, {
    fetchAllCourses
})(CoursesSummary);
