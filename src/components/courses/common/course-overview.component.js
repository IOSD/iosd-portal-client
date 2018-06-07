import React, {Component} from 'react';
import {Row, Col, Card , Spin} from 'antd' ;
import {connect} from 'react-redux' ;
import isEmpty from 'lodash/isEmpty' ;

class CourseOverview extends Component {

    render() {



        let courseId = this.props.match.params.id;
        let course = this.props.courses[courseId] || {};
        console.log(course);
        if(isEmpty(course)) {
            return(
                <Spin spinning={isEmpty(course)}>

                </Spin>
            )
        }
        return (
            <Card style={{marginTop: 0, marginBottom: 0 , padding : '50px 10px 50px 10px'}}>
            <Row className='course-overview'>
                <Col span={12}>
                    <div className='header'>
                        About This Course
                    </div>
                    <div>
                        <Row>
                            <Col span={12}>
                                <Row gutter={8}>
                                    <Col span={6}><img className='img-responsive' src="https://online.codingblocks.com/images/content-2-3ca0cdc013c2195d6fa52a3bcf51ae3c.png" alt=""/></Col>
                                    <Col className='vertical-center' span={18}>
                                        100+ lecture Video Content
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row gutter={8}>
                                    <Col span={6}><img className='img-responsive' src="https://online.codingblocks.com/images/content-2-3ca0cdc013c2195d6fa52a3bcf51ae3c.png" alt=""/></Col>
                                    <Col className='vertical-center' span={18}>
                                        100+ lecture Video Content
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row gutter={8}>
                                    <Col span={6}><img className='img-responsive' src="https://online.codingblocks.com/images/content-2-3ca0cdc013c2195d6fa52a3bcf51ae3c.png" alt=""/></Col>
                                    <Col className='vertical-center' span={18}>
                                        100+ lecture Video Content
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row gutter={8}>
                                    <Col span={6}><img className='img-responsive' src="https://online.codingblocks.com/images/content-2-3ca0cdc013c2195d6fa52a3bcf51ae3c.png" alt=""/></Col>
                                    <Col className='vertical-center' span={18}>
                                        100+ lecture Video Content
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                    </div>
                </Col>
                <Col span={12}>
                    <div className='header'>
                        About Instructors
                    </div>
                    <div>
                        <Row gutter={16}>
                            <Col span={6}>
                                <div>
                                    <img
                                        style={{borderRadius : '50%'}}
                                        className='img-responsive'
                                        src={course.Instructor[0].image} alt=""/>
                                </div>
                            </Col>
                            <Col span={18}>
                                <div className="description" style={{paddingTop:10}}>
                                    <div className="heading-d">
                                        <div className="main-h">
                                            {course.Instructor[0].name}
                                        </div>
                                        <div className="sub-h">
                                            {course.Instructor[0].job}
                                        </div>
                                    </div>
                                    <div className="classroom-para">
                                        {course.Instructor[0].about}
                                    </div>
                                </div>
                            </Col>

                        </Row>
                    </div>
                </Col>
            </Row>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        courses: state.courses.map
    }
}

export default connect(mapStateToProps)(CourseOverview);

