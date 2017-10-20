import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCampusesThunk, addACampusThunk, deleteACampusThunk} from '../reducers/index'
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
                <button onClick={(event)=>{props.deleteCampus(campus.id)}}>X</button>
              </li>
            )
          })
        }
      </ul>
      <form onSubmit={props.handleSubmit} >
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

const mapStateToProps = (state)=>{
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch, ownProps)=>{
  return {
    handleSubmit:(event)=>{
      event.preventDefault();
      const newCampus = {
        name: event.target.name.value,
        phone: event.target.phone.value,
        address: event.target.address.value
      }
      dispatch(addACampusThunk(newCampus, ownProps.history))
    },
    deleteCampus: (id)=>{
      console.log(id)
      dispatch(deleteACampusThunk(id))
    }
  }
}

const campuses = connect(mapStateToProps, mapDispatchToProps)(AllCampuses)

export default campuses

