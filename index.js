'use strict';
//var request = require('request');
//var request = require('request-promise');
require('es6-promise').polyfill();
require('isomorphic-fetch');
//var rxfetch = require('rx-fetch');
//var rxfetch = require('rxjs-fetch');
var Rx = require('rx');

function rxfetch(url) {
  return Rx.Observable.create(function (observer) {
    fetch(url).then(function (res) { return res.json(); })
      .then(function (json) {
        //console.log(json);
        observer.onNext(json);
        observer.onCompleted();
      }).catch(observer.onError);
  });
}

function rxFacebook(url) {
  //return Rx.Observable.fromPromise(fetch(url)).flatMap(function (json) {
  return rxfetch(url).flatMap(function (json) {
    return Rx.Observable.fromArray(json.data);
  });
}

/*
function rxFacebooks(url) {
  return rxfetch(url).flatMap()
    .flatMap(function (json) {
      return Rx.Observable.fromArray(json.data);
    });
}
*/


//const program = require('commander');
//program.option('--get [url]', 'get url');

//program.parse(process.argv);

const url = process.env.GET_URL;

console.log(url);
rxFacebook(url)
  .map(function (user) { return user.id; })
  .subscribe(function (v) { console.log(v); });
