import React, {Component} from 'react' ;
import {Card, Avatar, Row, Col} from 'antd' ;
import {connect} from 'react-redux' ;
import {Link} from 'react-router-dom' ;
import {fetchBlogPosts} from '../../actions/blogActions' ;

class BlogSummary extends Component {
    state = {
        loading: true,
    };

    componentWillMount() {
        this.props.fetchBlogPosts().then(data => {
            this.setState({loading: false});
        });
    }

    renderPosts() {
        return (
            <div className='blog-list'>
                <p>
                    LATEST POSTS
                </p>
                {
                    this.props.posts.slice(-5).reverse().map((item, index)=> {
                        // console.log(item)
                        return (<div className="post" key={index}>
                            <div className='post-avatar'>
                                <Avatar size="large" src={item.thumbnail}/>
                            </div>
                            <div className='post-desc'>
                                <Link to={'/blog/'}><strong>{item.title}</strong></Link>
                                <p>{item.author}</p>
                            </div>
                        </div>);
                    })
                }

            </div>

        );
    }

    render() {

        let f = (

            <Row className='summary'>
                <Col span={8} className='bulb'>
                    <img alt={'Random Text'} height="68px" src="https://www.codingninjas.in/assets/images/glasses.png"/>

                </Col>
                <Col span={16} className='header'>
                    Blog
                    <p>
                        Want to know some more? Go Through our awesome blogs. <br/>
                        <Link to='/blog'>Know More</Link>
                    </p>
                </Col>
            </Row>


        );

        return (
            <div>
                <Card loading={this.state.loading} title={f}>
                    {this.renderPosts()}
                </Card>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    posts: state.blog.posts
});

export default connect(mapStateToProps, {
    fetchBlogPosts
})(BlogSummary);