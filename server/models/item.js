const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    createdBy: {type: String},
    companionId: {type: String},
    title: {type: String, required: true, minlength: 5},
    description: {type: String, required: true, minlength: 10},
    status: {type: String, required: true}
}, {timestamps: true});

const Item = mongoose.model('Item', itemSchema);