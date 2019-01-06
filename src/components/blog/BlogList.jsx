import React, {Component} from 'react';
// import DOMPurify from 'dompurify'
import {Card, Row, Col} from 'antd' ;
import {connect} from 'react-redux' ;
import isEmpty from 'lodash/isEmpty' ;
import {fetchBlogPosts} from '../../actions/blogActions' ;

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// TODO : Implement Single Blog Post

class BlogComponent extends Component {

    componentWillMount() {
        console.log(this.props.posts);
        if (isEmpty(this.props.posts)) {
            console.log(this.props.posts);

            this.props.fetchBlogPosts().then(() => {
                console.log("Fetch Completed for Blog");
            })
        }
    }

    render() {
        return (
            <div className='container'>
                <Row className='blog' gutter={16} type="flex" align="top">
                    {
                        this.props.posts.map(post => {
                            console.log(post);
                            post.thumbnail = post.thumbnail.replace(/\/max\/\d+\//i, '/max/1024/');
                            post.excerpt = post.content.match(/<\w+>(.*?)<\/\w+>/i)[1];
                            if (post.excerpt.length > 50) {
                                post.excerpt = post.excerpt.slice(0, 50) + "..."
                            }
                            console.log(post.excerpt);
                            let month = parseInt(post.pubDate.slice(5, 7)) - 1;
                            month = monthNames[month];

                            return (


                                <Col span={8}>
                                    <Card className="blog-post">
                                        <div className='blog-image' style={{
                                            backgroundImage: `url(${post.thumbnail})`,
                                            height: 172
                                        }}>

                                        </div>
                                        <div className='blog-content'>
                                            <div className='blog-title'>{post.title}</div>
                                            <div className='blog-excerpt'>
                                                {post.excerpt}
                                            </div>
                                            <div className="blog-author">
                                                By {post.author} <br/>
                                                {`${post.pubDate.slice(8, 10)} ${month}`}
                                            </div>
                                        </div>
                                    </Card>

                                </Col>
                            )
                        })


                    }
                </Row>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    posts: state.blog.posts
});

export default connect(mapStateToProps, {
    fetchBlogPosts
})(BlogComponent);
