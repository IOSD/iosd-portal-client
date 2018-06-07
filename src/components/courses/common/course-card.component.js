import React from 'react';
import {Link} from 'react-router-dom';
import {Card, Button, Row, Col} from 'antd' ;

const CourseCardComponent = ({course}) => {
    let instructor = course.Instructor[0];
    return (
            <Card>
                <div className="beginner-level"></div>
                <div className="beginner-text">Beginner</div>


                <div className="card-image o-image-card">
                    <img
                        className='img-responsive'
                        src={course.image}
                        alt=''
                    />
                </div>

                <h1 className="card-heading">
                    {course.title}
                </h1>
                <h4 className="card-text">
                    {course.sub_title}
                </h4>


                <div className="card-mentor">
                    <div className="card-mentor-image">
                        <img src={instructor.image}
                             className="card-mentors img-responsive"
                             alt=''/>
                    </div>
                    <div className="card-mentor-text">
                        <span>Instructors</span>
                        <div className="card-mentor-name">
                            {instructor.name}
                        </div>
                    </div>
                </div>
                <div className="card-mentor-divider"/>
                <Row style={{margin: '20px'}}>
                    <Col span={12}>
                        <div className="card-price-details">
                            <div className="card-batch-details">
                                {course.total_videos} Videos<br/> <span className="price">Duration : {course.duration}</span>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="price-button">
                            <Link to={`/course/${course._id}`}>
                                <Button size='large' className="button-solid">View</Button>
                            </Link>
                        </div>
                    </Col>
                </Row>

            </Card>
    );
};

export default CourseCardComponent;
