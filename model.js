var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/livechatajax');

function validator(v) {
      return v.length > 0;
}

var Post = new mongoose.Schema({
        comment: { type: String, validate: [validator, "Empty Error"] }
      , name   : { type: String, validate: [validator, "Empty Error"] }
      , date   : { type: Date, default: Date.now }
});

exports.Post = db.model('Post', Post);
