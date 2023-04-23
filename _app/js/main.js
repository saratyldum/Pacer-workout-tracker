import loadMap from "./modules/loadMap.js";
import getUserPosition from "./modules/getUserPosition.js";
import workoutForm from "./modules/workoutForm.js";
import weeklyProgress from "./modules/weeklyProgress.js";

// mapbox(); få denne til å kjøre herfra, ikke fra userlocation
getUserPosition();
workoutForm(); //return distance whenever a new workout is added
weeklyProgress(); //use distance to add onto progress bar
