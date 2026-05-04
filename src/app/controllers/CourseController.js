const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose')

class CourseController {
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then(course => {
        if (!course) return res.status(404).send('Course not found')
        res.render('courses/show', {
          course: mongooseToObject(course)
        })
      })
  }

  // [GET] /courses/create
  create(req, res, next) {
    res.render('courses/create')
  }

  // [GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then(course => {
        if (!course) return res.status(404).send('Course not found')
        res.render('courses/edit', {
          course: mongooseToObject(course)
        })
      })
  }

  // [POST] /courses/store
  store(req, res, next) {
    const formData = req.body
    const course = new Course(formData)
    course.save()
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next)
  }

  // [PUT] /courses/:id
  update(req, res, next) {
    Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next)
  }

  // [DELETE] /courses/:id
  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next)
  }

  // [DELETE] /courses/:id/forceDelete
  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next)
  }

  // [PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
    .then(() => res.redirect('/me/trash/courses'))
    .catch(next)
  }
}

module.exports = new CourseController();
