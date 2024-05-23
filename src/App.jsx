import { useState } from "react";
import "./App.css";
import Dateformat from "./components/sidebar/dateFormat";

function App() {
  const [usernames, setUsernames] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultWikipedia, setResultWikipedia] = useState(
    "the result will be displayed here"
  );
  const [resultCount, setResultCount] = useState(-1);
  const [resultCommons, setResultCommons] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulation de résultats après une requête
    setTimeout(async () => {
      setLoading(false);
      let result = await fetch(
        `https://fr.wikipedia.org/w/api.php?action=query&list=usercontribs&ucuser=${usernames}&uclimit=500&ucprop=title|timestamp&format=json&origin=*`
      )
        .then((response) => response.json())
        .then((data) => {
          setResultWikipedia(data.query.usercontribs);
          setResultCount(resultWikipedia.length);
        });

      setResultCommons("Résultats Commons...");
    }, 2000);
  };

  <Dateformat />
  
  return (
    <div className="container">
      <h1>Comparer les contributions Wikipedia </h1>
      <div className="form-container">
        <form id="userForm" onSubmit={handleSubmit}>
          <label htmlFor="usernames">
            Noms d'utilisateur (séparés par des virgules):
          </label>
          <input
            type="text"
            id="usernames"
            name="usernames"
            value={usernames}
            onChange={(e) => setUsernames(e.target.value)}
            required
          />

          <label htmlFor="startDate">Date de début:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          <label htmlFor="endDate">Date de fin:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />

          <button type="submit">Comparer</button>
        </form>
        <div>
          {loading && <div id="loader" className="loader"></div>}
          <div id="resultWikipedia">
            {resultCount < 0 ? (
              "the result will be displayed here"
            ) : resultWikipedia.length == 0 ? (
              "there is not result for that user"
            ) : (
              <>
                <h4 className="resultTitle">
                  The result for the user {usernames} are{" "}
                  {resultWikipedia.length}
                </h4>
                <div className="result">
                  <h5>user</h5>
                  <h5>Title</h5>
                  <h5>Date </h5>
                </div>
                {resultWikipedia?.map((el, index) => (
                  <div key={index} className="result">
                    <h6> {el.user}</h6>
                    <h6>{el.title}</h6>
                    <h6>{dateformat(el.timestamp)}</h6>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
