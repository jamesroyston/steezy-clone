# STEEZY Senior Fullstack Coding Challenge

## Context

Your task is to bring the next generation of dance education to users around the world! Your team has just handed you a spreadsheet full of dance classes they've curated and is counting on you to build an MVP to bring this idea to life. We need you to build an application that can allow our users the ability to view these dance classes and track their progress on this online dance platform! 

## Product Requirements

AUTHENTICATION  
As a user:
- ✅ I want to navigate to the /signup route to sign up with an email and a password
  - ✅ I want my email to be unique to me when I sign up. If a user already has the email I specified I should return to the signup page with some indication of an error
- ✅ I want to navigate to the /login route to login to my account with my email and password
  - ✅ I want the login page to show me some indication of an error if my login information is incorrect
  - ✅ I want the login page to have a link to the /signup page if I do not already have an account
- ✅ I want to be able to logout of my account

CLASSES INDEX  
As an unauthenticated user:
- ✅ I want to navigate to the /classes route to see what classes are available. (/classes will act as the homepage)
- ✅ I want to see a login button indicating that I am not authenticated
- ✅ I want to be redirected to the login page if I try to view one of the classes by clicking on the thumbnail
  
  when I am viewing or searching the available classes
  - ✅ I want to see the first 9 classes available, with the ability to paginate (9 classes per page)
  - ✅ I want to see the title of the class, the instructor, the level, the class thumbnail, and the song used in the class
  - ✅ I want to search the entire catalog of classes. I want to search by title, instructor, level, or song
    - ✅ I want to search without worrying about case sensitivity
    - ✅ I want my search results to show partial results e.g. searching "Anne" will return "Leanne" and "Anne"
  - ✅ I want my search results to be indexed 9 classes at a time

As an authenticated user:
- ✅ I want to navigate to the /classes route to see what classes are available. (/classes will act as the homepage)
  - ✅ I want /classes to be my homepage
  - ✅ I want to see a loading state when I fetch classes
- ✅ I want to enter the class player when I click on a class thumbnail  

  when I am viewing or searching the available classes
  - ✅ I want the search functionality to mirror the unauthenticated user flow

CLASS PAGE  
As an authenticated user:
- ✅ I want to navigate to the /classes/{ID} route for each class
- ✅ I want to play the video
- ✅ I want to pause the video
- ✅ I want to see a timestamp of how many seconds I have elapsed in the video
- ✅ I want to see a timestamp of how many seconds I have remaining in the video
- ✅ I want to see a progress bar representing where I am in the video
- ✅ I want to be able to seek to different parts of the video by clicking on the progress bar

ANALYTICS  
As a user:
- ✅ I want the application to track what timestamp I last left off in the class
- ✅ I want the application to track what percentage of the class the user actually watched
  - ✅ Case 1: User repeatedly watches the first 10% of the video and then closes the class player. The progress should only be 10%.
  - ✅ Case 2: User watches the first 15% of the video. The user seeks to 10% timestamp and watches up to 25%. The user has only watched a total of 25% of the video. The total progress should be 25%.
  - ✅ Case 3: User watches the first 10% and the last 10% of the video. The user has watched a total of 20% of the video. The total progress should be 20%.
- ✅ I want the application to track how much time the user actually spent on the video. This includes play time and pause time

NAVIGATION HEADER  
As a user:
- ✅ I want to navigate back to the homepage (/classes) wherever I am on the app
- ✅ I want to logout of the application

## Your Goal

Create a fullstack application that satisfies as many product requirements as you can for your team above. Please list any assumptions you took while building your application in the `Assumptions` section below. Feel free to implement any nice-to-have requirements or styling (please add these to Assumptions as well). 

To achieve this you will need to utilize the CSV/spreadsheet data provided in this repository. The CSV should be dumped into some kind of data store and accessed through an API. Feel free to use a database you are most comfortable with.

For the layout of each page, please refer to the [provided wireframes here on Figma](https://www.figma.com/file/2PJs4oGfknIqokVHVN9xLH/%5BWEB%5D-Classes-Take-Home-Test?node-id=1060%3A178). Your designs do not need to mirror the exact styling of the mockups. As mentioned above, you are also free to design your own navigation header. Feel free to keep it as simple as possible or flex your design muscles. Use Figma as an inspirational reference. 

You are welcome to use any type of boilerplate or frameworks for your application as long as it meets the technical requirements below. We encourage you to use your favorite packages and tools to build a solid application, but try to keep it as simple as possible!

You can assume that you do not have to support legacy browsers. Feel free to use modern features such as **fetch** or **flexbox or css-grids**. 

## Technical Requirements
- React
- Node (Express, preferred, but not required)
- Any database of your choosing
- Tests are a plus, but not required
- CSSinJS is a plus: styled-components, styled-system, ...

## Instructions

- Clone this repository.
- Build a performant, clean and well-structured solution.
- Deploy the app using a service of your choice.
- Remember to have fun with it and try to commit as early and as often as possible!
- When you're finished please send us instructions on how to access your service and download a ZIP of the project using the Github GUI and send us an email with the attachment to notify us.
- Please provide instructions on how to run your application in the `How To Run` section below.

We recommend taking no more than a day to complete this exercise. Best of luck and happy coding!

## How to Run  

1. Unpack ZIP
2. Change directory into the resulting folder: `cd steezy-coding-challenge-master`
3. Install dependencies: `npm install`.
4. Add new file called `.env` and add the following:
    ```$xslt
    PORT=5001
    DB=mongodb+srv://dbUser:dbPasswordYup@cluster0.c1jcn.mongodb.net/steezyDb?retryWrites=true&w=majority
    SECRET=potato
    ``` 
   and save.
8. Run server: `npm start`. Alternatively, you can run: `npm run dev` if you're interested in playing with the server-side code while running the app. 
7. Open new tab in terminal, change directory to the client folder: `cd steezy-coding-challenge-master/client`.
6. Install client-side dependencies: `npm install`.
9. Run client: `npm start`.
10. You should now see the app running on `localhost:3000` in your browser. 


## Assumptions

- concurrently would be nice to add, but I felt it was unnecessary overhead for development, so running the app will require two terminals, fyi
- Since I need nav header, I might as well borrow some assets like logos and whatnot from steezy.co, and use the main site for inspo
- needs to be responsive
- using react-player for video handling
- added favicon
- added username display in navbar
- added single margin to start and of pagination for easy jumping to first, last, or next/previous 5 pages

## Scratchpad for brainstorming
- will be using some sort of react video player package
    - found a few good ones that record state of video playback
        - can store these values in db for each video model
- styled components
    - need to add babel-plugin-macros for component names in dom tree (_nice to have for debugging_). 
- create-react-app scaffold
- express
- mongoose / mongodb
- serving on mongoAtlas and heroku
- only worried about 1080p resolution for mvp
- not going to worry about branching because it's unnecessary overhead for this project
- starting point: 
    - I want to start with the mockups. I feel like a basic layout won't take too long to accomplish based on the figma screens
    - need to review auth gist I built a while back, should be an easy drop in for auth that supports signup/login/logout/unique accounts
    - will need to decide whether to store images in db with gridFS or just use the string of image name and dynamically select an asset that lives in the client
- app will need to be responsive probably
- for the data analytics, especially case 3, I am assuming that I only need to determine the percent watched on a per visit basis. 
    - Further explained, I'm only sending my start and stop ranges to the backend per visit to a classes/{id} route.
