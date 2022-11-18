# Getting Started with Elementar React
 
## This is still still WIP
 
This documentation is more of brainstorming rather than anything else.
 
# File structure
 
## `/`
 
Contains mainly version control, container control, configs. May contain code editor config (Only if your code editor cannot swallow having that in every module)
 
## `/modules`
 
- Contains representation of your Docker containers.
- Every subfolder should be a single Docker container.
- No module should be dependent on another module for its COMPILATION, your modules can depend on each other the same way backend depends on frontend. But you should be able to create an image from every single module even if you were to delete that one module. This also means that every module is a project on itself and should be considered as one. Meaning that it has its own configs for TypeScript, Lint and others.
 
## `/modules/src/client`
 
This folder contains your project config.
 
## `/modules/src/client/public`
 
Contains files that anyone can access just from making HTTP requests ?without needing permissions?
 
## `/modules/src/client/src`
 
Contains source codes of your React app.
 
## `/modules/src/client/src/assets`
 
## `/modules/src/client/src/components`
 
Contains your components of following 3 structure sizes:
- Quarks
- Atoms
- Sections
 
## `/modules/src/client/src/components/atoms`
Contains a folder that sorts out your Atoms. In current stage those are
- `/form-elements` Every from element atom. This means `<input>`, `<textarea>` etc.
- `/typography` Atoms regarding typography. This means that you should be having a component for f.e. `<H1>` instead of putting a global style on the `<h1>` tag.
- `/common-elements` Everything that cannot get sorted with relation to the global HTML element.
 
Base Atom structure:
- `/assets`- Folder for your local assets. This means svgs, images, etc. that are subject to usage only in that Atom
- `/hooks` - Place for your Atom specific custom hooks
- `/quarks` - This folder could also be named styles. It's a place for local smaller Atom parts. This means that if you had components like `<Card>`, here you would have things such as `<CardHeader>`, `<CardBody>`.
- `/utils` - Folder where majority of Atom related logic will be stored. It should contain only common js functions & objects like dropdown options, regex condition, data formatting, etc.
- `.stories.tsx` - Folder here you put Storybook stories regarding your Atom.
- `.test.tsx` - Folder for tests regarding that Atom.
 
**Note: Do not create Atom groups and name them after where those Atoms are used. Atoms groups are supposed to be broad and should describe the types of Atoms.**
 
Correct naming ✅:
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
Folder to store your store. Due to this not having integrated its own store, you have to decide on further structure for yourself.
## `/modules/src/client/src/types`
Folder for your global types. Types regarding components should be in the folder with the component.
## `/modules/src/client/src/utils`
Utils folder consists of some repeatedly used functions that are commonly used in the project. It should contain only common js functions & objects like dropdown options, regex condition, data formatting, etc.
## `/modules/src/client/src/views`
This folder contains your Views. Everything that the user can access should be placed in here.
 
# Conventions
 
## Component structures
 
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
 
## Components structure
 
- Every component structure is its own folder. Reason as to why this is favored over having `/components` `/tests` `/stories` is quite simple. If you have 200+ components, it's almost impossible to quickly navigate. Another reason is, that this way single components are way easier to deprecate, move.
 
This means, that components should have following structure:
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
 
## Environment variables
 
To develop the application in the right way, almost not that many things are supposed to be static. And this means that you are going to need environment variables. Instead of getting the environment variables in every file, a file called `/env.ts` is included in the client module.
 
This file contains a function that gets the environment variable and depends on settings, if the variable doesn't exist either throws an error, or substitutes it for default value. All the environment variables should be sourced from this file.
 
 
# Project setup
 
One of the problems that will most certainly occur if the project is maintained by more than one person, will be development environment compatibility. You should do everything to make sure that your dev environment is as easy to set up as it is to deploy the project. There are multiple levels to this but every resolve around one thing. Your app has to run flawlessly on any widely available linux distribution. Reason for this is that all major operating systems can easily adapt to run linux core, but you mostly cannot do that with other operating systems.
 
Under ideal circumstances there should be a setup script that you can run from any OS and after waiting for a bit you get your dev environment. But this understandably is not a viable option for everyone, so I will list some sample approaches from most to least ideal.
 
## Development environment setup approaches
From best to worst:
- Remote development
- Level 2 hypervisors
- Level 1 hypervisors
- Subsystems
- Multi boot
- Running on host OS
 
### Remote development
 
This means that you have something like a Proxmox server and you give your developers VMs.
 
Pros
- Minimal amount of resources are used by devs PC, which allows you to give them less expensive computers
    - Additionally server equipment loses value way slower than personal equipment and consumes less power.
- Overall best security
    - If someones PC gets stolen you can prevent data compromisation by just blocking logins to that user
    - Central backup
    - Easily enforceable policies
    - Your security as well
    - If someone gets their work PC compromised it's not necessary that company data will get compromised as well.
 
Cons
- Large initial cost
- There has to be a person skilled in setting up such infrastructure and someone who will be able to maintain it.
- Everyone working on those VMs needs to have internet fast and stable enough to run a remote desktop. (This I'd eyeball to +1MB)
 
### Level 2 hypervisors
 
This means running your dev in containers such as running VirtualBox VMs, or Docker.
 
This is approach is included in docker-compose-dev.yml
 
Pros
- Drastically reduces initial cost compared to remote development.
- Aside from security benefits of remote development , you can still harness the ease of setup.
 
Cons
- From this point lower, you run editor and such on your host machine.
- You need a quite powerful system to run multiple dev environments with decent speeds.
    - As an example with I7-7700HQ, 16GB RAM you can expect to have your CPU and RAM both hovering 80-100% when you run 2 dev environments (client and backend both with live refresh).
 
### Level 1 hypervisors
 
At this level you are running level 1 hypervisor on the dev environment and are setting up the project directly on the OS running inside of the VM.
 
Pros
- Should in theory reduce performance necessary to run a dev environment as you don't have to run multiple large operating systems.
- This approach is relatively secure and versatile, because VMs for specific purposes can be made. You can thus have a VM for personal use, project 1, project 2 and the risk of corrupting your OS by something in your code is almost none, as you can just quickly replace a corrupted VM. Additionally reading data across VMs is not easy.
 
 
Cons
- Level 1 hypervisors are not exactly easy to set up.
 
### Subsystems
 
This means running a separate OS on your host and running your project on that separate OS. Example of this is WSL
 
At this point further we are getting into things that you should not even choose as an option. As there are not really pros anymore compared to the above except for less and less performance required to run it.
 
 
Cons
- Almost the same as level 2 hypervisors except for just about everything being harder and worse in about every aspect.
 
### Multi boot
 
This means having multiple OS installed on your computer and booting specific every time. I am personally less against this method than I am against the subsystems.
 
It's a cheap alternative to Level 1 hypervisor.
 
Pros
- It's quite easy to set up alongside Windows.
- In most instances it is also easy to completely delete from your system.
- It's just about as efficient as you can get with system resources.
 
Cons
- You need to restart into another OS if you need something that's on another OS.
- Your project is set up on that host operating system.
 
 
### Running on host OS
 
This is the most common method currently used and to me it's the straight up worst one. Reason for this being that if you for example work on 2 or more projects, one project might need Node version 12, another one Node version 16. Then if you need to quickly fix something on project 1, you have to go through an hour-long process switching versions of everything hoping it will work after you do so.
 
Pros
- There is just about no setup.
 
Cons
- It's a straight up nightmare if there are multiple apps you develop that need multiple versions of dependencies that run on the system.
- You will have to listen to "It works on my machine".
 
## Credits
 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).