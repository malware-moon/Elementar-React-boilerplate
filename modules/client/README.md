# Getting Started with Elementar React

## Manifesto

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run lint`

Checks linting on all JavaScript and TypeScript files inside of ./src folder.

# File structure

## `/`

Contains mainly backup, version control, container control, configs. May contain code editor config (Only if your code editor cannot swallow having that in every module)

## `/modules`

- Contains representation of your Docker containers. 
- Every subfolder should is a single Docker container.
- No module should be dependat on another module for it's COMPILATION, your modules can depend on each other the same way backend depends on frontend. But you should be able to create an image from every single module even if you were to delete module that one. This also means that every module is a project on itself and should be considered as one. Meaning that it has it's own configs for TypeScript, Lint and other.

## `/modules/src/client`

This folder contains your project config.

## `/modules/src/client/public`

Contains files that anyone can access just from making HTTP request ?without needing permissions?

## `/modules/src/client/src`

Contains source codes of your React app.

## `/modules/src/client/src/assets`

## `/modules/src/client/src/components`

Contains your components of folllowing 3 structure sizes:
- Quarks
- Atoms
- Sections

## `/modules/src/client/src/components/atoms`
Contains folder that sort out your Atoms. In current stage those are
- `/form-elements` Every from element atom. This means `<input>`, `<textarea>` etc.
- `/typography` Atoms regarding typography. This means that you should be having a component for f.e. `<H1>` instead of putting a global style on `<h1>` tag.
- `/common-elements` Everything that cannot get sorted with relation to global HTML element.

Base Atom structure:
- `/assets`- Folder for your local assets. This means svgs, images, etc. that are subject to usage only in that Atom
- `/hooks` - Place for your Atom specific custom hooks
- `/quarks` - This folder could also be named styles. It's place for local smaller Atom parts. This means that if you had component like `<Card>`, here you would have things such as `<CardHeader>`, `<CardBody>`.
- `/utils` - Folder where majority of Atom related logic will be stored. It should contain only common js functions & objects like dropdown options, regex condition, data formatting, etc.
- `.stories.tsx` - Folder here you put Storybook stories regarding your Atom.
- `.test.tsx` - Folder for tests regarding that Atom.

**Note: Do not create Atom groups and name them after where those Atoms are used. Atoms groups are supposed to be broad and should describe the types of Atoms.**

Corret naming ✅:
``` 
/tables
    / DataGrid
    / DefaultTable
```
Incorrect naming ❌:
``` 
/login-inputs
```

## `/modules/src/client/src/components/quarks`
Quarks that are used in more than one Atom/Section
## `/modules/src/client/src/components/sections`
Contains all sections
## `/modules/src/client/src/store`
Folder to store your store. Due to this not having integrated it's own store, you have to decide on further structure for yourself. 
## `/modules/src/client/src/types`
Folder for your global types. Types regarding componenets should be in the folder with the component.
## `/modules/src/client/src/utils`
Utils folder consists of some repeatedly used functions that are commonly used in the project. It should contain only common js functions & objects like dropdown options, regex condition, data formatting, etc.
## `/modules/src/client/src/views`
This folder contains your Views. Everything that user can access should be placed in here.

# Conventions

## Componenet structures

There are 4 component structures.

### Quarks
- Small repetitive parts of Atoms. 
- Every styled component used in Atom is a Quark
- In majority of instances they don't need tests and in no instance should be big enough to deserve storybook.

### Atoms
- Atom is your common React component.
- Every atom should be built in the way, that it can be took out of the app and put into different app without any additional steps, but installing dependent node modules and it's Quarks.

### Sections
- Section is a components that is composed from nothing but from Atoms, if necessary Quarks (unless absolutely irational, ONLY from Atoms)
- Sections should always return `<section>` element.

### Views
- View are your pages. Views should be composed only from Sections.

## Components structure

- Every component structure is it's own folder. Reason as to why this is favored over having `/components` `/tests` `/stories` is quite simple. If you have 200+ components, it's almost impossible to quickly navigate. Another reason is, that this way single components is way easier to deprecate, move.

This means, that components should have following strucutre:
```
YourComponent
    /YourComponent.tsx
    /YourComponent.test.tsx
    /YourComponent.stories.ts
    /YourCompoenet.types.tsx
    ...
```
Alternative to above is using `index.tsx` as your component root, as you might have already noticed, this import:
```
import YourComponent from 'YourComponent'
```
Looks way better than this one:
```
import YourComponent from 'YourComponent/YourComponent'
```
Reason as to why you would use first over the second, is that it almost eliminates the problem of you wanting to edit one file, all while editing another file with the same name and wondering for 15+ minutes, why is it not working.
```
YourComponent
    /index.tsx
    /YourComponent.test.tsx
    /YourComponent.stories.ts
    /YourCompoenet.types.tsx
```

## Environemt variables

To develop the application in the right way, almost not that many things are supposed to be static. And this means that you are going to need environemt varibles. Instead of getting the environemt variables in every file, a file called `/env.ts` is included in client module.

This file contains a function for that get's the environemt variable and depends on settings, if the variable doesn't exist either throws an error, or substitues it for default value. All the environment variables should be sourced from this file.