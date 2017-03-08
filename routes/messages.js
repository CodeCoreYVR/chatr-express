var express = require('express');
var router = express.Router();

// def index
//   render json: Message.all
// end

// def create
//   Message.create!(body: params[:body])
//   head :created
// end

// def destroy
//   Message.find(params[:id]).destroy!
//   head :ok
// end

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.delete('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
