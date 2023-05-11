# Pacer - Workout Tracker
This is a simple workout tracker app created to track running and cycling workouts for a user. 

## About the project
This project is my final exam project in the study Front-End Developement at Høyskolen Kristiania. The project is created to show the 
skills and competence I have acquired throughout the course this year and to apply this competence in one last summarizing project. 

With this workout tracker you can track your running and cycling workouts and get an overview of your traning progress. The user sets a weekly goal
and for each workout that is added or deleted their progress will be displayed in the progress section of the application. In the progress section
you can see the weekly progress, total progress, as well as a daily overview of each type of activity. For the sake of simplicy the weekly 
overviews do not reset every week, but this is something i would like to implement in the future.

Some features you will find in this project:
- Responsive layout depending on the device screen size
- Keyboard navigation
- A data base with all workouts

### The project is bulit with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Dekstop-first workflow
- JavaScript
- Sanity Studio
- Sanity Query API and GROQ
- Mapbox

## Process
### Thought process and MVP
When i was starting to work on the project i sat down and wrote down what i wanted the application to be able to do. It started if as a very 
ambitious project with a lot of features. Because of the limimted time frame and also the fact that we only were to use vanilla JavaScript i had to 
simplify it a lot. In the two boxes you see what i ended up with as the minimum viable product and in the bottom left corner you see some of
the features i had to discard. 

<img width="880" alt="Thought process and MVP" src="https://github.com/saratyldum/Pacer-workout-tracker/assets/98975412/b421274f-0fc2-4c0d-b742-32b7d250356c">

In the image below you can se how i translated the MVP into my Github Project later.

<img width="880" alt="MVP" src="https://github.com/saratyldum/Pacer-workout-tracker/assets/98975412/a3739dbf-2a31-426f-92da-f386178d9599">

### Workflow diagram
To get a better understanding of the flow of my project i made a simple workflow diagram showing when i needed what to happen. 
<img width="880" alt="Mind map of the project" src="https://github.com/saratyldum/Pacer-workout-tracker/assets/98975412/97cb21f9-16d1-45a3-88b4-ff52d6989f98">

### Data base model
Lasty I made an overview of my data base model and how i wanted it to be in Sanity. The data base is not very complex as it startes of empty before
the user adds workouts through the UI. There only exist one unique Settings schema and User schema as we only need one of each of these for the
application. The Workout schema on the other hand, is dynamically being added and removed by the user and they can create as many as they like.

<img width="599" alt="Database model" src="https://github.com/saratyldum/Pacer-workout-tracker/assets/98975412/60562c01-b377-40e0-8a96-7b4d9c823274">

## Links
- Github profile: https://github.com/saratyldum/
- This projects repository: https://github.com/saratyldum/Pacer-workout-tracker
