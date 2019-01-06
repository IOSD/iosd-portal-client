import React, {Component} from 'react';
import isEmpty from 'lodash/isEmpty' ;
import {Layout, Divider, Collapse, List, Avatar, Spin, Icon, Button} from 'antd' ;
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchAllCourses, fetchProgress} from "../../../actions/courseActions";

const {Header, Footer, Sider, Content} = Layout;
// const SubMenu = Menu.SubMenu;


const {Panel} = Collapse;
const renderVideo = (vlist, progress, courseId) => {
    return (
        <List>
            {
                vlist.map(video => {
                    return (
                        <List.Item key={video._id}>
                            <List.Item.Meta
                                avatar={<Avatar
                                    src="https://online.codingblocks.com//images/video-green-dark-23c7a6e7f9fbe82c99efb12d3daed5f2.png"/>}
                                title={
                                    <Link to={`/player/course/${courseId}/video/${video._id}`}> {video.title} </Link>
                                }
                            />
                            <span style={{marginRight: 50}}>
                                {(progress[video._id] == true) ? <Icon type="check"/> : <div/>}
                            </span>
                        </List.Item>
                    );

                })
            }

        </List>
    );
};

function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}

const customPanelStyle = {
    background: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    overflow: 'hidden',
};

// TODO: CHANGE VIDEO IN IFRAME ON SELECTING DIFFERENT VIDEO
// TODO: CHANGE THE CHECK ICON IF THE VIDEO IS WATCHED

class PlayerComponent extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            videos: [],
            playerTitle: '',
            currently_playing: ''
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    componentWillMount() {
        if (isEmpty(this.props.courses)) {
            this.props.fetchAllCourses().then(() => {
                console.log("CoursesSummary Fetch Completed");
            });
        }
        let courseId = this.props.match.params.cid;
        if (isEmpty(this.props.progress[courseId])) {
            this.props.fetchProgress(courseId).then(() => {
                console.log("Progress Fetch Completed");
            });
        }

    }

    componentWillReceiveProps(nextProps) {
        console.log("Component Will Props", nextProps.match.params.vid);

        this.setState({
            currently_playing: nextProps.match.params.vid,
        });
    }

    // FIRED WHEN A VIDEO FROM MENU IS SELECTED
    /**
     *
     * @param {item} MenuItem returns the react class of the selected video
     */
    onSelectVideo({item, key, selectedKey}) {

        this.setState({
            selectedVideo: key,
            playerTitle: item.props.videoTitle
        });
    }


    // Load videos --------
    getVideosList(section_categories, courseId, progress) {
        let key = 1;
        return (
            <Collapse bordered={false} style={{background: '#F0F2F5'}}>
                {

                    Object.keys(section_categories).map((section) => {

                        let vlist = section_categories[section];
                        let section_length = vlist.length;

                        let section_done = vlist.filter(video => {
                            return (progress[video] == true);
                        }).length;

                        return (
                            <Panel header={
                                <div>
                                    {section}
                                    <div className="pull-right"
                                         style={{marginRight: 50}}> {section_done}/{section_length}</div>
                                </div>
                            } key={key++} style={customPanelStyle}>
                                {renderVideo(vlist, progress, courseId)}
                            </Panel>
                        );
                    })

                }

            </Collapse>
        );
    }

    render() {

        console.log("rendering again");

        let courseId = this.props.match.params.cid;
        let course = this.props.courses[courseId] || {};

        if (isEmpty(course)) {
            return (
                <Spin/>
            );
        }

        let progress = this.props.progress[courseId];
        let section_categories = {};

        course.videos.forEach(video => {

            if (video.section in section_categories) {
                section_categories[video.section].push(video);
            }
            else {
                section_categories[video.section] = [video];
            }
        });

        function findSource(vid) {
            console.log("Find Source : ", vid);
            if (vid === '') {
                return;
            }
            let base = '//www.youtube.com/embed/';
            let a = undefined;
            course.videos.forEach(video => {
                if (video._id === vid) {
                    a = video;
                    return;
                }
            });
            base += getId(a.url);
            return base;

        }


        return (
            <Layout className='custom-player-layout'>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    collapsedWidth={0}
                    width={'20rem'}
                    style={{overflow: 'auto', height: '100vh', position: 'fixed'}}
                >
                    <div className="logo">
                        <img className='img-responsive' src="http://iosd.tech/img/IOSD-logo.png" alt=""/>
                    </div>
                    <Divider/>
                    <div>
                        {this.getVideosList(section_categories, courseId, progress)}
                    </div>
                </Sider>
                <Layout style={{marginLeft: (this.state.collapsed ? 0 : '20rem')}}>
                    <Header>
                        <Icon
                            className="trigger"
                            style={{fontSize: 20}}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <span style={{margin: '0 20px'}}>
                {this.state.playerTitle}
                </span>
                        <div className='go-dashboard'>
                            <Link to={`/course/${courseId}`}><Button className='button-solid' type="primary">Go to Dashboard </Button></Link>
                        </div>

                    </Header>
                    <Content>
                        <div className="video-wrapper">
                            <iframe className='responsive-embed' src={findSource(this.state.currently_playing)}
                                    frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen>
                            </iframe>
                        </div>

                    </Content>
                </Layout>
            </Layout>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        courses: state.courses.map,
        progress: state.progress
    };
};


export default connect(mapStateToProps, {
    fetchAllCourses,
    fetchProgress
})(PlayerComponent);
