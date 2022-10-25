import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { mainUrl } from "./useAxiosAll";
import { api_key } from "./useAxiosAll";


export const useAxiosDetails = (
  type: string,
  showID: number = 0
) => {
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState<any>({})

  console.log(type, showID)
  const getData = async () => {
    let requestArr: (Promise<AxiosResponse<any, any>> | undefined)[] = [];
    let responseName: string[];

    if (showID == 0) return;

    const tvDetails = mainUrl + `${type}/${showID}${api_key}`;
    const tvCast = mainUrl + `${type}/${showID}/credits${api_key}`;
    const tvSimilar = mainUrl + `${type}/${showID}/similar${api_key}`;

    const movieDetails = mainUrl + `${type}/${showID}${api_key}`;
    const movieCast = mainUrl + `${type}/${showID}/credits${api_key}`;
    const movieSimilar = mainUrl + `${type}/${showID}/similar${api_key}`;

    switch (type) {
      case "tv": {
        const request1 = axios.get(tvDetails)
        const request2 = axios.get(tvCast)
        const request3 = axios.get(tvSimilar)
        requestArr = [request1, request2, request3];
        responseName = ["details", "cast", "similar"]
        break;


      } case "movie": {
        const request1 = axios.get(movieDetails)
        const request2 = axios.get(movieCast)
        const request3 = axios.get(movieSimilar)
        requestArr = [request1, request2, request3];
        responseName = ["details", "cast", "similar"]
        break;

      } default: {
        requestArr = []
      }
    }

    // console.log("Type", type);

    await axios.all(requestArr)
      .then(axios.spread((...responses) => {
        // console.log(responseName, responses);
        setShowDetails({
          "details": responses[0]?.data,
          "cast": responses[1]?.data,
          "similar": responses[2]?.data.results,
        });

        setLoading(false);

      })).catch(errors => {
        console.log("Error", errors)
        setLoading(false);
      })
  }

  useEffect(() => {
    getData();
    setLoading(true);
    // console.log(type)
  }, [showID, type])

  return { loading, showDetails };
}