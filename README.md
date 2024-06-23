# Configuration
Below you'll find explanations on how to properly customise your portfolio using the .txt files found in the `Config` folder. 

## User Information
To define who you are, where you work, your country and what you look like. It's pretty darn simple to do. Just open `userinformation.txt` in the Config folder which can be found here `Config/userinformation.txt` and you will be greeted with the following: 

![image](https://github.com/artofpilgrim/portfolio-template/assets/172502597/b335cdf4-af55-4dad-977f-ee288919a113)

The order of the first 4 (avatar/name/role@company/location) need to remain the same for it to make sense. The social links below can be in whatever order you wish. I'd recommend sticking to 6 but you can have more if you please. There is support for 23 socials. Which are as follows:
- x/twitter
- facebook
- discord
- instagram
- youtube
- linkedin
- artstation
- github
- wordpress
- vimeo
- behance
- playstation
- xbox
- vk
- steam
- tumblr
- threads
- patreon
- twitch
- mixer
- mastodon
- mailchimp
- email

The user information is universal, so wherever there is userinformation like your about page and project pages, it'll appear there.
And that's it really. Pretty straight forward. Make sure to save the file once done editing.

## Your Summary
Your summary appears in your About page. It's just a summary of who you are and to change this simply open `summary.txt` that, like all configuration files, exists in the Config folder. `Config/summary.txt`. Just replace the Lorum Ipsum template text with your own and save. 

## Software
`Config/software.txt` holds all the software you use. I've included a bunch already as an example. They're separated by lines just so it's clear and simple to update. Make sure to save the file once done editing.

## Skills
`Config/skills.txt` like software holds all the skills you possess. I've included a bunch already as an example. They're separated by lines just so it's clear and simple to update. Make sure to save the file once done editing. 

## Recommendations
`Config/recommendations.txt` holds any and all recommendations you've received from your peers. It's somewhat familiar to your userinformation but has some extra structure/markdown to remember. 
![image](https://github.com/artofpilgrim/portfolio-template/assets/172502597/cc505574-1dca-445f-8426-6b3824dc6e13)

As you can see we have `---` acting as a separator from the other recommendations. It simply allows you to create multiple recommendations in one file, the `---` tells the code that there's a new recommendation below and should be considered a new one, if there's anything below it. Make sure to save the file once done editing.

## Productions
`Config/productions.txt` will hold all of the productions that you have worked on and want to display. Like with recommendations, each production should be separated with 3 dashes `---`.
![image](https://github.com/artofpilgrim/portfolio-template/assets/172502597/dc20ad27-e02b-4675-95d5-10953d4ba381)

Again, it's pretty straightforward. I've added a bunch of template so you can get the idea. Role, company, date (2020 - present or 2016 - 2023 for example), thumbnail url, description. 
Make sure to save the file once done editing.

## Defining Projects
`Config/projects.txt` Contain a list of all your projects and adding more is really simple. When you create new Project folders, just copy the project folder name and populate the list, it's that simple. If you don't it won't show up on your landing page. This could be a good way to prepare a project for a later date or hide projects until you add the project folder name into the list.  
- Example Project
- BigMegaGunExample

The order here defines the order of the thumbnails on the landing page. So, order how you want.

# Adding New Project/Artwork
I've included two example projects. The contents are identical, the only difference is their project name. When you add a new project folder, updated `Config/project.txt` with the project folders name for it to show. Let's have a rundown on the projects contents and how to add new artwork.

![image](https://github.com/artofpilgrim/portfolio-template/assets/172502597/f166c183-bec4-449b-9643-f52e7a7ec72f)

## HTML
First, you have the html. The only thing you need to worry about is updating the html name to whatever you want. `bigmegagun.html` for example. You don't actually have to touch the contents as `description.txt`, `media.txt` and `stats.txt` do the rest of the work. Keep a note of the name for later, because you'll be adding it to your description.txt. The only time you should touch the html is if you want to update the favicon and i suggest that if you do want to do that, to do it before you add a bunch of projects. Otherwise you'll have to copy+paste the contents into each project html.

### Updating Favicon
For this, you'll need to edit the html. And just above the `</head>` you'll see the link to the image file. By defualt it's my one, which is just a yellow P. `Pilgrim`, yes but also `Portfolio`. It exists in the Resources folder. Replace it if you want and update the name. IIRC, it just needs to be a png. 

## Adding Media
### Images & Videos
`media.txt` will hold all your media for your project. And adding media to your project is incredibly easy because it's URL based. So, i suggest finding some image hosting website like postimages.org or dropbox and get the direct links and just paste them in - imgur doesn't work, sadly. Currently there's support for png/jpeg/jpg/gif/MP4 and i think webm but i haven't tested it. 

### Before & After Sliders
You can create before and after sliders by adding two image urls to one line separated by ` // `. For example, `https://beforepic.png // https://afterpic.png`. It's that easy. Make sure that the images share the same dimensions otherwise it's gonna look pretty whack. 

### Sketchfab
Yes Sketchfab is supported! And it's even simpler than other portfolio websites. All you need is the url for the artwork [like this](https://sketchfab.com/3d-models/spas12-remake-rust-42f776f8c91b42a9bfd43452abe3dfa0), not the direct embed link and the code will do the rest. 

## Adding a Description
`description.txt` holds all main informtion about the artwork. Project name/title, Description, Software used, project thumbnail and the html to be referenced. 
![image](https://github.com/artofpilgrim/portfolio-template/assets/172502597/890516be-5cc1-46a4-8cc4-06f536753319)

Again, it's pretty straightforward. The one thing i'd recommend to check over, is that you've properly referenced the projects html. It just tells the code to inject all this information into the html. Otherwise it won't show anything. I tend to make the project folder, copy the new name and paste it straight into the description.txt. 

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




