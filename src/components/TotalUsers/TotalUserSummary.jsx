import React, {Component} from 'react';
import {Row, Col, Card, Button, Icon} from 'antd' ;
import {Link} from 'react-router-dom' ;

class TotalUserSummary extends Component {

    render() {

        let f = (
            <Row className='card-header'>
                <Col span={8} className='bulb'>
                    <img height="68px" src="https://www.codingninjas.in/assets/images/Courses.png" width="68px"
                         alt={'Random Text'}/>

                </Col>
                <Col span={16} className='header'>
                    Total User
                    <p>
                        View Users
                    </p>
                </Col>
            </Row>
        );


        return (
            <div>
                <Card title={f}>
                    <Row className='text-center'>
                        <Col span={12}>
                            <Link to='/admin/totalusers/list'>
                                <Button type='primary'>
                                    View User
                                </Button>
                            </Link>
                        </Col>
                        <Col span={12}>
                            <Link to='/admin/totalusers/new'>
                                <Button type='primary'>
                                    <Icon type="plus"/> Add User
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}

export default TotalUserSummary;
