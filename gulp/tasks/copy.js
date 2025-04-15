export const copy = () => {
  return app.gulp
    .src(app.path.src.files)
    .pipe(
      app.plugins.if(
        '*.json', // Если файл — JSON
        app.gulp.dest(app.path.build.lang), // Копируем в dist/js/lang/
        app.gulp.dest(app.path.build.files) // Иначе — в dist/files/
      )
    )
}

