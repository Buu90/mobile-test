import webp from 'gulp-webp'
import imagemin from 'gulp-imagemin'

export const images = () => {
  const imageSources = [
    `${app.path.srcFolder}/img/**/*.{jpg,jpeg,png}`,
    `!${app.path.srcFolder}/img/svgicons/**`,
  ]

  return app.gulp
    .src(imageSources, { base: `${app.path.srcFolder}/img` }) // сохраняем структуру
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'IMAGES',
          message: 'Error: <%= error.message %>',
        })
      )
    )

    // ✅ WebP только для .jpg/.jpeg/.png и только при билде
    .pipe(
      app.plugins.if(
        (file) =>
          app.isBuild &&
          file.extname &&
          /\.(jpe?g|png)$/i.test(file.extname),
        webp()
      )
    )
    .pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.images)))

    // Оригинальные изображения (сжатие)
    .pipe(app.gulp.src(imageSources, { base: `${app.path.srcFolder}/img` }))
    .pipe(app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.images)))
    .pipe(
      app.plugins.if(
        app.isBuild,
        imagemin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          interlaced: true,
          optimizationLevel: 3,
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.images))

    // SVG
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browsersync.stream())
}
