# Ceburilo App [![Build Status](https://travis-ci.org/buoto/CeburiloApp.svg?branch=master)](https://travis-ci.org/buoto/CeburiloApp)

Mobile app for [Ceburilo](https://ceburilo.pl/) which helps planning free bike
trips using Warsaw public bike sharing platform. API was created during WAWCODE
Hackaton 2015 ([repo](https://github.com/zyla/ceburilo)).

## Development

This app is created using react-native. Despite possibility of building IOS app,
only Android version is fully supported.

### Preparation

Before building APK make sure that your device is recognised by adb. Test it
using:

```sh
$ adb devices
List of devices attached
1c00ffee1	device
```

If your device shows up you can set up reverse proxy to dev server using adb
to avoid network problems.

```
$ adb reverse tcp:8081 tcp:8081
```

### Build APK

Build development APK and send it to device using:

```sh
$ npm run android
```

That command also runs development server in background.

### Development server

To run development server with live reload type:

```sh
npm start
```

### ESLint

Run eslint in watch mode:
```
npm run lint -- -w
```
