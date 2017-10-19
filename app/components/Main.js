import React, {Component} from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import Navbar from './Navbar'
import AllCampuses from './AllCampuses'
import SingleCampus from './SingleCampus'
import store from '../store'
import {getCampusesThunk} from '../reducers/index'
import {connect} from 'react-redux'

class Main extends Component {
  componentDidMount () {
    this.props.goFetchCampuses();
  }
  render() {
    return(
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/campuses' component={AllCampuses} />
          <Route path='/campuses/:campusId' component={SingleCampus} />
        </Switch>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch, ownProps)=>{
  return {
    goFetchCampuses:  () => dispatch(getCampusesThunk())
  }
}
const campus = withRouter(connect(null, mapDispatchToProps)(Main))

export default campus
