var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CapillarySchema   = new Schema({
	title: String,
    platform:String,
    score:Number,
    genre:String,
    editors_choice:String
});

module.exports = mongoose.model('game', CapillarySchema);