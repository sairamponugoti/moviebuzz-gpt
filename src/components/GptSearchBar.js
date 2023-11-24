import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovies } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.appConfig.selectedLang);
  const searchText = useRef(null);
  const handleGptSearchClick = async () => {
    const gptQuery = `Act as a Movie Recommendation system and sugest some movies for the query: ${searchText.current.value} 
    and only give me names of 5 movies, comma seperated like the example result given ahead. 
    Example Result: Darling, Mirchi, Bahubali, Salaar, Chatrapathi`;

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    if (!gptResults.choices) return;
    const gptMovieList = gptResults.choices?.[0]?.message?.content.split(",");
    const tmdbPromises = gptMovieList.map((movie) =>
      searchTmdbMovies(movie.trim())
    );
    const tmdbMovieResults = await Promise.all(tmdbPromises);
    dispatch(
      addGptMovies({
        gptMovieList: gptMovieList,
        tmdbMovieResults: tmdbMovieResults,
      })
    );
  };

  const searchTmdbMovies = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={searchText}
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          className="p-4 my-4 mx-2 bg-red-600 hover:bg-opacity-80 rounded-lg col-span-3"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
