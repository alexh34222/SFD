import "./assets/css/home.css";
import CurrentCalls from "./CurrentCalls";

function Home() {
  const refreshPage = () => {
    window.location.reload(true);
  };

  return (
    <div>
      <div id="header">
        <h1 className="title">SFD LIVE DISPATCH</h1>
        <p className="disclaimerText">
          *THIS SITE IS NOT AFFILIATED WITH SEATTLE FIRE DEPARTMENT OR THE CITY
          OF SEATTLE, IT WAS CREATED BY A THIRD PARTY* <br></br>
          <br></br>
          *TO UPDATE THE CALL LIST, PLEASE REFRESH THE PAGE - We are looking into making both past and current calls show differently as we are limited by our API access. Updates coming soon!*
        </p>
        <button onClick={refreshPage}>Refresh Page</button>
      </div>
      <div id="body">
        <CurrentCalls />
      </div>
    </div>
  );
}

export default Home;
