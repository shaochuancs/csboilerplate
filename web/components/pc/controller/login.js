/**
 * Created by cshao on 1/11/16.
 */

"use strict";

var app = require('common/baseApp');
var api = require('common/api');
require('common/service/utils-service');

app.controller('LoginCtrl', function($scope, $http, $timeout, UtilsService) {
  $scope.formInfo = {
    isLogining: false,
    buttonText: '登录',
    errorMsg: ''
  };
  function hideErrorMsgLater() {
    $timeout(function() {
      $scope.formInfo.errorMsg = '';
    }, 2000);
  }

  $scope.login = function() {
    if (!this.loginForm.$valid) {
      if (this.loginForm.email.$error.required) {
        $scope.formInfo.errorMsg = '请输入登录邮箱';
      } else if (this.loginForm.email.$error.email) {
        $scope.formInfo.errorMsg = '请输入正确的邮箱地址';
      } else if (this.loginForm.password.$error.required) {
        $scope.formInfo.errorMsg = '请输入登录密码';
      }
      hideErrorMsgLater();
      return;
    }

    $scope.formInfo = {
      isLogining: true,
      buttonText: '登录中...',
      errorMsg: ''
    };
    $http.post(api.AUTHENTICATE, {
      email: $scope.email,
      password: $scope.password
    }).success(function() {
      var redirectUrl = UtilsService.decodeURL(UtilsService.getURLParams().redirectUrl);
      window.location = redirectUrl || '/secure/';
    }).error(function(res) {
      $scope.formInfo = {
        isLogining: false,
        buttonText: '登录',
        errorMsg: res.msg
      };
      hideErrorMsgLater();
    });
  };
});