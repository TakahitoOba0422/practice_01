const gulp = require('gulp');
const sass = require('sass'); // gulp-sassを使用せずsassを直接使用
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const through2 = require('through2');

// Sassのコンパイルタスク
gulp.task('sass', () => {
  return gulp.src('html/common/css/sass/page/*.scss') // Sassファイルのソース
    .pipe(through2.obj(function(file, _, cb) {
      if (file.isBuffer()) {
        const result = sass.renderSync({
          file: file.path,
          includePaths: ['html/common/css/sass/page'], // 必要な場合にパスを指定
          silenceDeprecations: ['legacy-js-api'],
        });
        file.contents = Buffer.from(result.css); // 出力されたCSSをファイルの内容に設定
      }
      cb(null, file);
    }))
    .pipe(rename({ extname: '.css' })) // 拡張子を.cssに変更
    .pipe(gulp.dest('html/common/css')); // 出力先
});

// EJSのコンパイルタスク
gulp.task('ejs', () => {
  return gulp.src('html/ejs/*.ejs') // EJSファイルのソース
    .pipe(ejs({}, {}, { ext: '.html' })) // EJSをHTMLにコンパイル
    .pipe(rename({ extname: '.html' })) // 拡張子を.htmlに変更
    .pipe(gulp.dest('html')) // 出力先
    .pipe(ejs({ title: '' }));
});

// 変更を監視するタスク
gulp.task('watch', () => {
  gulp.watch('html/common/css/sass/**/*.scss', gulp.series('sass')); // Sassの変更を監視
  gulp.watch('html/ejs/*.ejs', gulp.series('ejs')); // EJSの変更を監視
});

// デフォルトタスク
gulp.task('default', gulp.series('sass', 'ejs', 'watch'));