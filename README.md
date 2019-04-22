[![Build Status](https://travis-ci.com/cardinalby/webext-buildtools-builder-types.svg?branch=master)](https://travis-ci.com/cardinalby/webext-buildtools-builder-types)
### Introduction
Package with interfaces definitions for all *webext-buildtools* builders.

If you need complete solution for Web Extension build/deploy, go to [webext-buildtools-integrated-builder](https://github.com/cardinalby/webext-buildtools-integrated-builder) repo.
### Installation
`npm install webext-buildtools-builder-types`
### Purpose
*webext-buildtools* is a toolkit for building and deploying Web Extensions (browser extensions standard introduced by Google and supported by Chrome, Firefox, Internet Explorer, Opera, etc.).

Use this package to create own builder which implements `ISimpleBuilder` to make it compatible with other builders in *webext-buildtools* toolkit.
### Main approaches
1. Builders are classes implemented `ISimpleBuilder` interface
2. Each builder represent a particular step of building or deploying webextension
3. Builder can have options (normally passed to it's constructor) to customize build process
### Assets reusing
Different builders can perform similar operations (pack directory to zip for example) or require the same input data (path to extension directory). 
It's a reason to extract that operations to a separate build step (i.e. another builder).
To use common intermediate (or final) build results builders can be chained:

1. **Asset** is a wrapping class implemented `IBuildAsset` which contains some build-related data
2. Builders can receive data (directly from caller or produced by another builders) needed to perform build (directory path, zip file, manifest file). These data are called **inputs**
3. Builders produce *assets* and optional side effects (like deploy) as a result of their work
4. Produced *assets* can be used to pass them on to another builders as *inputs*
5. `IDisposableBuildAsset` is asset which contains data, which can be *disposed* (removed/cleaned up) after entire build process (temporary files)
### Logging
One more defined type is:

`type ILogMethod = (level: string, message: string, ...meta: any[]) => any;`

It's not used in `ISimpleBuilder` definition, but usually you can pass `logMethod: ILogMethod | undefined` 
to builder constructor to customize logging behaviour. 

Example of ILogMethod implementation using [winston](https://www.npmjs.com/package/winston) package:
```js
const winston = require('winston');

const logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.splat(),
            winston.format.cli()
        ),
        prettyPrint: JSON.stringify,
        transports: [new winston.transports.Console()]
    });

const logMethod = logger.log.bind(logger);
```
Using `console.log`:
```js
const logger = (level, message, ...meta) => {
    console.log(message);
    for (const m of meta) {
        console.log(m);
    }
};
```
