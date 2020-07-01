# Calendar

## Description

### Author: Jose Luis Assadi

This project is a calendar.

## Project setup

### Tests

``` bash
npm run test:unit
```

An output of the last run test coverage can be fount on the file `coverage.txt`, if more in depth analisis is needed, go to `coverage/Icov-report/index.html`, open it on the browser, and you can see a more in depth report.

### Static Code Analisys

The static code analisis on that were used on this project are:

- [Prettier](https://prettier.io/)
- [Eslint](https://eslint.org/)

The two tools are configured to work toguether on the command

``` bash
npm run lint
```

And use the rules detailed in the file .eslintrc.js

The output of this tool is sent to the console, but is also available on the file **static_report.txt**

### Node version

To successfuly run this project, it is necessary to
have a version of NodeJS equal or greater than
**13.12.0**

### Install dependencies

``` bash
npm install -ci
```

### Compiles and hot-reloads for development

``` bash
npm run electron:serve
```

This will open an electron interface with the software

### Compiles and minifies for production

``` bash
npm run electron:build
```

This will create a folder called **dist_electron**, inside it, one can find the installers for the platform it was compiled to, and will also find a folder with the name of the platform, which will have an executable. Ex (for OSX):

``` bash
- root_folder
-- src
-- .....
-- dist_electron
---- .....
---- calendar-0.1.0.dmg
---- mac
------ calendar.app
---- .....
-- .....
-- node_modules
```

### Lints and fixes files

``` bash
npm run lint
```

### Cleans built files

``` bash
npm run clean
```
