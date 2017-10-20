import React, {Component} from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import Navbar from './Navbar'
import AllCampuses from './AllCampuses'
import SingleCampus from './SingleCampus'
import EditCampus from './EditCampus'
import AllStudents from './AllStudents'
import SingleStudent from './SingleStudent'
import store from '../store'
import {getCampusesThunk, getStudentsThunk} from '../reducers/index'
import {connect} from 'react-redux'

class Main extends Component {
  componentDidMount () {
    this.props.goFetchCampuses();
    this.props.goFetchStudents();
  }
  render() {
    return(
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/campuses' component={AllCampuses} />
          <Route path='/campuses/:campusId' component={SingleCampus} />
          <Route path='/edit_campus/:campusId' component={EditCampus} />
          <Route exact path='/students' component={AllStudents} />
          <Route path='/students/:studentId' component={SingleStudent} />
        </Switch>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch, ownProps)=>{
  return {
    goFetchCampuses:  () => dispatch(getCampusesThunk()),
    goFetchStudents: () => dispatch(getStudentsThunk())
  }
}
const campus = withRouter(connect(null, mapDispatchToProps)(Main))

export default campus
