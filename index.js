var gutil = require('gulp-util');
var through = require('through2');
import { htmlToAmp } from 'html-to-amp';

//Gulp wrapper plugin for html-to-amp
module.exports = function(){
  return through.obj(function(file, enc, cb) {
    if(file.isNull()) return cb(null, file);
    if(file.isStream()) return cb(new Error('gulp-html-to-amp: Streams not supported.'));
    gutil.log('gulp-html-to-amp: AMP-ifying ' + file + '...');

    const html = file.contents.toString();
    htmlToAmp(html, (err, amp) => {
      if (err) {
        throw err;
      };
      gutil.log('gulp-html-to-amp: Amp-ified file ' + file);
      file.contents = new Buffer(amp);
      });
    cb(null, file);
  });
};
