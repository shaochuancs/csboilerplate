/**
 * Created by cshao on 1/12/16.
 */

"use strict";

var db = require('./db');
var md5 = require('md5');

var ObjectID = require('mongodb').ObjectID;

exports.getUserByLoginInfo = function(email, password, callback) {
  db.find(db.COLLECTION.USER, {
    email: email,
    password: md5(password)
  }, function(users) {
    var user = users ? users[0] : null;
    callback(user);
  });
};

exports.addUser = function(email, password, callback) {
  db.insertIfNotExist(db.COLLECTION.USER, {
    email: email
  }, {
    email: email,
    password: md5(password)
  }, function(result) {
    callback(result);
  });
};

exports.changeUserPassword = function(id, changePasswordInfo, callback) {
  db.updateOne(db.COLLECTION.USER, {
    _id: ObjectID.createFromHexString(id),
    password : md5(changePasswordInfo.oldPassword)
  },{
    $set: {
      password: md5(changePasswordInfo.newPassword)
    }
  }, null, function(result) {
    var res = result.result.nModified;
    if(res) {
      callback(res);
    } else {
      callback("ERROR_PASSWORD");
    }
  });
};

