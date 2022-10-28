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

  const getData = async () => {
    let requestArr: (Promise<AxiosResponse<any, any>>)[] = [];
    if (showID === 0) return;

    const details = mainUrl + `${type}/${showID}${api_key}`;
    const cast = mainUrl + `${type}/${showID}/credits${api_key}`;
    const similar = mainUrl + `${type}/${showID}/similar${api_key}`;

    requestArr = [
      axios.get(details),
      axios.get(cast),
      axios.get(similar),
    ];

    await Promise.all(requestArr).then((res) => {
      // console.log(res);

      setShowDetails({
        "details": res[0].data,
        "cast": res[1].data,
        "similar": res[2].data.results,
      });

      setLoading(false);

    }).catch(error => console.log(error))

    setLoading(false);
  }

  useEffect(() => {
    getData();
    setLoading(true);
    // console.log(type)
  }, [showID, type])

  return { loading, showDetails };
}