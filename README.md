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

## Other
To build an app run the following command.

```bash
yarn run electron:build
```

To lint the app run
```bash
yarn run lint
```
which will check for TS errors as well.