/**
 * Created by cshao on 1/20/16.
 */

"use strict";

var app = require('common/baseApp');
var api = require('common/api');
require('common/service/utils-service');

app.controller('RegisterCtrl', function($scope, $http, $timeout) {
  $scope.formInfo = {
    isSubmitting: false,
    buttonText: '注册',
    errorMsg: ''
  };
  function hideErrorMsgLater() {
    $timeout(function() {
      $scope.formInfo.errorMsg = '';
    }, 2000);
  }

  $scope.register = function() {
    if (!this.registerForm.$valid) {
      if (this.registerForm.email.$error.required) {
        $scope.formInfo.errorMsg = '请输入邮箱';
      } else if (this.registerForm.email.$error.email) {
        $scope.formInfo.errorMsg = '请输入正确的邮箱地址';
      } else if (this.registerForm.password.$error.required) {
        $scope.formInfo.errorMsg = '请输入密码';
      } else if (this.registerForm.realname.$error.required) {
        $scope.formInfo.errorMsg = '请输入真实姓名';
      }
      hideErrorMsgLater();
      return;
    }

    $scope.formInfo = {
      isSubmitting: true,
      buttonText: '注册中...',
      errorMsg: ''
    };
    $http.post(api.REGISTER, {
      email: $scope.email,
      password: $scope.password
    }).success(function() {
      showErrorMsg('注册成功!请等待管理员激活。');
    }).error(function(res) {
      showErrorMsg(res.msg);
    });

    function showErrorMsg(msg) {
      $scope.formInfo = {
        isSubmitting: false,
        buttonText: '注册',
        errorMsg: msg
      };
      hideErrorMsgLater();
    }
  };
});