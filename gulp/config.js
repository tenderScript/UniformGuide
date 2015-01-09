'use strict';

var src = {
  'root': 'assets'
};

var dest = {
  'root': 'dist'
};

module.exports = {

  'src': src,
  'dist': dest,

  'sass': {
    includePaths: [
      'bower_components/bootstrap-sass-official/assets/stylesheets/'
    ]
  },

  'watch': {
    'paths': ['scss', 'js'].reduce(function(paths, ext) {
      return paths.concat([src.root + '/**/*.' + ext, src.root + '/*.' + ext]);
    }, [])
  }

};
