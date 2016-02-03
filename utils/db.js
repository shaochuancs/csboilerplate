/**
 * Created by cshao on 1/7/16.
 */

"use strict";

var debugServer = require('debug')('csboilerplate:server');

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/csboilerplate';

var utils = require('./utils');

MongoClient.connect(url, function(err, db) {
  if (err) {
    utils.debugDatabaseFailure('Connect');
    return;
  }
  module.db = db;
  debugServer("Connect to database successfully");
});

exports.COLLECTION = {
  USER: 'user'
};

exports.insert = function(collection, object, callback){
  module.db.collection(collection).insertOne(object, function(err, result) {
    if (err) {
      utils.debugDatabaseFailure('Insert', {
        collection: collection,
        object: object
      });
      callback(null);
    } else {
      callback(result);
    }
  });
};
exports.insertIfNotExist = function(collection, filter, object, callback) {
  exports.updateOne(collection, filter, {
    $setOnInsert: object
  }, {
    upsert: true
  }, function(result) {
    callback(result);
  });
};

exports.metaFind = function(collection, filter, projectRule, sortRule, callback) {
  module.db.collection(collection).find(filter, projectRule).sort(sortRule).toArray(function(err, docs) {
    if (err) {
      utils.debugDatabaseFailure('Find', {
        collection: collection,
        filter: filter,
        projectRule: projectRule,
        sortRule: sortRule
      });
      callback(null);
    } else {
      callback(docs);
    }
  });
};
exports.find = function(collection, filter, callback) {
  exports.metaFind(collection, filter, {}, null, callback);
};
exports.findAndProject = function(collection, filter, projectRule, callback) {
  exports.metaFind(collection, filter, projectRule, null, callback);
};
exports.findAll = function(collection, callback) {
  exports.metaFind(collection, null, {}, null, callback);
};
exports.findByID = function(collection, id, callback) {
  module.db.collection(collection).find({
    _id: ObjectID.createFromHexString(id)
  }).toArray(function(err, docs) {
      if (err) {
        utils.debugDatabaseFailure('FindByID', {
          collection: collection,
          id: id
        });
        callback(null);
      } else {
        callback(docs[0]);
      }
    });
};

exports.updateOne = function(collection, filter, updateRule, options, callback) {
  module.db.collection(collection).updateOne(filter, updateRule, options, function(err, result) {
    if (err) {
      utils.debugDatabaseFailure('UpdateOne', {
        collection: collection,
        filter: filter,
        updateRule: updateRule
      });
      callback(null);
    } else {
      callback(result);
    }
  });
};

exports.delete = function(collection, filter, callback) {
  module.db.collection(collection).deleteOne(filter, function(err, result) {
    if (err) {
      utils.debugDatabaseFailure('Delete', {
        collection: collection,
        filter: filter
      });
      callback(null);
    } else {
      callback(result);
    }
  });
};