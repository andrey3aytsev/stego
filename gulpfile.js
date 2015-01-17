var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

gulp.task('js-concat', function() {

    gulp.src([
           'assets/js/vendor/prefixfree.min.js',
           'assets/js/vendor/modernizr.js',
           'assets/js/vendor/jquery.js',
           'assets/js/vendor/foundation.min.js',
       ])
    .pipe(concat('dist/vendor.js'))
      // .pipe(uglify())
      .pipe(gulp.dest('assets/js'))

    gulp.src([
         'assets/js/utilities/helper_functions.js',
         'assets/js/utilities/ui.js',
         'assets/js/utilities/init_canvases.js',
         'assets/js/read_image.js',
         'assets/js/write_image.js',
         'assets/js/print_pixels.js',
         'assets/js/lsb_algorithm.js',
         'assets/js/quant_algorithm.js',
         'assets/js/dct_algorithm_helpers.js',
         'assets/js/dct_algorithm.js',
         'assets/js/app.js',
         'assets/js/visual.js'
     ])

    .pipe(concat('dist/application.js'))
      // .pipe(uglify())
      .pipe(gulp.dest('assets/js'))
});

gulp.task("watch", function() {
    gulp.watch([
        'assets/js/utilities/*.js',
        'assets/js/vendor/*.js',
        'assets/js/*.js'
      ],
      ['js-concat']);
});

gulp.task('default', ['js-concat']);


