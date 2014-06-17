fs = require('fs')
path = require('path')
child_process = require('child_process')
exec = child_process.exec
spawn = child_process.spawn

s3 = require('s3')

less_dir = "views/less"
less_srcs = [ "index.less", "resume.less", "malk-news.less", "sf.less" ]
styles_dir = "static/styles"
lessc = "lessc"

option '-x', '--compress', 'compress compiled code'

task 'css', 'build css from less bootstrap', (options) ->
  unless fs.existsSync styles_dir
    fs.mkdirSync styles_dir
  for src in less_srcs
    fname = path.basename src, '.less'
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
  git.stdout.pipe process.stdout
  git.stderr.pipe process.stderr
  git.on "exit", (excode) ->
    console.error "Error in git process" if excode != 0
    invoke 'publish'

task 'publish', "publish static/img on s3", (options) ->
  baseLocal = "static/img"
  lastpushed = new Date 0
  if fs.existsSync path.join(baseLocal, ignoreFiles[0])
    lastpushed = new Date fs.readFileSync path.join(baseLocal, ignoreFiles[0])
  files = allFilesModAfter baseLocal, lastpushed
  if files.length <= 0
    console.log "--- No update needed ---"
    return
  # credentials needed:
  #   - key
  #   - secret
  #   - bucket
  aws = JSON.parse fs.readFileSync("lib/aws.json")
  aws['key'] ?= process.env['AWS_ACCESS_KEY_ID']
  aws['secret'] ?= process.env['AWS_SECRET_ACCESS_KEY']
  s3client = s3.createClient(aws)
  console.log "#{files.length} files to upload"
  next = () ->
    if files.length > 0
      f = files.pop()
      uploader = s3client.upload path.join(baseLocal, f), f
      uploader.on 'error', (err) ->
        console.error "!: #{f} | #{err}"
        next()
      uploader.on 'progress', (amountDone, amountTotal) ->
        true
      uploader.on 'end', () ->
        console.log "+: #{f}"
        next()
    else
      now = new Date
      fs.writeFileSync path.join(baseLocal, ignoreFiles[0]), now.toISOString()
      console.log "--- Finished pushing to s3 ---"
  next()

# keep the order stable, 'publish' depends on it
ignoreFiles = [
  "lastpushed.txt"
  ".DS_Store"
  ".gitignore"
]

allFilesModAfter = (base, after) ->
  contained = fs.readdirSync(base)
  files = contained.filter (f) ->
    info = fs.statSync path.join base, f
    info.isFile() and info.ctime > after and f not in ignoreFiles
  dirs = contained.filter (f) ->
    info = fs.statSync path.join base, f
    info.isDirectory()
  dirs.forEach (d) ->
    within = allFilesModAfter path.join(base, d), after
    files.push.apply files, within.map (w) ->
      path.join d, w
  files
