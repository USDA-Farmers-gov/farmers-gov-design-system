# Farmers.gov Design System setup
---

### Basic Setup
#### 1. Clone the repository into the root directory of your site
`$ git clone https://github.com/USDA-Farmers-gov/Farmers.Gov-Design-System.git`

#### 2. Rename the repo folder to be web friendly
`$ mv Farmers.Gov-Design-System farmers-gov`

#### 3. Include the JS and CSS in the header
```
<script src="/farmers-gov/dist/farmers.min.js"></script>
<link rel="stylesheet" media="all" href="/farmers-gov/dist/css/main.min.css" />
```

<p class="hide-on-site">
      Design system elements and their markup can be found at <a href="https://usda-farmers-gov.github.io/">https://usda-farmers-gov.github.io/</a>
</p>

---

### Compiling your own CSS using Gulp and the Design System

These instruction assume you are starting from scratch. If you aready have Gulp installed, they are provided as a reference.

#### 1. Create a package.json file

`$ npm init`

#### 2. Install packages

`$ npm install gulp gulp-sass gulp-clean-css gulp-concat gulp-rename gulp-watch`

#### 3. Setup your CSS
Create **assets/scss/mystyles.scss**. This will include the styles specific to your website. Copy and paste these lines at the top:

``` 
/* Set asset path helper variable */
$asset-base-path: 'farmers-gov' !default;

/* Farmers.gov Design System */
@import 'farmers-gov/scss/styles.scss'; 
```

#### 4. Setup Gulp file
Create **gulpfile.js** in your root directory and paste this code into it:

```
const gulp = require('gulp'),
      sass = require('gulp-sass'),
      cleanCSS = require('gulp-clean-css'),
      concat = require('gulp-concat'),
      rename = require('gulp-rename'),
      watch = require('gulp-watch');

gulp.task('sass', function() {
  return gulp.src('assets/scss/mystyles.scss') 
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('styles.css')) 
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('css')); 
});

gulp.task('watch', function() {
  gulp.watch('assets/scss/mystyles.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series('sass'));
```
When run, this script will create **css/styles.min.css**.

#### 5. Compile your CSS
To build your file once type

`$ gulp`

OR 

`$ gulp watch` 

if you want to re-compile on each save.

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
