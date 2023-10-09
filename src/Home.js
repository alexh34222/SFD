import "./assets/css/home.css";
import CurrentCalls from "./CurrentCalls";

// Funnction for retrieving the current calls from the Seattle Fire Department



// Function for displaying the current calls




function Home() {
  return (
    <div>
      <div id="header">
        <h1 className="title">SFD LIVE DISPATCH</h1>
        <p className="disclaimerText">
          *THIS SITE IS NOT AFFILIATED WITH SEATTLE FIRE DEPARTMENT OR THE CITY
          OF SEATTLE, IT WAS CREATED BY A THIRD PARTY*
        </p>
      </div>
      <div id="body">
        <CurrentCalls />
      </div>
    </div>
  );
}

export default Home;
