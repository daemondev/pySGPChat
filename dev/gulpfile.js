//#-------------------------------------------------- BEGIN [gulp file for SGP Project] - (25-10-2017 - 16:51:17) {{
//npm i -g gulp@git://github.com/gulpjs/gulp.git

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
//var cleanCSS = require("gulp-clean-css");
var runSequence = require("run-sequence");
var autoprefixer = require("gulp-autoprefixer");
var notify = require("gulp-notify");
var gutil = require("gulp-util");
var jshint = require("gulp-jshint");
var jsxhint = require("gulp-jsxhint");
var spawn = require('child_process').spawn;
//var newer = require('gulp-newer');
var data = require('gulp-data');
//var restart = require('gulp-restart');
//var autoreload = require("autoreload-gulp");
//const babel = require('gulp-babel');

var jsxFilesDir = './dev/jsx/*.js';
var jsOutPutDir = './static/js/chat';

var cssFilesDir = './dev/css/chat/*.css';
var cssOutPutDir = './static/css/chat';
var cssFile = './static/css/chat/chatCORS.css';
var jsFile = './static/js/chat/chatCORS.js';
var p;

// tasks
gulp.task('del', function () {
  return del([jsOutPutDir]);
});

//#-------------------------------------------------- BEGIN [watcher] - (30-11-2017 - 17:34:45) {{
gulp.task('gulp-reload', function(){
    if(p) p.kill();
    p = spawn(process.argv[0],[process.argv[1]],{stdio: 'inherit'});
    process.exit();
});

gulp.task('watcher', function(){
    return gulp.src('dev/gulpfile.js')
        .pipe(strip())
        //.pipe(newer('gulpfile.js'))
        .pipe(gulp.dest('.'))
        /*
        .pipe(data( function(file) {
            console.log("\n  gulpfile.js changed! Restarting gulp...\n  #######################################\n") ;
            if(p) p.kill();
            p = spawn(process.argv[0],[process.argv[1]],{stdio: 'inherit'});
            return process.exit() ;
        })); /**/
});

var __filenameTasks = ['default'];
var watcher = gulp.watch(__filename).once('change', function(){
    watcher.removeAllListeners();
    watcher.end(); // we haven't re-required the file yet
                 // so is the old watcher
    delete require.cache[__filename];
    require(__filename);
    process.removeAllListeners();
    process.nextTick(function(){
        gulp.start(__filenameTasks);
        notify({ title: "GULP RELOADING!!!", message: "GULP RELOADED and READY!!! ("+ "ok" +")." }).write("");
    });
});

//(function() { var d = new Date(); return new Date(d - d % 86400000); })()

var css = 0, js = 0;
var date = new Date();
var time = date.toLocaleString().substr(-8,8);
date = date.toJSON().slice(0,10).replace(/-/,'/');

//#-------------------------------------------------- END   [watcher] - (30-11-2017 - 17:34:45) }}

//gulp.task('default', ['del'], function () {
gulp.task('default', function () {
    console.log("\n\t\t + ------------- +\n\t\t | GULP READY!!! |\n\t\t + _____________ + [> by @daemonDEV <] "+ date + " | " + time +" [>\n\t\t ==============================================================\n") ;
    //gulp.start('transformJSAndDist');
    gulp.watch(jsxFilesDir, ['transformJSAndDist']);
    gulp.watch(cssFilesDir, ['compressCss']);
    //gulp.watch('gulpfile.js', process.exit);
    //gulp.watch('dev/gulpfile.js', ['gulp-reload']);
    gulp.watch('dev/gulpfile.js', ['watcher']);
    gulp.watch('app.py', ['app']);
    notify({ title: "GULP STARTED!!!", message: "GULP UP and READY!!! ("+ "ok" +")." }).write("");
});

//##############################################################################
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
            //runSequence('delJSFile');
            runSequence('del');
            notify({ title: "GULP ERROR in TASK > (" + name + ")", message: "ERROR in PROCESS!!! (" + err.message + ") - ("+ "fail" +")" }).write(err);
        }

        this.emit('end');
    }
}
///*
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
}  /**/


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
    /*
    var s = strip({});
    s.on('error',function(e){
        console.log(e);
        s.end();
    }); /**/
    var d = false;
    var taskName = this.seq.slice(-1)[0];
    var stream = gulp.src(jsxFilesDir)
        .pipe(plumber({ errorHandler: plumberErrorHandler(taskName, d) }))
        .pipe(gulpBrowser.browserify({transform: ['reactify']}))
        //.pipe(jshint({ linter: require('jshint-jsx').JSXHINT })) //not work
        //.pipe(jshint())
        //.pipe(notify(jshintNotifier))
        .pipe(gulp.dest(jsOutPutDir))
        .on('error', pumpCb(taskName))
        .pipe(strip())
        //.pipe(s)
        .pipe(gulp.dest(jsOutPutDir))
        .pipe(size());

    return stream;
});



gulp.task('transformJS', function(pumpCb){
    pump([
        gulp.src(jsxFilesDir)
        ,plumber()
        ,gulpBrowser.browserify({transform: ['reactify']})
        //,strip()
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
    // Don't show something if success
    //return false;
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
        //jshint(),
        //notify(jshintNotifier),
        uglify(),
        rename({suffix:'.min'}),
        gulp.dest(jsOutPutDir),
        //notify({ title: "GULP TASK > " + this.seq.slice(-1)[0] + " <", message: "transformJSAndDist SUCCESS!!! ("+ js +")" })
        myNotifier({tittle:"GULP TASK > " + this.seq.slice(-1)[0] + " <", message: "transformJSAndDist SUCCESS!!! ("+ js +")" })
    ], cb);
});


gulp.task('prod', function(){
    runSequence('compressCss','transformJSAndDist');
});

//#-------------------------------------------------- END   [gulp file for SGP Project] - (25-10-2017 - 16:51:17) }}
