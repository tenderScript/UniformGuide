uniform
=======

The goal of uniform is to provide one place for common UI elements and styles.

Uniform is build on top of the following:

* bootstrap
* sass
* bourbon

##Usage

The fully compiled css for uniform can be found at `dist/uniform.css`. It includes the full bootstrap
library, as well as [bourbon](http://bourbon.io/).

The `dist` directory will also contain a `fonts` directory containing bootstrap fonts and VNN standard fonts.

###Using in a build process:

Using [`gulp-sass`](https://github.com/dlmanning/gulp-sass), you can use the following sass configuration to include uniform's sass into the 
project:

```js
var sassConfig = {
      includePaths: [
        'bower_components/uniform/assets/stylesheets/'
      ]
   };
```

##Theme

Uniform uses a `_variables.scss` file that contains all of the variables for the VNN brand.
All of these use the `!default` sass identifier to ensure they can be overwritten.

If you need to override any of these variables, just do so before including `_uniform.scss`:

```scss
@import "mycustomvars";
@import "uniform"
```

##Developing

Ensure deps are all in order:

```
npm i
```

The `package.json` file includes a `build` script for compiling `uniform.css`.

```
npm run build
```

There is also a `dev` script that can be used to watch for changes and automatically build.

```
npm run dev
```

##Examples

You can use the `server` script to delegate to a PHP server to test out the examples.

```
npm run server
```

You can then hit up the examples via a browser, i.e http://localhost:8000/examples/signup.html.
