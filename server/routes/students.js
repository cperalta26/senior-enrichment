const studentRouter = require('express').Router();
const Students = require('../../db/models/Students')

module.exports = studentRouter;

//"/api/students"

studentRouter.get('/', (req, res, next)=>{
  Students.findAll()
    .then(students=>res.json(students))
    .catch(next);
})

studentRouter.post('/', (req, res, next)=>{

  // in the front have on student create page a dropdown (select with options being the exisiting campuses) and when you send a payload to this route make sure it has a campusId
  Students.create(req.body)  // can assume campusId is coming in to associate OR associate in the .then
    .then(newStudent=>{ // return newStudent.setCampus(req.body.campusId) and THEN return the 201
      res.status(201).json(newStudent)
    })
    .catch(next);
})


studentRouter.get('/:studentId', function (req, res, next) {
    Students.findById(req.params.studentId)
    .then(
      student=>{
        if(!student){
          const error = new Error('Student Not Found')
          error.status = 404;
          throw  error
        }else res.json(student)
    })
    .catch(next);
});

studentRouter.put('/:studentId', function (req, res, next) {
    Students.findById(req.params.studentId)
      .then(studentToUpdate=>{
        if(!studentToUpdate) {
          const error = new Error('Student Not Found')
          error.status = 404;
          throw  error
        }
        else studentToUpdate.update(req.body)
      })
      .then(updatedStudent=>res.json(updatedStudent))
      .catch(next);

});

studentRouter.delete('/:studentId', function (req, res, next) {
    Students.findById(req.params.studentId)
      .then(studentToDelete=>studentToDelete.destroy())
      .then(res.status(204).send('Student deleted'))
      .catch(next);
});
