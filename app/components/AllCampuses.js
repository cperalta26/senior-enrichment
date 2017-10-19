import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCampusesThunk} from '../reducers/index'
import { Link } from 'react-router-dom';

function AllCampuses (props){
  return (
    <div>
      <h4>Campuses</h4>
      <ul>
          {
          props.campuses && props.campuses.map(campus=>{
            return (
              <li key={campus.id}>
                <Link to={`/campuses/${campus.id}`} >{campus.name}</Link>
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
          <label>Address: </label>
          <input type="text" name="address"/>
        </div>
        <button>Add a campus</button>
      </form>
    </div>
  )
}

// <form className="form-inline">
// <label htmlFor="name">Your name:</label>
// <input
//   type="text"
//   name="name"
//   placeholder="Enter your name"
//   className="form-control"
//   onChange={handleChange}
//   value={name}
// />
// </form>

const mapStateToProps = (state)=>{
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch, ownProps)=>{
  return {
    handleSubmit:(event, newCampus)=>{
      event.preventDefault();
      const newCampus = {
        name: event.target.name.value
      }
      console.log(newCampus)
      // console.log(event.target.name.value)
      // console.log(event.target.phone.value)
      // console.log(event.target.address.value)
    }
  }
}

const campuses = connect(mapStateToProps, mapDispatchToProps)(AllCampuses)

export default campuses



// const mapDispatchToProps = function (dispatch, ownProps) {
//   return {
//     handleChange: function (event) {
//       dispatch(writeChannelName(event.target.value))
//     },
//     handleSubmit: function (event) {
//       dispatch(postChannel(event))
//     }
//   }
// }
