import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react"
import languages_list from "../helper/language_list";
import { api_key, mainUrl } from "./useAxiosAll";

const sortTypesMovie = {
  0: "popularity.desc",
  1: "release_date.desc",
  2: "original_title.desc",
  3: "original_title.asc"
}

const sortTypesTv = {
  0: "popularity.desc",
  1: "first_air_date.desc",
  2: "vote_average.desc",
  3: "vote_average.asc"
}

//Used for specific filters
export const useAxiosFilter = (
  filterType: "general" | "language",
  sort: 0 | 1 | 2 | 3,
  genre: false | string,
  type: "movie" | "tv",
  // languageType?: "original" | "dubbing" | "subtitles",
  language?: null | string,

) => {
  const [loading, setLoading] = useState(true);
  const [filteredResults, setFilteredResults] = useState<any>({})

  const getData = async () => {
    let requestArr: (Promise<AxiosResponse<any, any>> | undefined)[] = [];
    let responseName: string[];

    //general sort
    let sorting = `&sort_by=${type === "movie" ? sortTypesMovie[sort] : sortTypesTv[sort]}`
    let genreFilter = `&with_genres=${genre}`
    // console.log(sort);

    //Language sort
    let lang = languages_list.filter((lang) => lang.name == language);
    let languageOption = `&language=${lang[0].code}`
    // let languageTypeOption; //No search criteria

    let showType = type === "movie" ? "discover/movie" : "discover/tv"
    let page = "&page=" + (Math.floor(Math.random() * 5) + 1)
    let url = mainUrl + showType + api_key + sorting + (genre === false ? "" : genreFilter) + languageOption + page;//Here I was
    console.log(url);

    // https://api.themoviedb.org/3/movie/610150?api_key=872ece6f49b1fd7eebe81f916bcf1fdb


    const request1 = axios.get(url)
    requestArr = [request1];
    responseName = ["data"]

    // console.log("Type", type);

    await axios.all(requestArr)
      .then(axios.spread((...responses) => {
        // console.log(responseName, responses);
        setFilteredResults(
          responses[0]?.data.results,
        );

        setLoading(false);

      })).catch(errors => {
        // console.log("Error", errors)
      })
  }

  useEffect(() => {
    // console.log("reload")
    getData();
    setLoading(true);
  }, [filterType, sort, genre, type, language])

  return { loading, filteredResults };
}










