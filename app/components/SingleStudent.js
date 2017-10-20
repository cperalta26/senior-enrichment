import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCampusesThunk, getCampusThunk, getStudentThunk} from '../reducers/index'
import { Link } from 'react-router-dom';

//students.id === +this.props.match.params.studentId
class SingleStudent extends Component {
  // constructor() {
  //   super()
  //   this.getCampus = this.getCampus.bind(this)
  // }
  componentDidMount() {
    this.props.goFetchStudent(+this.props.match.params.studentId)
  }

  render() {
    const campusId=this.props.student.campusId
    const campus = this.props.campuses.filter(campus=>campus.id===campusId)

    return (
      <div>
          <h4>{this.props.student.name}</h4>
          <h5>{this.props.student.phone}</h5>
          <h6>{this.props.student.email}</h6>
          <Link to={`/campuses/${campusId}`}><h6>{campus.length?campus[0].name:''}</h6></Link>
        <ul>
        {
          // this.props.campus.students && this.props.campus.students.map(student=>{
          //   return (
          //     <li key={student.id}>
          //       <Link to={`/students/${student.id}`}> {student.name}</Link>
          //       <button>X</button>
          //     </li>
          //   )
          // })
        }
        </ul>
        <Link to='/edit_campus'><button>Edit Student</button></Link>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    student: state.student,
    campuses: state.campuses
  }
}
const mapDispatchToProps = (dispatch, ownProps)=>{
  return {
    goFetchStudent:  (id) => dispatch(getStudentThunk(id)),
    getCampus: () => {
      // const campusId = ownProps.student.campusId
      console.log('this props ', ownProps.match.params(studentId))
      // const campus = ownProps.campuses.find(campus=>campus.id===campusId)
      // console.log('this is the campus ', campus)
    }
  }
}

const students = connect(mapStateToProps, mapDispatchToProps)(SingleStudent)

export default students

