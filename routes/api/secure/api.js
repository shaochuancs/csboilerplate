/**
 * Created by cshao on 1/12/16.
 */

"use strict";

var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();

var userDAO = require('../../../utils/user-dao');
var utils = require('../../../utils/utils');

/**
 * Example for invoking DAO class.
 */
router.post('/change-password', function(req, res) {
  var param = {
    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword
  };
  userDAO.changeUserPassword(req.user.id, param, function(result) {
    if (result) {
      if (result === 'ERROR_PASSWORD') {
        res.status(403).json({
          msg: '当前密码输入错误!'
        });
        return;
      }
      res.status(200).end();
    } else {
      res.status(500).json({
        msg: '操作失败!'
      });
    }
  });
});

module.exports = router;