# Elementar React boilerplate
 
## This is still still WIP
 
This documentation is more of brainstorming rather than anything else. I am still putting it together, deciding what is in which `.md` and adding features.
 
## Broad development guidelines
 
Template is base based on my [Broad development guidelines](BroadDevelopmentGuidelines.md)
 
Everything here will further focus mainly on things that are inside of the boilerplate rather than how you should continue developing or changing it.
 
## Table of content
 
1. [Project setup](#project-setup)
2. [Component structures](#component-structures)
3. [Project Structure](#project-structure)
4. [Environment variables](#environment-variables)
5. [Credits](#credits)
 
 
## Project setup
 
### Development environment
 
This project includes a way to run it's dev environment inside of docker with included `docker-compose-dev.yml`.
 
To start the development environment run following command in project root:
``` sh
docker compose -f docker-compose-dev.yml --env-file ./env/dev.env up -d --build
```
 
### Other environments
 
Those environments are made mainly focused on running inside of pipelines and for them the file `docker-compose.yml` is used. The behavior of this is dictated by which `.env` file you run with.
 
``` sh
docker compose -f docker-compose.yml --env-file ./env/prod.env up -d --build
```
 
##  Component structures
 
There are 4 component structures.
 
### Quarks
- Small repetitive parts of Atoms.
- Every styled component used in Atom is a Quark
- In majority of instances they don't need tests and in no instance should be big enough to deserve a storybook.
 
### Atoms
- Atom is your common React component.
- Every atom should be built in the way that it can be taken out of the app and put into a different app without any additional steps, but installing dependent node modules and its Quarks.
 
### Sections
- Section is a components that is composed from nothing but from Atoms, if necessary Quarks (unless absolutely irrational, ONLY from Atoms)
- Sections should always return the `<section>` element.
 
### Views
- Views are your pages. Views should be composed only from Sections.
 
 
- Every component structure is its own folder. Reason as to why this is favored over having `/components` `/tests` `/stories` is quite simple. If you have 200+ components, it's almost impossible to quickly navigate. Another reason is, that this way single components are way easier to deprecate, move.
 
 
Overall, your components should have similar folder structure:
```
YourComponent
    /YourComponent.tsx
    /YourComponent.test.tsx
    /YourComponent.stories.ts
    /YourCompoenet.types.tsx
    ...
```
Alternative to above is using `index.tsx` as your component root, as you might have already noticed, this import:
``` javascript
import YourComponent from 'YourComponent'
```
Looks way better than this one:
``` javascript
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
 
## Project structure
 
Explanation of which folder does what.
 
### `/`
 
Contains mainly version control, container control, configs. May contain code editor config (Only if your code editor cannot swallow having that in every module)
 
### `/modules`
 
- Contains representation of your Docker containers.
- Every subfolder should be a single Docker container.
- No module should be dependent on another module for its build. Your modules can depend on each other the same way the backend depends on the frontend. But you should be able to create an image from every single module even if you were to delete that one module. This also means that every module is a project on itself and should be considered as one. Meaning that it has its own configs for TypeScript, Lint and others.
 
### `/modules/src/client`
 
This folder contains your project config.
 
### `/modules/src/client/public`
 
Contains files that anyone can access just from making HTTP requests without needing permissions
 
### `/modules/src/client/src`
 
Contains source codes of your React app.
 
### `/modules/src/client/src/assets`
 
Folder for globally used things such as fonts, images.
 
### `/modules/src/client/src/components`
 
Provides further separation for following 3 structure sizes:
- Quarks
- Atoms
- Sections
 
### `/modules/src/client/src/components/atoms`
Contains a folder that sorts out your Atoms. In current stage those are:
 
- `/form-elements` Every from element atom. This means `<input>`, `<textarea>` etc.
- `/typography` Atoms regarding typography. This means that you should be having a component for f.e. `<H1>` instead of putting a global style on the `<h1>` tag.
- `/common-elements` Everything that cannot get sorted with relation to the global HTML element.
 
You can expand those base on your needs
 
Base Atom structure:
- `/assets`- Folder for your local assets. This means svgs, images, etc. that are subject to usage only in that Atom
- `/hooks` - Place for your Atom specific custom hooks
- `/quarks` - This folder could also be named styles. It's a place for local smaller Atom parts. This means that if you had components like `<Card>`, here you would have things such as `<CardHeader>`, `<CardBody>`.
- `/utils` - Folder where majority of Atom related logic will be stored. It should contain only common js functions & objects like dropdown options, regex condition, data formatting, etc.
- `.stories.tsx` - Folder here you put Storybook stories regarding your Atom.
- `.test.tsx` - Folder for tests regarding that Atom.
 
**Note: Do not create Atom groups and name them after where those Atoms are used. Atoms groups are supposed to be broad and should describe the types of Atoms.**
 
### `/modules/src/client/src/components/quarks`
Quarks that are used in more than one Atom/Section
### `/modules/src/client/src/components/sections`
Contains all sections
### `/modules/src/client/src/store`
Folder to store your store. Due to this not having integrated its own store, you have to decide on further structure for yourself.
### `/modules/src/client/src/types`
Folder for your global types. Types regarding components should be in the folder with the component.
### `/modules/src/client/src/utils`
Utils folder consists of some repeatedly used functions that are commonly used in the project. It should contain only common js functions & objects like dropdown options, regex condition, data formatting, etc.
### `/modules/src/client/src/views`
This folder contains your Views. Everything that the user can access should be placed in here.
 
 
## Environment variables
 
### Setting environment variable
 
Place your environment variables inside a desired file included inside of `/env` folder. As to where to place your environment variable, there are 4 pre-prepared categories:
 
- Global
- module-name
    - General
    - Environment
    - Ports
 
All the categories are explained in legend that is on the top of the file. You can add categories freely, but don't forget to explain what they do in legend. After you add your variable, you should give a simple clarification comment above it.
 
Naming style:
- All capital letter
- Words separated by underscores
- If that variable is regarding module, prepends it with module name
 
### Using environment variable
 
To develop the application in the right way, almost not that many things are supposed to be static. And this means that you are going to need environment variables. Instead of getting the environment variables in every file, a file called `env.ts` is included in the source code folder of the client module.
 
This file contains a function that gets the environment variable, substitutes it for default value if that variable was not passed, or throws an error if you don't wish to have that substitution.
 
### Snippets
 
In the `.vscode` folder I have included a few basic snippets. I recommend clicking through them as they can make your development way easier.
 
## Credits
 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).