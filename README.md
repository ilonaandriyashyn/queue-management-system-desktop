# Queue managing desktop application

This is an Electron application which is a part of a queue managing system.
It is intended to be used by staff which will manage the queue.
It can be installed on Linux, macOS or Windows.

## Configuration
The app reads OFFICE_ID variable from JSON config file. In Linux or macOS
place it as */etc/queue-system.json*, on Windows *%PROGRAMDATA%\queue-system.json*.

## Development
To run the app in dev mode install dependencies first with yarn or npm, then start the server.

```bash
yarn install
yarn run electron:dev
```

## Build
Beware that SERVER URL is localhost:3000. You can change it in **./helpers/consts.ts**.

Run the following command to build the application for Linux and create
distributable file. Fakeroot and dpkg packages need to be installed.

Squirrel.windows You can only build the Squirrel.Windows target on a Windows machine or on a macOS /Linux machine with mono and wine installed
Deb (linux) You can only build the deb target on Linux or macOS machines with the fakeroot and dpkg packages installed.

```bash
yarn run electron:build-linux
```

Run the following command to build the application for macOS and create
distributable file.

```bash
yarn run electron:build-mac
```

Run the following command to build the application for Windows and create
distributable file. Mono and wine packages need to be installed.

```bash
yarn run electron:build-windows
```

## Other
To lint the app run
```bash
yarn run lint
```
which will check for TS errors as well.