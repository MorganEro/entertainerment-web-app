# Frontend Mentor - Entertainment web app solution

This is a solution to the [Entertainment web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/entertainment-web-app-J-UhgAW1X). Frontend Mentor challenges help you improve your coding skills by building realistic project.

## Table of contents

- [Frontend Mentor - Entertainment web app solution](#frontend-mentor---entertainment-web-app-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Navigate between Home, Movies, TV TvSeries, and Bookmarked Shows pages
- Add/Remove bookmarks from all movies and TV tvseries
- Search for relevant shows on all pages
- **Bonus**: Build this project as a full-stack application
- **Bonus**: If you're building a full-stack app, we provide authentication screen (sign-up/login) designs if you'd like to create an auth flow

### Screenshot

![](/public/Screen%20Shot%202024-12-16%20at%2013.25.28.png)
![](/public/Screen%20Shot%202024-12-16%20at%2013.25.53.png)
![](/public/Screen%20Shot%202024-12-16%20at%2013.26.25.png)

### Links

- Solution URL: (https://github.com/MorganEro/entertainment-web-app)
- Live Site URL: (https://fm-entertainment-web-app.netlify.app)

## My process

1. Project Initialization:
   -Created the Vite React project and set up eslint.

2. Component Creation and Styling:
   -Developed the necessary components to display the content within the layout.
   -Created Styled components as needed to style the components.
   -Designed and styled the AppLayout and created routes in my App.jsx.
   -Implemented and styled the PageNotfound route and the ErrorFallBack component.

3. Show Display:
   -Created a supabase project and a shows table.
   -created and imported a CSV for the show data from the data file provided
   -created the supabase, show, and auth services for fetching data.
   -Styled the show components and the different design details from the figma file

4. Functionality Implementation:
   -Added interactivity to the components, starting with the navigation.
   -Set up the RLS policies for supabase and added authentication for users
   -Integrated functionality for the user to login, logout, and signUp.
   -Created protected route, created and designed settings section for user update.
   -Implemented the design and functionality for the Trending page's scrolling.
   -Added functionality to bookmark shows.
   -Refactored the code to adhere to the DRY (Don't Repeat Yourself) principle.

5. Responsive Design:
   -Created views optimized for different screen sizes.
   -created blur images and added them for each show in supabase.
   -Conducted thorough reviews to ensure no minor details were overlooked.

6. Performance and Accessibility:
   -Utilized Lighthouse to audit and improve the application's accessibility and performance.
   -Made necessary adjustments based on Lighthouse's recommendations to ensure a high-quality user experience.
   -Implemented code splitting with React-lazy and Suspense

### Built with

- Semantic HTML5 markup
- CSS custom properties
- JavaScript
- Vite React
- Styled-Components
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

1. How to create a vite-react application
2. How to use imagekit.io for image optimization
3. How to use supabase for authentication/authorization and storage
4. Improved skills in utilizing browser development tools, with a focus on Firefox's DevTools for its comprehensive and informative debugging capabilities.
5. Learned how to use react-hook-form
6. Took a deep dive into the world of react

### Continued development

I want to continue to grow my knowledge of React and start working with next.js and typescript.

## Author

- Website - [Morgan Ero] (https://github.com/MorganEro)
- Frontend Mentor - [Morganero](https://www.frontendmentor.io/profile/MorganEro)
