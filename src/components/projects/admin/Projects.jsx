import React, {Component} from 'react';
import {Route , Switch , Redirect} from 'react-router-dom' ;
import { connect } from 'react-redux';
import { fetchProjects } from '../../../actions/projectActions';
import ProjectsList from "./ProjectsList";
import ProjectAdd from './ProjectAdd';
import ProjectEdit from './ProjectEdit';

class Projects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    };

    componentWillMount() {
        if (this.props.projects.length === 0) {
            this.props.dispatch(fetchProjects())
            .then(() => this.setState({ loading: false}))
        } else {
            this.setState({ loading: false})
        }
    }

    render() {
        if (this.state.loading) {
            return <h1>Loading</h1>
        }

        return (
            <div className='container'>
                <Switch>
                    <Route path='/admin/projects/list' component={ProjectsList}/>
                    <Route path='/admin/projects/new' component={ProjectAdd}/>
                    <Route path='/admin/projects/:id' component={ProjectEdit}/>
                    <Route path='/admin/projects' component={()=><Redirect to='/'/>}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = ({ projects }) => ({
    projects
});

export default connect(mapStateToProps)(Projects);
