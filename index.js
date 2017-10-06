var through = require('through2');
var gutil = require('gulp-util');
var htmlAmp = require('./html-to-amp').htmlToAmp();

//Gulp wrapper plugin for html-to-amp
module.exports = function(){
  return through.obj(function(file, enc, cb) {
    if(file.isNull()) return cb(null, file);
    if(file.isStream()) return cb(new Error('gulp-html-to-amp: Streams not supported.'));
    gutil.log('gulp-html-to-amp: AMP-ifying ' + file + '...');

    const html = file.contents.toString();
    htmlAmp(html, (err, amp) => {
      if (err) {
        throw err;
      };
      gutil.log('gulp-html-to-amp: Amp-ified file ' + file);
      file.contents = new Buffer(amp);
      });
    cb(null, file);
  });
};
