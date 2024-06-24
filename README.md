https://github.com/artofpilgrim/portfolio-template/assets/172502597/18695e55-b8c7-4bcd-9e52-bec77a09308c

# Brief Intro
Hey everyone! I wanted to make a super simple html/css/javascript portfolio website template that allowed the user more control over what is presented on their portfolio and for free, and so here we are. I've simplified the customisation so that you don't really ever have to touch any code at all (unless you want to!?). There are only two folders you'll need to touch which are `Config` and `Projects`. Config contains all your information in the form of various .txt files which are all explained below, and Projects contain all your project folders! It's incredibly simple and takes about 2-4 minutes to set up a new project.

The template is designed to work via [Github Pages](https://pages.github.com/) or [Firebase](https://firebase.google.com/). It's entirely free. The only thing you should pay for is your domain name, which should be super cheap. As an example, I've set my own one up using the same process as below on Github Pages. https://artofpilgrim.github.io/ 

## Brief Workflow

Afer getting setup (below) this is the workflow. 
1. Copy and paste a Project Template Folder.
2. Rename new Project Folder.
3. Rename HTML.
4. Update `description.txt`. Include html name and thumbnail.
5. Add images/videos to `media.txt`.
6. Add stats to `stats.txt`.
7. Go into `Config/projects.txt` and add the name of the project folder to the list.
8. Commit and push origin via Github Desktop.

Look here's even a video showing the process on adding new artwork.

https://github.com/artofpilgrim/portfolio-template/assets/172502597/5a1b7646-3757-4dce-8149-396614915a33


# Getting Setup

To setup your own portfolio using the template, first make sure to download the template files from either the green code button above (look for Download Zip) or [download it directly here](https://github.com/artofpilgrim/portfolio-template/archive/refs/heads/main.zip). Then set up your own [github account](https://github.com/join) and download [github desktop](https://desktop.github.com/), if you haven't already, and follow the [Github Pages](https://pages.github.com/) instructions for Github Desktop. Once you have followed those instructions, move the contents of the template (you can delete the readme.md from yours) into your newly created github repo desktop folder you just made. Whenever you make a change to these files or add anything, Github Desktop will notice it and you can commit these changes to your website. Commit and then push. See below on how to struture your folders.

![24-06-24_GitHubDesktop_vWE9HfMPXs](https://github.com/artofpilgrim/portfolio-template/assets/172502597/f8c8b2fa-b613-48ee-ba0c-89fcde1f7f9d)

Whenever you make changes, and you're happy with them, just commit and push those changes to github. It's actually pretty satisfying!

## Structure
It's important to keep the structure consistent to the template.

![image](https://github.com/artofpilgrim/portfolio-template/assets/172502597/03ab554a-8760-4d78-b432-da5ea7540c43)

the index and about htmls should be in the root folder for the styling to be applied properly. So if you've made a folder structure like this:

![image](https://github.com/artofpilgrim/portfolio-template/assets/172502597/6e6a1464-b6bd-4914-bcf6-95e2d8a78379)

Then it's not going to be referenced properly, unless you change it yourself. 

## Software Needed?
Notepad? At the very minimum Notepad. But i would highly suggest for the smoothest workflow is to download [VSCode](https://code.visualstudio.com/download) and install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension so that you can preview the changes before committing them to github, as you may have to wait a couple of minutes before it finishes deploying new changes. They're both free but that's it. Nothing else. 

# From Template to Portfolio
Below you'll find explanations on how to properly customise the template and make your portfolio your own using the .txt files found in the `Config` folder. 

## User Information

![uip](https://github.com/artofpilgrim/portfolio-template/assets/172502597/7c0f0671-9a48-468a-81e8-086a239c0165)


`Config/userinformation.txt` contains all your information. Who you are, where you work, your country and what you look like. It's pretty darn simple. Just open userinformation.txt and you will be greeted with the following: 

![image](https://github.com/artofpilgrim/portfolio-template/assets/172502597/b335cdf4-af55-4dad-977f-ee288919a113)

Replace the template text with your information. The order of the first 4 (avatar/name/role@company/location) need to remain the same for it to make sense and styling. The social links below can be in whatever order you wish. I'd recommend sticking to 6 max for styling purposes but you can have more if you please but it might look odd. There is support for 23 socials in total, which are as follows:

![image](https://github.com/artofpilgrim/portfolio-template/assets/172502597/80cbab4c-887e-4d56-891d-8909954f6b7a)


The user information is universal, so wherever there is userinformation like in your about page and project pages, it'll appear there.
And that's it really. Pretty straight forward, right? Make sure to save the file once done editing.

## Your Summary

![image](https://github.com/artofpilgrim/portfolio-template/assets/172502597/c8d52b13-2dba-406b-9177-f30017d144d2)

Your summary appears in your About page. It's just a summary of who you are and to change this simply open `summary.txt` that, like all configuration files, exists in the Config folder. `Config/summary.txt`. Just replace the Lorum Ipsum template text with your own and save. 

## Software
`Config/software.txt` holds all the software you use. I've included a bunch already as an example. They're separated by lines just so it's clear and simple to update. Make sure to save the file once done editing.

## Skills
`Config/skills.txt` like software holds all the skills you possess. I've included a bunch already as an example. They're separated by lines just so it's clear and simple to update. Make sure to save the file once done editing. 

## Recommendations

![rec](https://github.com/artofpilgrim/portfolio-template/assets/172502597/862f7c35-0fce-4b57-aad3-f8267ac90e5e)

`Config/recommendations.txt` holds any and all recommendations you've received from your peers. It's somewhat familiar to your userinformation but has some extra structure/markdown to remember. 
![image](https://github.com/artofpilgrim/portfolio-template/assets/172502597/cc505574-1dca-445f-8426-6b3824dc6e13)

As you can see we have `---` acting as a separator from the other recommendations. It simply allows you to create multiple recommendations in one file, the `---` tells the code that there's a new recommendation below and should be considered a new one, if there's anything below it. Make sure to save the file once done editing.

## Productions

![image](https://github.com/artofpilgrim/portfolio-template/assets/172502597/51421dae-0160-4cb7-b9f0-549bee433b90)

`Config/productions.txt` will hold all of the productions that you have worked on and want to display. Like with recommendations, each production should be separated with 3 dashes `---`.
![image](https://github.com/artofpilgrim/portfolio-template/assets/172502597/dc20ad27-e02b-4675-95d5-10953d4ba381)

Again, it's pretty straightforward. I've added a bunch of template so you can get the idea. Role, company, date (2020 - present or 2016 - 2023 for example), thumbnail url, description. 
Make sure to save the file once done editing.

## Defining Projects
`Config/projects.txt` Contain a list of all your projects and adding more is really simple. When you create new Project folders, just copy the project folder name and populate the list, it's that simple. If you don't it won't show up on your landing page then don't include the project name. This could be a good way to prepare a project for a later date or hide projects until you add the project folder name into the list.  
- Example Project
- BigMegaGunExample

The order here defines the order of the thumbnails on the landing page. So, order how you want.

# Adding New Project/Artwork
I've included two example projects. The contents are identical, the only difference is their project name. When you add a new project folder, updated `Config/project.txt` with the project folders name for it to show. All you have to do is copy and paste an existing project and change all the stuff inside so it's relevant. Let's have a rundown on the projects contents and how to add new artwork.

![image](https://github.com/artofpilgrim/portfolio-template/assets/172502597/f166c183-bec4-449b-9643-f52e7a7ec72f)

## HTML
First, you have the html. The only thing you need to worry about is updating the html name to whatever you want. `bigmegagun.html` for example. You don't actually have to touch the contents as `description.txt`, `media.txt` and `stats.txt` do the rest of the work. Keep a note of the name for later, because you'll be adding it to your description.txt. The only time you should touch the html is if you want to update the favicon and i suggest that if you do want to do that, to do it before you add a bunch of projects. Otherwise you'll have to copy+paste the contents into each project html.

### Updating Favicon
For this, you'll need to edit the html. And just above the `</head>` you'll see the link to the image file. By defualt it's my one, which is just a yellow P. `Pilgrim`, yes but also `Portfolio`. It exists in the Resources folder. Replace it if you want and update the name. IIRC, it just needs to be a png. 

## Adding Media
### Images & Videos
`media.txt` will hold all your media for your project. Adding media to your project is incredibly easy because it's URL and/or local file storage based. Meaning you can link urls or just add the image file name - just make sure the image file exists within the project folder. So, if you're just using urls, i suggest finding some image hosting website like postimages.org or dropbox and get the direct links and just paste them in - imgur doesn't work, sadly. Currently there's support for png/jpeg/jpg/gif/MP4/webm.

### Before & After Sliders
You can create before and after sliders by adding two image urls to one line separated by ` // `. For example, `https://beforepic.png // https://afterpic.png`. It's that easy. Make sure that the images share the same dimensions otherwise it's gonna look pretty whack. 

### Sketchfab
Yes Sketchfab is supported! And it's even simpler than other portfolio websites. All you need is the url for the artwork [like this](https://sketchfab.com/3d-models/spas12-remake-rust-42f776f8c91b42a9bfd43452abe3dfa0), not the direct embed link and the code will do the rest. 

## Adding a Description
`description.txt` holds all main informtion about the artwork. Project name/title, Description, Software used, project thumbnail and the html to be referenced. 
![image](https://github.com/artofpilgrim/portfolio-template/assets/172502597/890516be-5cc1-46a4-8cc4-06f536753319)

Again, it's pretty straightforward. The one thing i'd recommend to check over, is that you've properly referenced the projects html. It just tells the code to inject all this information into the html. Otherwise it won't show anything. I tend to make the project folder, copy the new name and paste it straight into the description.txt. 

A nice little thing with the thumbnails too is that it recognises the type of media within the project.

![24-06-24_msedge_PD4MJSx64Q](https://github.com/artofpilgrim/portfolio-template/assets/172502597/72d2521d-f53b-4c34-890d-795ddcbe9739)

So if you have multiple images, mp4, youtube and sketchfab files in your project then you'll get some nice little icons in the top left to show the people viewing your portfolio what's inside. 

### Software Used
Just update the software separated by commas in the appropriate place within the description.txt and it'll populate the list in the html. Easy.

## Adding Statistics
Statistics is somewhat 3d orientated. It does need expanding upon and so i would love to hear what to include if you have input! The following stat list are as follows:
- Triangles:
- Materials:
- Texture Size:
- Texel Density:
- Workflow:
- Target Engine:
- Collaborators:

You don't have to have all of these, if any are left empty, they wont be included. Try and keep this short and sweet. This allows a quick glance at some useful stats on your artwork. If you do want to expand on any info just encapsulate that info in brackets `()`.

![24-06-24_msedge_TGcUJcLVx3](https://github.com/artofpilgrim/portfolio-template/assets/172502597/a58f055b-b8c4-4993-8ee5-93eb79dfad92)

You'll get a neat (i) icon next to it that acts as a custom tooltip. 

# Mobile Support? 
Yes, it just uses media queries - css code that changes the way webpages are displayed on smaller devices and works pretty great so far. 

https://github.com/artofpilgrim/portfolio-template/assets/172502597/026df619-81b7-463f-b594-736c7a49a23e

# Big Thanks! 
Thanks for using this, if it's been helpful stop on by [X/Twitter](https://x.com/ArtOfPilgrim) where i'm fairly active and drop me a message or on my discord [Pilgrims' Lounge](https://discord.com/invite/WCnQ5bQa6Q) and join over 1500 others! 

Peace and God bless. 
