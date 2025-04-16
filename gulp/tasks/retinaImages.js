import responsive from 'gulp-sharp-responsive';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import path from 'path';
import fs from 'fs';

export const createRetinaImages = async () => {

  // Функция для проверки существования файла
  const fileExists = (filePath) => {
    return fs.existsSync(filePath);
  };

  return app.gulp
    .src([`${app.path.srcFolder}/img/**/*.{jpg,jpeg,png}`])
    .pipe(
      plumber(
        notify.onError({
          title: 'SHARP',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      responsive({
        formats: [
          {
            width: 1000,
            rename: { suffix: '@2x' },
          },
          {
            width: 1500,
            rename: { suffix: '@3x' },
          },
        ],
      })
    )
    .pipe(
      app.gulp.dest((file) => {
        // Определяем путь к целевому файлу
        const targetPath = path.join(
          `${app.path.srcFolder}/img`,
          file.relative
        );

        // Если файл уже существует, пропускаем его
        if (fileExists(targetPath)) {
          console.log(`Skipping existing file: ${targetPath}`);
          return null; // Пропускаем файл
        }

        console.log(`Creating new file: ${targetPath}`);
        return `${app.path.srcFolder}/img`;
      })
    );
};