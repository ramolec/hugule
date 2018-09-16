const gulp     = require("gulp"),
      del      = require("del"),
      vpath    = require("vinyl-paths")
      hash     = require("gulp-hash"),
      prefixer = require("autoprefixer")
      postcss  = require("gulp-postcss"),
      tailwind = require("tailwindcss");
      shell    = require("gulp-shell");

 /* Helpers */

const LOAD = {
    css: 'src/css/main.css',
    livecss: ['tailwind.js', 'source/css/**/*.css'] 
}

const hashOptions = {
    deleteOld: true,
  }

/* Tasks loaders */

gulp.task('css', (done) =>{    
    gulp.src(LOAD.css)
        .pipe(postcss([
            tailwind('./tailwind.js'),
            prefixer()
        ]))
        .pipe(hash())
        .pipe(gulp.dest('static/css'))
        .pipe(hash.manifest('assetHashes.json', hashOptions))
        .pipe(gulp.dest('data'));
    done();
});

gulp.task('clean', () => {
    return gulp.src('static/css/**/*')
    .pipe(vpath(del))
});

gulp.task('css:watch', () => {
    gulp.watch(LOAD.livecss, gulp.series('clean', 'css'));
});

gulp.task('hugo:server', shell.task([
    'hugo server'
]));


/* Main tasks */

gulp.task('dev', gulp.series('css', gulp.parallel('css:watch', 'hugo:server')));