import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { sortData } from "./sortData";

export const api_key = "?api_key=";

export const mainUrl = "https://api.themoviedb.org/3/";

const urlMainMovieGenres = `discover/movie${api_key}&with_genres=`;
const urlMainTvGenre = `discover/tv${api_key}&with_genres=`

const url = {
  movies: [
    ["movie/upcoming" + api_key, "upcoming"],
    ["movie/top_rated" + api_key, "topRated"],
    ["movie/popular" + api_key, "popular"],
    ["movie/now_playing" + api_key, "nowPlaying"],
    // ["movie/latest" + api_key, "latest"],  // Returns single movie
    ["trending/movie/day" + api_key, "trendingToday"],
    ["trending/movie/week" + api_key, "trendingWeek"],
    ["discover/movie" + api_key + "&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2022", "newThisYear"]
  ],

  movieGenres: [
    [28, "Action"],
    [12, "Adventure"],
    [16, "Animation"],
    [35, "Comedy"],
    [80, "Crime"],
    [99, "Documentary"],
    [18, "Drama"],
    [10751, "Family"],
    [14, "Fantasy"],
    [36, "History"],
    [27, "Horror"],
    [10402, "Music"],
    [9648, "Mystery"],
    [10749, "Romance"],
    [878, "Science Fiction"],
    [10770, "TV Movie"],
    [53, "Thriller"],
    [10752, "War"],
    [37, "Western"],
  ],

  tv: [
    ["tv/airing_today" + api_key, "airingToday"],
    ["tv/top_rated" + api_key, "topRated"],
    ["tv/popular" + api_key, "popular"],
    ["tv/on_the_air" + api_key, "onTheAir"],
    // ["tv/latest" + api_key, "Latest"],
    ["trending/tv/day" + api_key, "trendingToday"],
    ["trending/tv/week" + api_key, "trendingWeek"],
    ["discover/tv" + api_key + "&sort_by=popularity.desc&first_air-date_year=2022&page=1&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0", "newThisYear"],
  ],

  tvGenres: [
    [10759, "Action & Adventure"],
    [16, "Animation"],
    [35, "Comedy"],
    [80, "Crime"],
    [99, "Documentary"],
    [18, "Drama"],
    [10751, "Family"],
    [10762, "Kids"],
    [9648, "Mystery"],
    [10763, "News"],
    [10764, "Reality"],
    [10765, "Sci-Fi & Fantasy"],
    [10766, "Soap"],
    [10767, "Talk"],
    [10768, "War & Politics"],
    [37, "Western"],
  ],

  genres: [
    ["genre/movie/list" + api_key, "movieGenres"],
    ["genre/tv/list" + api_key, "tvGenres"],
  ]
}


//Gets different types of lists to fill up different pages
export const useAxiosAll = () => {
  const [load, setLoading] = useState(true);
  const [allData, setAllData] = useState<any>({})

  const getData = async () => {

    //Creating request list
    let requests: Promise<AxiosResponse<any, any>>[] = [];
    let nameList: string[] = [];

    let showArrays = [
      url.movies,
      url.movieGenres,
      url.tv,
      url.tvGenres,
      url.genres];

    //Preparing requests
    showArrays.forEach((array, index) => {
      array.forEach(url => {

        let newUrl = mainUrl;
        if (index === 1) newUrl += urlMainMovieGenres + url[0];
        else if (index === 3) newUrl += urlMainTvGenre + url[0];
        else newUrl += url[0];

        nameList.push(url[1].toString());
        requests.push(axios.get(newUrl));
      })
    });

    // datalists
    let movieLists: any[],
      movieGenres: any[],
      tvLists: any[],
      tvGenres: any[],
      genreLabels: any[],
      searchList: any[];

    let failedRequests: [string, any]

    //Getting results
    await Promise.allSettled(requests).then((res) => {

      //Adjusting the indexes in the next section in order to account for previous list, 
      let no0 = showArrays[0].length;
      let no1 = showArrays[1].length + no0;
      let no2 = showArrays[2].length + no1;
      let no3 = showArrays[3].length + no2;
      let no4 = showArrays[4].length + no3;
      console.log(res);

      res.forEach((result, index) => {
        if (result.status === "fulfilled") {
          let data = result.value.data.results;

          //filling up datalist
          if (index < no0) movieLists = { ...movieLists, [nameList[index]]: data }
          else if (index < no1) movieGenres.push(data)
          else if (index < no2) tvLists = { ...tvLists, [nameList[index]]: data }
          else if (index < no3) tvGenres.push(data)
          else if (index < no4) genreLabels.push(result.value.data.genres)

          //Rejected
        } else failedRequests.push([nameList[index], result.reason])
      });

      console.log(failedRequests)

      //sorting
      //Changes the actual displayed data on the web
      let { homePageData, tvPageData, moviePageData, popularPageData } = sortData({ movieLists, movieGenres, tvLists, tvGenres })

      setLoading(false);
      setAllData({ homePageData, tvPageData, moviePageData, popularPageData, genreLabels });

    }).catch(errors => { })
  }

  useEffect(() => {
    getData();
  }, [])

  return { load, allData };
}

export default useAxiosAll