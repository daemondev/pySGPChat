
var gulp = require('gulp');
var gulpBrowser = require("gulp-browser");
var reactify = require('reactify');
var del = require('del');
var size = require('gulp-size');
var plumber = require('gulp-plumber');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify-es').default;
var pump = require('pump');
var strip = require('gulp-strip-comments');
var runSequence = require("run-sequence");
var autoprefixer = require("gulp-autoprefixer");
var notify = require("gulp-notify");
var gutil = require("gulp-util");
var jshint = require("gulp-jshint");
var jsxhint = require("gulp-jsxhint");
var spawn = require('child_process').spawn;
var data = require('gulp-data');

var jsxFilesDir = './dev/jsx/*.js';
var jsOutPutDir = './lib/static/js/chat';

var cssFilesDir = './dev/css/chat/*.css';
var cssOutPutDir = './lib/static/css/chat';
var cssFile = './lib/static/css/chat/chatCORS.css';
var jsFile = './lib/static/js/chat/chatCORS.js';
var p;

gulp.task('del', function () {
  return del([jsOutPutDir]);
});

gulp.task('gulp-reload', function(){
    if(p) p.kill();
    p = spawn(process.argv[0],[process.argv[1]],{stdio: 'inherit'});
    process.exit();
});

gulp.task('watcher', function(){
    return gulp.src('dev/gulpfile.js')
        .pipe(strip())
        .pipe(gulp.dest('.'))
});

var __filenameTasks = ['default'];
var watcher = gulp.watch(__filename).once('change', function(){
    watcher.removeAllListeners();
    watcher.end(); 
    delete require.cache[__filename];
    require(__filename);
    process.removeAllListeners();
    process.nextTick(function(){
        gulp.start(__filenameTasks);
        notify({ title: "GULP RELOADING!!!", message: "GULP RELOADED and READY!!! ("+ "ok" +")." }).write("");
    });
});


var css = 0, js = 0;
var date = new Date();
var time = date.toLocaleString().substr(-8,8);
date = date.toJSON().slice(0,10).replace(/-/,'/');


gulp.task('default', function () {
    console.log("\n\t\t + ------------- +\n\t\t | GULP READY!!! |\n\t\t + _____________ + [> by @daemonDEV <] "+ date + " | " + time +" [>\n\t\t ==============================================================\n") ;
    gulp.watch(jsxFilesDir, ['transformJSAndDist']);
    gulp.watch(cssFilesDir, ['compressCss']);
    gulp.watch('dev/gulpfile.js', ['watcher']);
    gulp.watch('app.py', ['app']);
    notify({ title: "GULP STARTED!!!", message: "GULP UP and READY!!! ("+ "ok" +")." }).write("");
});

gulp.task('app', function(){
    return gulp.src("app.py").
        pipe(notify({title:"MAIN FILE: [" + "app.py" + "] RELOADING SERVER" , message:"\r\tnapp.py RELOADING SERVER!!!\r"}));
});

gulp.task('transferCss', function(){
    css++;
    console.log("\n\t + ----------------- +\n\t | BEGIN transferCss |\n\t + _________________ +(by @daemonDEV) <] "+ date + " | " + time +" [> ("+ css +")\n\t =====================================================================\n") ;
    var stream = gulp.src(cssFilesDir)
        .pipe(strip.text({trim:true}))
        .pipe(autoprefixer())
        .pipe(gulp.dest(cssOutPutDir))
        .pipe(size())
    return stream;
});

gulp.task('compressCss', ["transferCss"], function(){
    console.log("### BEGIN compressCss");
    var stream = gulp.src(cssFile)
        .pipe(cssnano())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest(cssOutPutDir))
        .pipe(size())
        .pipe(notify({ title: "GULP TASK > " + this.seq.slice(-1)[0] + " <", message: ">> compressCss SUCCESS!!! ("+ css +")" }))
    return stream;
});

gulp.task('delJSFile', function () {
    return del([jsFile]);
});

function pumpCb(name) {
    return function(err){
        if (err) {
            console.log('GULP-Error: ', err.toString());
            runSequence('del');
            notify({ title: "GULP ERROR in TASK > (" + name + ")", message: "ERROR in PROCESS!!! (" + err.message + ") - ("+ "fail" +")" }).write(err);
        }

        this.emit('end');
    }
}
var origSrc = gulp.src;
gulp.src = function () {
    return fixPipe(origSrc.apply(this, arguments));
};
function fixPipe(stream) {
    var origPipe = stream.pipe;
    stream.pipe = function (dest) {
        arguments[0] = dest.on('error', function (error) {
            var nextStreams = dest._nextStreams;
            if (nextStreams) {
                nextStreams.forEach(function (nextStream) {
                    nextStream.emit('error', error);
                });
            } else if (dest.listeners('error').length === 1) {
                throw error;
            }
        });
        var nextStream = fixPipe(origPipe.apply(this, arguments));
        (this._nextStreams || (this._nextStreams = [])).push(nextStream);
        return nextStream;
    };
    return stream;
}  


function plumberErrorHandler(taskName, d){
    return function(err) {
            if(!d){
                notify.onError({
                    title: "GULP ERROR IN > " + taskName,
                    message:  err.toString()
                })(err);

                gutil.log(gutil.colors.yellow("Error: "));
                gutil.beep(3);

                d=true;
            }

        }}

gulp.task('transform', function () {
    js++;
    console.log("\n### BEGIN transform ("+ js +")\n");
    console.log("\n\t + --------------- +\n\t | BEGIN transform |\n\t + _______________ +(by @daemonDEV) <] "+ date + " | " + time +" [> ("+ js +")\n\t ===================================================================\n") ;
    var d = false;
    var taskName = this.seq.slice(-1)[0];
    var stream = gulp.src(jsxFilesDir)
        .pipe(plumber({ errorHandler: plumberErrorHandler(taskName, d) }))
        .pipe(gulpBrowser.browserify({transform: ['reactify']}))
        .pipe(gulp.dest(jsOutPutDir))
        .on('error', pumpCb(taskName))
        .pipe(strip())
        .pipe(gulp.dest(jsOutPutDir))
        .pipe(size());

    return stream;
});



gulp.task('transformJS', function(pumpCb){
    pump([
        gulp.src(jsxFilesDir)
        ,plumber()
        ,gulpBrowser.browserify({transform: ['reactify']})
        ,gulp.dest(jsOutPutDir)
        ,size()
    ], pumpCb);

});

var myNotifier = notify.withReporter(function (options, callback){
    notify({ title: options.tittle  , message:  options.message }).write("");
    gutil.beep();
    callback();
});

function jshintNotifier(file){
    if (file.jshint.success) {
    }

    var errors = file.jshint.results.map(function (data) {
        if (data.error) {
            return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        }
    }).join("\n");
    return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
}

gulp.task('transformJSAndDist', ['transform'], function (cb) {
    console.log("### BEGIN transformJSAndDist");
    pump([
        gulp.src(jsFile),
        uglify(),
        rename({suffix:'.min'}),
        gulp.dest(jsOutPutDir),
        myNotifier({tittle:"GULP TASK > " + this.seq.slice(-1)[0] + " <", message: "transformJSAndDist SUCCESS!!! ("+ js +")" })
    ], cb);
});


gulp.task('prod', function(){
    runSequence('compressCss','transformJSAndDist');
});

