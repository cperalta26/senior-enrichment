import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCampusesThunk, getCampusThunk} from '../reducers/index'
import { Link } from 'react-router-dom';

class SingleCampus extends Component {
  componentDidMount() {
    const campusId = +this.props.match.params.campusId
    this.props.goFetchCampus(campusId)
  }

  render() {
    return (
      <div>
        <h4>{this.props.campus.name}</h4>
        <h5>{this.props.campus.phone}</h5>
        <h6>{this.props.campus.address}</h6>
        <ul>
        {
          this.props.campus.students && this.props.campus.students.map(student=>{
            return (
              <li key={student.id}>
                <Link to={`/students/${student.id}`}> {student.name}</Link>
                <button>X</button>
              </li>
            )
          })
        }
        </ul>
        <Link to={`/edit_campus/${this.props.match.params.campusId}`}><button>Edit Campus</button></Link>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    campus: state.campus,
  }
}
const mapDispatchToProps = (dispatch, ownProps)=>{
  return {
    goFetchCampus:  (id) => dispatch(getCampusThunk(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus)


