
fs = require('fs')
path = require('path')
child_process = require('child_process')
exec = child_process.exec
spawn = child_process.spawn

less_dir = "views/less"
less_srcs = [ "index.less", "resume.less" ]
styles_dir = "static/styles"

option '-x', '--compress', 'compress compiled code'

task 'css', 'build css from less bootstrap', (options) ->
  fs.mkdir styles_dir
  for src in less_srcs
    fname = path.basename src, '.less'
    lessc = "lessc"
    if fs.existsSync "./node_modules/.bin/lessc"
      lessc = "./node_modules/.bin/lessc"
    command = "#{lessc} #{less_dir}/#{src} #{styles_dir}/#{fname}.css"
    console.info command
    exec command, (err, stdo, stde) ->
      console.error err, stde, stdo if err != null
    if options.compress
      command = "#{lessc} --compress #{less_dir}/#{src} #{styles_dir}/#{fname}.min.css"
      console.info command
      exec command, (err, stdo, stde) ->
        console.error err, stde, stdo if err != null

task 'deploy', "deploy app to heroku", (options) ->
  git = spawn "git", [ "push", "heroku", "master" ]
  git.stdout.on "data", (buf) ->
    console.log String(buf)
  git.stderr.on "data", (buf) ->
    console.error String(buf)
  git.on "exit", (excode) ->
    console.error "Error in git process" if excode != 0
    heroku = spawn "heroku", [ "run", "./node_modules/.bin/cake css" ]
    heroku.stdout.on "data", (buf) ->
      console.log String(buf)
    heroku.stderr.on "data", (buf) ->
      console.error String(buf)
    heroku.on "exit", (excode) ->
      console.error "Error in heroku process" if excode != 0
