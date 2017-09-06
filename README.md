## Description
The purpose of this base is to minify all the HTML, CSS and JS files of a project.
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
Folders' hierarchical order in Gulp tasks: "app" => "dist".

Folder | Description
--- | ---
app | Development root directory. Contains all your non-minified files.
dist | Production root directory. Contains the minified files from "app" folder.

## Gulp tasks
Task | Description
--- | ---
default | Calls the "build" task, then calls the "server" task.
build | Generates the "dist" folder by copying "app" folder's content, then minifying the HTML, JS, CSS (the task that minify CSS files, also runs gulp-autoprefixer on them) and image files.
server | Runs Browsersync using the "app" folder as root directory. All watches are inside this task.

The tasks listed above, are the main ones. All the others are called by one or more of the main ones.
<br />
The other tasks' purpose are just to allow them to be called separately.

## Gulp watches
- If any file changes on the "app" folder, reloads Browsersync server.
- If any CSS or JS file changes on the "app" folder, a respective lint runs to checks their integrity and if fails, it stops the Browsersync server.

## License
MIT © [Gowebit](http://www.gowebit.com.br/)