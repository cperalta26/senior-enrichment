const campusRouter = require('express').Router();
const Campus = require('../../db/models/Campus');
const Students = require('../../db/models/Students');

module.exports = campusRouter;

//"/api/campus"


campusRouter.get('/', (req, res, next)=>{
  Campus.findAll({ include: [ Students ] })
    .then(campuses=>res.json(campuses))
    .catch(next);
})

campusRouter.post('/', (req, res, next)=>{
  Campus.create(req.body)
    .then(newCampus=>{
      res.status(201).json(newCampus)
    })
    .catch(next);
})


campusRouter.get('/:campusId', function (req, res, next) {
    Campus.findAll({
      where: {
        id: req.params.campusId
      },
      include: [ Students ]
    })
    .then(
      campus=>{
        if(!campus){
          const error = new Error('Campus Not Found')
          error.status = 404;
          throw  error
        }else res.json(campus[0])
    })
    .catch(next)
});

campusRouter.put('/:campusId', function (req, res, next) {
    Campus.findById(req.params.campusId)
      .then(campusToUpdate=>{
        if(!campusToUpdate) {
          const error = new Error('Campus Not Found')
          error.status = 404;
          throw  error
        }
        else campusToUpdate.update(req.body)
      })
      .then(updatedCampus=>res.json(updatedCampus))
      .catch(next);

});

campusRouter.delete('/', function (req, res, next) {
    Campus.findById(req.body.id)
      .then(campusToDelete=>campusToDelete.destroy())
      .then(res.status(204).send('Campus deleted'))
      .catch(next);
});



