import React from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {addAStudentThunk, deleteAStudentThunk, updateACampusThunk} from '../reducers/index'


function EditCampus(props) {
  const campusId = +props.match.params.campusId
  const currentCampus = props.campuses.find(campus=>campus.id===campusId)

  return (
    <div>
      <h1>Edit Campus

      </h1>
      <form onSubmit={props.UpdateCampus}>
        <div>
          <label>Campus Name: </label>
          <input type="text" name="name" />
        </div>
        <div>
          <label>Phone: </label>
          <input type="number" name="phone"/>
        </div>
        <div>
          <label>Address: </label>
          <input type="text" name="address"/>
        </div>
        <button>Submit changes</button>
      </form>
      <hr/>
      <form onSubmit={props.SubmitStudent}>
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
        <button>Add a Student</button>
      </form>
      <hr/>
      <h5>Delete a Student</h5>
      {
        currentCampus && currentCampus.students.map(student=>{
          return (
            <p key={student.id}>
              <Link to={`/students/${student.id}`}> {student.name}</Link>
              <button onClick={(event)=>{props.deleteStudent(student.id)}}>X</button>
            </p>
          )
        })
      }
    </div>
  )
}

const mapStateToProps = (state)=>{
  return {
    campuses: state.campuses,
    students: state.students
  }
}

const mapDispatchToProps = (dispatch, ownProps)=> {

  return {
    UpdateCampus:(event)=> {
      event.preventDefault
      const currentCampus = +ownProps.match.params.campusId
      const updatedCampus = {
        name: event.target.name.value,
        phone: event.target.phone.value,
        address: event.target.address.value
      }
      dispatch(updateACampusThunk(currentCampus, updatedCampus, ownProps.history))
    },
    SubmitStudent:(event)=>{
      const currentCampus = +ownProps.match.params.campusId
      const newStudent = {
        name: event.target.name.value,
        phone: event.target.phone.value,
        email: event.target.email.value,
        campusId: currentCampus
      }
      dispatch(addAStudentThunk(newStudent, ownProps.history))
    },
    deleteStudent: (id)=>{
      const currentCampus = +ownProps.match.params.campusId
      dispatch(deleteAStudentThunk(id))
      ownProps.history.push(`/campuses/${currentCampus}`)
    }
  }
}
const updatedCampus = connect(mapStateToProps, mapDispatchToProps)(EditCampus)

export default updatedCampus
