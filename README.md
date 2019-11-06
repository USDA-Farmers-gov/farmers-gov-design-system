# Farmers.gov Design System setup
---
### Working with precompiled assets

_In order to use our Gulp tasks to compile the Sass and ES6+ JavaScript files, you'll need to have [Node](https://nodejs.org/en/), [NPM](https://www.npmjs.com/), and [Gulp](https://gulpjs.com/) installed on your machine._

+ To download this repository, the following commands can be used in the terminal.  
  `$ git clone git@github.com:USDA-Farmers-gov/Farmers.Gov-Design-System.git`  
then run `$ cd Farmers.Gov-Design-System` to navigate into the repository directory.

+ Once you have the repository downloaded, make sure you are in the repository directory and run `npm install` to get all of the necessary packages.

+ After all of the packages have been installed, you can run the Gulp tasks to generate the compiled JavaScript and CSS files.

##### Gulp Tasks   
_These gulp tasks put the compiled assets in the `/dist` directory._   

| Task                   | Description                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `gulp scripts`         | Transpiles the main a JavaScript file located in `/js/farmers.js`                                                                    |
| `gulp styles`          | Compiles the main a Sass file located in `/scss/styles.scss`                                                                          |
| `gulp assets`          | Copies files from the `img/` and `fonts/` directories                                                                                |
| `gulp watch`           | Watches all `.js` files in the `js/` directory and all `.scss` files in the `scss/` directory and compiles/transpiles any new changes |
| `gulp clean`           | Deletes files and directories in the `dist/` directory                                                                               |
| `gulp` or `gulp build` | Runs `gulp clean`, `gulp styles`, `gulp scripts` and `gulp assets`                                                                   |
