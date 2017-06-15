## Description
**_Please note that everything related to preprocessors and the "src" folder is still in development._**
The purpose of this base is to easily compile the most used front-end preprocessors and to minify all the HTML, CSS and JS files of a project.
For more details of how it works, please take a look at the [Folder structure](#folder-structure) section.

## Install
Make sure that you have gulp-cli installed globally but if you don't, just run:
 ```bash
npm i --global gulp-cli
```

Once in project's directory, run: 
```bash
npm i
```

## Usage
For Gulp usage, please read the [Gulp tasks](#gulp-tasks) section.

## Folder structure
Folders' hierarchical order in Gulp tasks: "src" => "app" => "dist".

Folder | Description
--- | ---
src | Contains preprocessors such as "Pug", "Sass" or "TypeScript".
app | Development root directory and contains compiled (and non-minified) files from "src" folder.
dist | Production root directory and contains the minified files from "app" folder.

## Gulp tasks
Task | Description
--- | ---
default | Firstly calls the "build" task, then calls the "server" task.
compile | Compiles the preprocessors' files from "src" folder and puts the compiled files in "app" folder.
build | Firstly calls the "compile" task, then minify the HTML, JS, CSS and image files from "app" folder (the task that minify CSS files, also runs gulp-autoprefixer on them) and puts them (post-minified) in "dist" folder. <br /> It also copies a non-minified version of the HTML, JS and CSS with the suffix "-original" due to the fact that the minified ones maintain the originals' names (by keeping the originals' names, it's not necessary to change the import tags on the HTML file).
server | Runs Browsersync using the "app" folder as root directory. All watches are inside this task.

The tasks listed above, are the main ones, all the others are called by one or more of the main ones.
The other tasks' purpose are just to allow them to be called separately.

## Gulp watches
- The first group of watches, looks for any changes on the "src" folder and if everything compiles, runs the "compile" task.

- The second group of watches, looks for any changes on the "app" folder and if everything compiles, runs Browsersync using the "app" folder as root directory.

[comment]: # (Maybe create a watch to detect any changes on "src" or "app" folder and if so, run the "build" task without running Browsersync.)

## Contribution
If you want to help by adding support to compile any preprocessor, just add a Gulp task to do so and then call this task inside the "compile" task.

## License
MIT © [Gowebit](http://www.gowebit.com.br/)