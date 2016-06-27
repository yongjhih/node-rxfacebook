#!/usr/bin/env node

var RxFacebook = require('./index');

const program = require('commander');
program
  .option('-i, --id [id]', 'get for id')
  .option('--members <group-id>', 'get members')
  .option('-t --token <token>', 'access token')
  .parse(process.argv);

if (program.members && program.token) {
  RxFacebook.Members(program.members, program.token)
    .take(32)
    .map(function (user) { return user.id; })
    .subscribe(function (v) { console.log(v); }, function (e) {
      console.log(e);
    });
} else if (program.id && program.token) {
  RxFacebook.Get(program.id, program.token)
    .subscribe(function (v) { console.log(v); }, function (e) {
      console.log(e);
    });
} else {
  program.outputHelp();
}

/* vim: set sw=2: */
