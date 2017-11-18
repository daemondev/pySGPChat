function hasClass(element, cls) { return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1; }
function formatBytes(a, b) { if (0 == a) return "0 Bytes"; var c = 1e3, d = b || 2, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], f = Math.floor(Math.log(a) / Math.log(c)); return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f] }

var filesGLOBAL = null;
var myCategoriesString = '{"cat1":[], "cat2":[], "cat3":[],"cat4":[]}';     //### from DB in the AJAX Request
filesGLOBAL = eval('(' + myCategoriesString + ')');                         //### from DB in the AJAX Request

var file = {};
var fileContainner = {"cat1":[], "cat2":[]};                                //### create when render
var selectedFiles = {"cat1":[], "cat2":[]};                                 //### create when render
function fileSetter(param, e) {
    alert("DESTINY: " + e.target.destiny);
    if (checkfile(e.target)) {
        var tmpfileToProcess = e.target.files;

        for (var i = 0; i < tmpfileToProcess.length; i++) {

            if(selectedFiles[param].indexOf(tmpfileToProcess[i].name) >= 0){
                console.log(i + ".- CATEGORY: ["+  param +"] - Selected File is SELECTED: " + tmpfileToProcess[i].name);
                console.log("");
                continue;
            }
            file = {};
            file['file'] = tmpfileToProcess[i];
            file['name'] = tmpfileToProcess[i].name;
            file['size'] = tmpfileToProcess[i].size;
            file['date'] = new Date(tmpfileToProcess[i].lastModified).toLocaleFormat("%d-%m-%Y %H:%M:%S");
            //fileContainner[param].push(file);
            //fileContainner.push(file);
            fileContainner[param].push(file);
            selectedFiles[param].push(tmpfileToProcess[i].name);
        }
    }
    //document.getElementById('trick').innerHTML = "";
}

function checkfile(sender) {
    var validExts = new Array(".txt", ".csv", ".png", ".jpg");
    var fileExt = sender.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt.toLowerCase()) < 0) {
        alert("SELECCI&Oacute;N DE ARCHIVO - Favor de seleccionar un tipo de archivo permitido [" + validExts.toString() + "]");
        sender.value = "";
        return false;
    }
    else return true;
}

function inputBtn(param) {
    cat = "";

    if(hasClass(param, 'cat1')){
        cat = "cat1";
    } else if (hasClass(param, 'cat2')) {
        cat = "cat2";
    }

    var input = document.createElement('input');
    input.type = "file";
    input.accept = ".txt, .csv, .png, .jpg";
    input.multiple = true;
    document.getElementById('trick').appendChild(input);
    setTimeout(function () {
        input.click();
    }, 200);

    input.destiny = cat;

    input.addEventListener('change', fileSetter.bind(null, cat), false);
}

function showOrSaveFiles(param){
    fileContainner[param].map(function(f, i){
        console.log(i+1 +".- CATEGORY: ["+  param +"] FILE: " + f.file);
        console.log(i+1 +".- CATEGORY: ["+  param +"] NAME: " + f.name);
        console.log(i+1 +".- CATEGORY: ["+  param +"] SIZE: " + formatBytes(f.size));
        console.log(i+1 +".- CATEGORY: ["+  param +"] DATE: " + f.date);
        console.log("");
    });
}

