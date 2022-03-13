import { Axios } from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [movieName, setMovieName] = useState("");
  const [moviewReview, setMovieReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);

  const [newMovieReview, setNewMovieReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieReviewList(response.data);
    });
  }, []);

  const submitReview = async () => {
    await Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: moviewReview,
    });
    setMovieReviewList([
      ...movieReviewList,
      {
        movieName: movieName,
        movieReview: moviewReview,
      },
    ]);
  };

  const deleteReview = (movieName) => {
    Axios.delete(`http://localhost:3001/api/delete/${movieName}`);
  };

  const updateReview = (movieName) => {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movieName,
      movieReview: newMovieReview,
    });
    setNewMovieReview("");
  };

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>

      <div className="form">
        <label>Movie Name:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label>Review:</label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setMovieReview(e.target.value);
          }}
        />

        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val) => {
          return (
            <div className="card">
              <h1>movieName :{val.movieName}</h1>
              <p>Movie Review {val.movieReview}</p>

              <button onClick={() => deleteReview(val.movieName)}>
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewMovieReview(e.target.value);
                }}
              />
              <button onClick={() => updateReview(val.movieName)}>
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
