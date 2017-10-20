import { combineReducers } from 'redux'
import {BrowserRouter} from 'react-router-dom'
import axios from 'axios'

const initialState = {
  students: [],
  student: [],
  campuses: [],
  campus: []
}

const GET_ALLSTUDENTS = 'GET_ALLSTUDENTS'
const getAllStudents = (students)=>{
  return {type: GET_ALLSTUDENTS, students}
}

const GET_STUDENT = 'GET_STUDENT'
const getStudent =  (student)=> {
  return {type: GET_STUDENT, student}
}

const ADD_A_STUDENT = 'ADD_A_STUDENT'
const addAStudent = (student)=> {
  return {type: ADD_A_STUDENT, student}
}

const DELETE_A_STUDENT = 'DELETE_A_STUDENT'
const deleteAStudent = (studentId) => {
  return {type: DELETE_A_STUDENT, studentId}
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
const UPDATE_A_CAMPUS = 'UPDATE_A_CAMPUS'
const updateACampus = (campus) => {
  return {type: UPDATE_A_CAMPUS, campus}
}
const DELETE_A_CAMPUS = 'DELETE_A_CAMPUS'
const deleteACampus = (campusId) => {
  return {type: DELETE_A_CAMPUS, campusId}
}

export const getStudentsThunk = () =>(dispatch)=> {
  axios.get('/api/students')
    .then(res=>res.data)
    .then(students=> {
      dispatch(getAllStudents(students))
    })
    .catch(console.error.bind(console))
}

export const getStudentThunk = (id) =>(dispatch)=>{
  axios.get(`/api/students/${id}`)
    .then(res=>res.data)
    .then(singleStudent=>{
      dispatch(getStudent(singleStudent))
    })
    .catch(console.error.bind(console))
}

export const addAStudentThunk = (newStudent, history) => (dispatch) => {
  axios.post('/api/students', newStudent )
    .then(res=>res.data)
    .then(createdStudent=>{
      dispatch(addAStudent(createdStudent))
      history.push(`/students/${createdStudent.id}`)
    })
    .catch(console.error.bind(console))
}

export const deleteAStudentThunk = (id)=>(dispatch) => {
  dispatch(deleteAStudent(id))
  axios.delete(`/api/students/${id}`)
    .catch(console.error.bind(console))
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

export const addACampusThunk = (newCampus, history) => (dispatch) => {
  axios.post('/api/campuses', newCampus )
    .then(res=>res.data)
    .then(createdCampus=>{
      dispatch(addACampus(createdCampus))
      history.push(`/campuses/${createdCampus.id}`)
    })
    .catch(console.error.bind(console))
}
export const updateACampusThunk = (campusId, body, history) => (dispatch) => {
  axios.put(`/api/campuses/${campusId}`, body)
    .then(res=>res.data)
    .then(updatedCampus=>{
      dispatch(updateACampus(updatedCampus))
      history.push(`/students/${updatedCampus.id}`)
    })
    .catch(console.error.bind(console))
}
export const deleteACampusThunk = (id)=>(dispatch) => {
   dispatch(deleteACampus(id))
  axios.delete(`/api/campuses/${id}`)
    .catch(console.error.bind(console))
}

const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case GET_ALLSTUDENTS:
      return Object.assign({}, state, {students: action.students})

    case GET_STUDENT:
    return Object.assign({}, state, {student: action.student})

    case DELETE_A_STUDENT:
    return Object.assign({}, state, {students: state.students.filter(student=>student.id !== action.studentId)})

    case GET_ALLCAMPUSES:
      return Object.assign({}, state, {campuses: action.campuses})

    case GET_CAMPUS:
      return Object.assign({}, state, {campus: action.campus})

    case ADD_A_CAMPUS:
      return Object.assign({}, state, {campuses: [...state.campuses, action.campus]})

    case UPDATE_A_CAMPUS:
      return Object.assign({}, state, {campuses: state.campuses.map(
        campus=>{campus.id===action.campus.id ? action.campus : campus}
      )})

    case DELETE_A_CAMPUS:
      return Object.assign({}, state, {campuses: state.campuses.filter(campus=>campus.id !== action.campusId)})

    default:
      return state
  }
};

export default rootReducer
