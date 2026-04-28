const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose')

class CourseController {
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
    .then(course => 
      res.render('courses/show', { course: mongooseToObject(course) })
    )
    .catch(next);
  }

  // [GET] /courses/create
  create(req, res, next) {
    res.render('courses/create')
  }

  // [GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
    .then(course => res.render('courses/edit', {
      course: mongooseToObject(course)
    }))
    .catch(next)
  }

  // [POST] /courses/store
  store(req, res, next) {
    const formData = req.body
    req.body.image = req.body.image
    const course = new Course(formData)
    course.save()
    .then(() => res.redirect(`/home`))
    .catch()
  }

  // [PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
    .then(() => res.redirect('/me/stored/courses'))
    .catch(next)
  }
}

module.exports = new CourseController();
