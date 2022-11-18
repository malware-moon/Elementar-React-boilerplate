# Elementar React boilerplate

## Table of content

1. [Scalability](#)
2. [Linting](#)
3. [Compatibility](#)
4. [Documentation](#)
5. [Version management](#)
5. [Project setup](#project-setup)
 
## This is still still WIP
 
This documentation is more of brainstorming rather than anything else.
 
 
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