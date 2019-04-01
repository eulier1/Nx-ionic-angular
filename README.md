# Krack2020Suite

Sga & Logistica App para Krack

## Requirements

- [Enviroment Setup](https://ionicframework.com/docs/installation/environment)
- [Ionic Installation](https://ionicframework.com/docs/installation/cli)
- [iOS Setup](https://ionicframework.com/docs/installation/ios)
- [Android Setup](https://ionicframework.com/docs/installation/android)
- [Set up & Build Ionic App for -Ubuntu-](https://gallant-bell-850d88.netlify.com/2019/march/ionic4-workflow-multiapp-project.html#build-project-using-ionic-cli-for-mobile-dev)

## Usage

open console in the root project and execute

```bash
npm install
```

then for

### Web development

SGA development

```bash
ng serve --project sga
```

AL development

```bash
ionic serve --project al
```

### Mobile development

open console in the root project and execute

\*For first time build

```bash
ionic integrations enable cordova --add --project al
```

For local mobile development

```
ionic cordova run android --project mobile
```

for more commands to build or run, [running iOS](https://ionicframework.com/docs/building/android) or [running Android](https://ionicframework.com/docs/building/ios)

### API Updates

To generate a scheme (or Interface) from API & Enviroment Postman JSON, we use [MakeTypes](https://jvilk.com/MakeTypes/).

To update latest API changes do the following

- Export the collection from Postman
- Set the exported collection in `/shared_modules/services/api` folder
- Use [MakeTypes](https://jvilk.com/MakeTypes/) to generate the scheme (Interfaces)
- Save the scheme in `/shared_modules/models` folder
- **Run** the proyect

Project set up thanks to [Nx](https://github.com/nrwl/nx)
