# Calendar

## Description

This project is a calendar.

## Project setup

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

### Run your unit tests

``` bash
npm run test:unit
```

### Run your end-to-end tests

``` bash
npm run test:e2e
```

### Lints and fixes files

``` bash
npm run lint
```

### Cleans built files

``` bash
npm run clean
```
