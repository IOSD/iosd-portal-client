import React, {Component} from 'react' ;
import {connect} from 'react-redux';
import {Card} from 'antd' ;
import isEmpty from 'lodash/isEmpty' ;
import {Link} from 'react-router-dom';
// const { Meta } = Card;
import {fetchUserProfile} from "../../actions/profileActions";

class ProfileCard extends Component {
    state = {
        loading: true,
    };

    componentWillMount() {
        console.log("user", this.props.profile);
        console.log(isEmpty(this.props.profile));
        if (isEmpty(this.props.profile)) {
            this.props.fetchUserProfile().then(() => {
                console.log("Fetch for User Completed");
                this.setState({loading: false});
            });
        }
    }


    render() {

        let user;
        if (isEmpty(this.props.profile)) {
            user = {
                skills: []
            };
        } else {
            user = this.props.profile;
        }
        return (
            <div>
                <Card
                    className='profile-card'
                    cover={<img src={user.image}
                                alt={'Random Text'}/>}
                >
                    <Link to='/profile'>
                        <div className='card-meta'>
                            <h4 className='name'>{user.name}</h4>
                            <h4 >{user.college}</h4>
                        </div>
                    </Link>
                    <div className='card-meta'>
                        <p>Skills :</p>
                        <ul className='profile-skills'>
                            {
                                user.skills.map((skill,index) => <li key={index}>{skill}</li>)
                            }
                        </ul>
                    </div>
                </Card>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.auth.user,
        profile: state.profile
    };
}

export default connect(
    mapStateToProps, {
        fetchUserProfile
    }
)(ProfileCard);
