module.exports = RxFacebook;

require('es6-promise').polyfill();
var Fetch = require('isomorphic-fetch');

var Rx = require('rx');

function RxFacebook() {
}

RxFacebook.Fetch = fetch;
function fetch(url, options) {
  return Rx.Observable.fromPromise(Fetch(url, options))
      .flatMap(function (response) { return Rx.Observable.fromPromise(response.json()); })
      .flatMap(function (json) {
        return Rx.Observable.concat(Rx.Observable.just(json), (json.paging && json.paging.next) ? fetch(json.paging.next, options) : Rx.Observable.empty());
      });
}

RxFacebook.Members = members;
function members(id, token) {
  var url = (token) ? `https://graph.facebook.com/v2.6/${id}/members?access_token=${token}` : `https://graph.facebook.com/v2.6/${id}/members`;
  return fetch(url).flatMap(function (json) { return Rx.Observable.from(json.data); });
}

RxFacebook.Get = get;
function get(id, token) {
  var url = (token) ? `https://graph.facebook.com/v2.6/${id}?access_token=${token}` : `https://graph.facebook.com/v2.6/${id}`;
  return fetch(url);
}
