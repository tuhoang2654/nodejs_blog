class NewsController {
  // [GET]
  index(req, res) {
    res.render('news');
  }

  show(req, res) {
    res.send('delails news');
  }
}

module.exports = new NewsController();
