# Sga & Logistica App para Krack

## Requirements

- [Enviroment Setup](https://ionicframework.com/docs/installation/environment)
- [Ionic Installation](https://ionicframework.com/docs/installation/cli)
- [iOS Setup](https://ionicframework.com/docs/installation/ios)
- [Android Setup](https://ionicframework.com/docs/installation/android)
- [Set up & Build Ionic App for -Ubuntu-](https://gallant-bell-850d88.netlify.com/2019/march/ionic4-workflow-multiapp-project.html#build-project-using-ionic-cli-for-mobile-dev)

## Usage

### Web development

For **sga** or **mobile** App, open console in the root project and execute

```bash
cd apps/mobile
npm install
ionic serve --project sga
```

or

```bash
cd apps/sga
npm install
ionic serve --project mobile
```

and follow the steps.

### Mobile development

open console in the root project and execute

```bash
cd apps/mobile
npm install
ionic cordova run android --project mobile
```

for more commands to build or run, [running iOS](https://ionicframework.com/docs/building/android) or [running Android](https://ionicframework.com/docs/building/ios)

### API Updates

To generate a scheme (or type) for API & Enviroment to Typescript, we use [Quicktype](https://quicktype.io/).

To update latest API changes do the following

- Export the collection from Postman
- Set the exported collection in `/shared_modules/services/api` folder
- User [Quicktype](https://quicktype.io/) to generate the scheme (Interfaces)
- Save the scheme in `/shared_modules/models` folder
- Due a missbehaviour when Quicktype generate such interface, **remove** property `name` from interface `ItemItem`
- **Run** the proyect
