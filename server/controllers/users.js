const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const User = mongoose.model('User');
const Item = mongoose.model('Item');

module.exports = {
    addItem: function(req, res){
        User.find({$or: [{_id: req.session.user._id}, {_id: req.body.companionId}]}, function(err, users){
            for(let user of users){
                if(user._id = req.session.user._id){
                    const item = new Item({
                        _user: req.session.user._id,
                        createdBy: req.session.user.first_name,
                        companionId: req.body.companionId,
                        title: req.body.title,
                        description: req.body.description,
                        status: 'Pending'
                    });

                    item.save(function(err){
                        if(err){
                            console.log(err)
                        }else{
                            user.items.push(item);
                            user.save(function(err){
                                if(err){
                                    console.log(err);
                                }else{
                                    console.log('Successfully added item.')
                                }
                            })
                        }
                    })
                } else{
                    const item = new Item({
                        _user: user.body.companionId,
                        createdBy: req.session.user.first_name,
                        companionId: req.session.user.id,
                        title: req.body.title,
                        description: req.body.description,
                        status: 'Pending'
                    });

                    item.save(function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            user.items.push(item);
                            user.save(function (err) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('Successfully added item.')
                                }
                            })
                        }
                    })
                }
            }
            res.json('All items added.')
        })
    },
    current: function(req, res) {
        User.findOne({ _id: req.session.user._id })
            .populate('items')
            .exec(function (err, user) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(user);
                }
            })
    },
    all: function (req, res) {
        User.find({}, function (err, users) {
            if (err) {
                console.log(err);
            } else {
                res.json(users);
            }
        })
    },
    changeStatus: function(req, res){
        Item.update({_id: req.body.index}, {status: req.body.status}, function(err){
            if(err){
                console.log(err);
            }else{
                console.log('Successfully updated the status.');
            }
        })
    },
    getUser: function(req, res){
        User.findOne({_id: req.params.id})
            .populate('items')
            .exec(function(err, user){
                if(err){
                    console.log(err);
                }else{
                    res.json(user);
                }
            })
    }
}