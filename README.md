Package with interfaces definitions for all *webext-buildtools* builders. 

*webext-buildtools* is a toolkit for building and deploying Web Extensions (browser extensions standard introduced by Google and supported by Chrome, Firefox, Internet Explorer, Opera, etc.).

Use this package to create own builder which implements `ISimpleBuilder` to make it compatible with other builders in *webext-buildtools* toolkit.

A system of *webext-tools* builders based on the following approaches:
1. Builders are classes implemented `ISimpleBuilder` interface
2. Each builder represent a particular step of building or deploying webextension
3. Builder can have options (normally passed to it's constructor) to customize build process

Different builders can perform similar operations (pack directory to zip for example) or require the same input data (path to extension directory). 
It's a reason to extract that operations to a separate build step (i.e. another builder).
To use common intermediate (or final) build results builders can be chained:

1. **Asset** is a wrapping class implemented `IBuildAsset` which contains some build-related data
2. Builders can receive data (directly from caller or produced by another builders) needed to perform build (directory path, zip file, manifest file). These data are called **inputs**
3. Builders produce *assets* and optional side effects (like deploy) as a result of their work
4. Produced *assets* can be used to pass them on to another builders as *inputs*
5. `IDisposableBuildAsset` is asset which contains data, which can be *disposed* (removed/cleaned up) after entire build process (temporary files)