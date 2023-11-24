import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const nowPlayingMovies = useSelector(
    (store) => store.movies?.nowPlayingMovies
  );
  if (!nowPlayingMovies) return;
  return (
    <div className="bg-black">
      <div className="-mt-28 z-20 relative">
        <MovieList title={"Now Playing"} movies={nowPlayingMovies} />
        <MovieList title={"Trending Now"} movies={nowPlayingMovies} />
        <MovieList title={"Popular"} movies={nowPlayingMovies} />
        <MovieList title={"Newly Added"} movies={nowPlayingMovies} />
        {/* 
        MovieLists
            - Popular
            - Now Playing
            - Trending now
    */}
      </div>
    </div>
  );
};

export default SecondaryContainer;
