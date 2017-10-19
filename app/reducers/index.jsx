import { combineReducers } from 'redux'
import axios from 'axios'

const initialState = {
  students: [],
  campuses: [],
  campus: [],
}

const GET_ALLSTUDENTS = 'GET_ALLSTUDENTS'
const getAllStudents = ()=>{
  return {type: GET_ALLSTUDENTS, students}
}


const GET_ALLCAMPUSES = 'GET_ALLCAMPUSES'
const getAllCampuses = (campuses)=> {
  return {type: GET_ALLCAMPUSES, campuses}
}

const GET_CAMPUS = 'GET_CAMPUS'
const getCampus =  (campus)=> {
  return {type: GET_CAMPUS, campus}
}

const ADD_A_CAMPUS = 'ADD_A_CAMPUS'
const addACampus = (campus)=> {
  return {type: ADD_A_CAMPUS, campus}
}

export const getCampusesThunk = ()=>(dispatch)=> {
  axios.get('/api/campuses')
    .then(res=>res.data)
    .then(campuses=> {
      dispatch(getAllCampuses(campuses))
    })
    .catch(console.error.bind(console))
}

export const getCampusThunk = (id) =>(dispatch)=>{
  axios.get(`/api/campuses/${id}`)
    .then(res=>res.data)
    .then(singleCampus=>{
      dispatch(getCampus(singleCampus))
    })
    .catch(console.error.bind(console))
}

export const addACampusThunk = () => (dispatch) => {
  axios.post('/api/campuses')
    .then(res=>res.data)
    .then(createdCampus=>{
      dispatch(addACampus(createdCampus))
    })
    .catch(console.error.bind(console))
}

const rootReducer = /* eventually (if we modularize) equal to the return value of combineReducers*/function(state = initialState, action) {
  switch(action.type) {
    case GET_ALLSTUDENTS:
      return Object.assign({}, state, {students: action.students})

    case GET_ALLCAMPUSES:
      return Object.assign({}, state, {campuses: action.campuses})

    case GET_CAMPUS:
      return Object.assign({}, state, {campus: action.campus})

    case ADD_A_CAMPUS:
      return Object.assign({}, state, {campuses: [...state.campuses, action.campus]})

    default:
      return state
  }
};

export default rootReducer
