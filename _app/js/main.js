import loadMap from "./modules/loadMap.js";
import getUserPosition from "./modules/getUserPosition.js";
import workoutForm from "./modules/workoutForm.js";
import weeklyProgress from "./modules/weeklyProgress.js";

// mapbox(); få denne til å kjøre herfra, ikke fra userlocation
getUserPosition();
workoutForm();
weeklyProgress();
