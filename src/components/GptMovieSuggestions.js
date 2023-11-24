import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { gptMovieList, tmdbMovieResults } = useSelector((store) => store.gpt);
  if (!gptMovieList) return null;
  return (
    <div className="p-4 m-4 bg-black bg-opacity-80">
      <div>
        {gptMovieList.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={tmdbMovieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
