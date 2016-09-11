'use strict';

const angular = require('angular');
const listApp = angular.module('listApp');

listApp.controller('ListController', ['$log', '$http', ListController]);

function ListController($log, $http) {
  this.lists = [];
  let baseUrl = `${__API_URL__}/api/list`;
  let config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  this.createList = function(list) {
    $log.debug('listCtrl.createList');
    $http.post(baseUrl, list, config)
      .then(res => {
        $log.log('Success!', res.data);
        this.lists.push(res.data);
        $log.log('this.lists', this.lists);
      })
      .catch(err => {
        $log.log('Error:', err);
      });
  };

  this.getLists = function() {
    $http.get(baseUrl, config)
      .then((res) => {
        $log.log('Success!', res.data);
        res.data.forEach((list) => {
          this.lists.push(list);
        });
      })
      .catch((err) => {
        $log.log('Error: ', err);
      });
  };

  this.deleteList = function(id){
    $http.delete(baseUrl + '/' + id, config)
      .then((res)=>{
        let index = this.lists.findIndex((item)=>{
          return item._id === id;
        });
        this.lists.splice(index, 1);
        $log.log('Success!', res.data);
      })
      .catch((err)=>{
        alert('Opps... Something went wrong.');
        $log.log('Error', err);
      });
  };
}
