import axios from "axios";
import { useEffect, useState } from "react";
import { api_key, mainUrl } from "./useAxiosAll";

export const useAxiosGenres = (
  type: "tv" | "movie",
  genreId?: number
) => {
  const [loading, setLoading] = useState(true);
  const [genresData, setGenresData] = useState<any>({})

  const getData = async () => {
    if (genreId === 0) return;

    const url = mainUrl + `discover/${type}${api_key}&sort_by=popularity.desc&page=1&with_genres=${genreId}`
    const response = axios.get(url)
    response.then(res => {
      setGenresData(res.data.results);
      setLoading(false);

    }).catch(errors => console.log("Error", errors))
  }

  useEffect(() => {
    getData();
  }, [])


  return { loading, genresData };
}
