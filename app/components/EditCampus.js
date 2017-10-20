import React from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'

function EditCampus(props) {
  const campusId = +props.match.params.campusId
  const currentCampus = props.campuses.find(campus=>campus.id===campusId)
  //props.campuses.find(campus=>campus.id===campusId)
  console.log(currentCampus)
  return (
    <div>
      <h1>Edit Campus

      </h1>
      <form onSubmit={}>
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
      <form>
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
              <button>X</button>
            </p>
          )
        })
      }
    </div>
  )
}

const mapStateToProps = (state)=>{
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch)=> {
  handleSubmit:(event)=>{
    event.preventDefault();
    const updatedCampus = {
      name: event.target.name.value,
      phone: event.target.phone.value,
      address: event.target.address.value
    }
    dispatch(addACampusThunk(newCampus, ownProps.history))
  }
}
const updatedCampus = connect(mapStateToProps)(EditCampus)

export default updatedCampus
