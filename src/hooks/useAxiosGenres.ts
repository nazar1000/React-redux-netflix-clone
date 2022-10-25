import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { api_key, mainUrl } from "./useAxiosAll";



export const useAxiosGenres = (
  type: "tv" | "movie",
  genreId?: number
) => {
  const [loading, setLoading] = useState(true);
  const [genresData, setGenresData] = useState<any>({})

  const getData = async () => {
    let requestArr: (Promise<AxiosResponse<any, any>> | undefined)[] = [];
    let responseName: string[];

    if (genreId == 0) return;

    const url = mainUrl + `discover/${type}${api_key}&sort_by=popularity.desc&page=1&with_genres=${genreId}`

    switch (type) {
      case "tv": {
        const request1 = axios.get(url)
        requestArr = [request1];
        break;

      } case "movie": {
        const request1 = axios.get(url); //movies genres
        requestArr = [request1];
        break;

      } default: {
        requestArr = []
      }
    }

    // console.log("Type", type);

    await axios.all(requestArr)
      .then(axios.spread((...responses) => {
        // console.log(responseName, responses);

        setGenresData(responses[0]?.data.results);
        setLoading(false);

      })).catch(errors => {
        // console.log("Error", errors)
      })
  }

  useEffect(() => {
    getData();
  }, [])


  return { loading, genresData };
}
