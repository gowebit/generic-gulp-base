# Change Log
All notable changes to this project will be documented in this file.

## [1.0.0] - 2017-09-05
### Changed
- Changes in "gulpfile.js" regarding some tasks' paths.
- "prod" folder is now "dist" folder and is in another path.
- "README.md".
### Removed
- Preprocessor capability.
- "dev" folder.

## [0.2.0] - 2017-09-05
### Added
- Prepared folder structure and its respective tasks for preprocessors compilation.
- NPM run scripts for gulp tasks.
- "eslint".
- ".eslintrc" file.
- ".csslintrc" file.
- Browsersync server stops when "gulp-ccslint" finds an error.
- Browsersync server stops when "gulp-eslint" finds an error.
### Changed
- "README.md".
- JS file name altered from "script.js" to "main.js".
### Removed
- "jshint".
- "gulp-rename".

## [0.1.0] - 2017-06-11
### Added
- Task to minify HTML, CSS and JS files (the task that minify CSS files, also runs gulp-autoprefixer on them).
- Task to minify PNG, JPG, JPEG, GIF and BMP image files. 
- Watches and a task to run Browsersync.
