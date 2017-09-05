## Description
The purpose of this base is to easily compile the most used front-end preprocessors and to minify all the HTML, CSS and JS files of a project.
For more details of how it works, please take a look at the [Usage](#usage) section.

## Install
Make sure that you have gulp-cli installed globally. If you don't, run the following:
 ```bash
npm i -g gulp-cli
```

To install project's dependencies, go to its directory and run: 
```bash
npm i
```

## Usage
Delete "app" folder's content and put your project in it.
<br />
<br />
For more details of how the base works, please take a look at the [Folder structure](#folder-structure) section.
<br />
For Gulp usage, please read the [Gulp tasks](#gulp-tasks) section.

## Folder structure
Folders' hierarchical order in Gulp tasks: "app" => "dev" => "prod".

Folder | Description
--- | ---
app | Contains all your code with preprocessors such as "Pug", "Sass" or "TypeScript".
dev | Development root directory. Contains compiled (and non-minified) files from "app" folder.
prod | Production root directory. Contains the minified files from "dev" folder.

## Gulp tasks
Task | Description
--- | ---
default | Calls the "build-dev" task, then calls the "server" task.
build-dev | Generates the "dev" folder by copying "app" folder's content and compiling the preprocessors' files.
build | Generates the "prod" folder by copying "dev" folder's content, then calling the "build-dev" task, and minifying the HTML, JS, CSS (the task that minify CSS files, also runs gulp-autoprefixer on them) and image files.
server | Runs Browsersync using the "dev" folder as root directory. All watches are inside this task.

The tasks listed above, are the main ones. All the others are called by one or more of the main ones.
<br />
The other tasks' purpose are just to allow them to be called separately.

## Gulp watches
- If any file changes on the "app" folder, runs the "build-dev" task.
- If any file changes on the "dev" folder, runs Browsersync using the "dev" folder as root directory.
- If any CSS or JS file changes on the "app" folder, a respective lint runs to checks their integrity and if fails, it stops the Browsersync server.

## Contribution
If you want to help by adding support to compile any preprocessor, just add a Gulp task to do so and then call this task inside the "compile" task.

## License
MIT © [Gowebit](http://www.gowebit.com.br/)