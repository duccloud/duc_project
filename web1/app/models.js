var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Contact = new Schema({
    email:      { type: String },
    name: {
        first:  { type: String },
        last:   { type: String }
    },
    phone:      { type: String },
    gravatar:   { type: String }
});

var site_item = new Schema({
    name: {type: String},
    cover: {type: String},
    href: {type: String},
    source: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = {
    Contact: mongoose.model('Contact', Contact),
    site_item: mongoose.model('site_item', site_item)
};
