import React from 'react'
import {connect} from 'react-redux'
import {addAStudentThunk, deleteAStudentThunk} from '../reducers/index'
import { Link } from 'react-router-dom';

function AllStudents (props){
  return (
    <div>
      <h4>All Students</h4>
      <ul>
        {
          props.students && props.students.map(student=>{
            return (
              <li key={student.id}>
                <Link to={`/students/${student.id}`} >{student.name}</Link>
                <button onClick={(event)=>{props.deleteStudent(student.id)}}>X</button>
              </li>
            )
          })
        }
      </ul>
      <form onSubmit={props.handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" name="name" />
        </div>
        <div>
          <label>Phone: </label>
          <input type="number" name="phone"/>
        </div>
        <div>
          <label>Email: </label>
          <input type="email" name="email"/>
        </div>
        <select name="campus">
          {
            props.campuses.map(campus=> {
              return (
                <option key={campus.id} value={campus.id}>{campus.name}</option>
              )
            })
          }
        </select>
        <button>Add a student</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state)=>{
  return {
    students: state.students,
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch, ownProps)=>{
  return {
    handleSubmit:(event)=>{
      event.preventDefault();

      const newStudent = {
        name: event.target.name.value,
        phone: event.target.phone.value,
        email: event.target.email.value,
        campusId: event.target.campus.value
      }

      dispatch(addAStudentThunk(newStudent, ownProps.history))
    },

    deleteStudent: (id)=>{
      dispatch(deleteAStudentThunk(id))
    }
  }
}




const students = connect(mapStateToProps, mapDispatchToProps)(AllStudents)

export default students

