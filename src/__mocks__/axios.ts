import { useEffect, useState } from "react";

// Used for specific filters

const mockResponse = {
  data: {
    results: {
      "backdrop_path": "/Aa9TLpNpBMyRkD8sPJ7ACKLjt0l.jpg",
      "first_air_date": "2022-08-21",
      "genre_ids": [
        10765,
        18,
        10759
      ],
      "id": 94997,
      "name": "House of the Dragon",
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "House of the Dragon",
      "overview": "The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.",
      "popularity": 4495.747,
      "poster_path": "/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
      "vote_average": 8.5,
      "vote_count": 1889
    }
  }
}

export default {
  // get: jest.fn().mockResolvedValue(mockResponse)
  get: jest.fn().mockImplementation(() => Promise.resolve()),
  // get: jest.fn().mockResolvedValue(mockResponse)
  then: jest.fn().mockResolvedValue(mockResponse)
}



// export const axios = {
//   get: {
//     "backdrop_path": "/Aa9TLpNpBMyRkD8sPJ7ACKLjt0l.jpg",
//     "first_air_date": "2022-08-21",
//     "genre_ids": [
//       10765,
//       18,
//       10759
//     ],
//     "id": 94997,
//     "name": "House of the Dragon",
//     "origin_country": [
//       "US"
//     ],
//     "original_language": "en",
//     "original_name": "House of the Dragon",
//     "overview": "The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.",
//     "popularity": 4495.747,
//     "poster_path": "/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
//     "vote_average": 8.5,
//     "vote_count": 1889
//   }
// }



// export const useAxiosFilter = (
//   filterType: "general" | "language",
//   sort: 0 | 1 | 2 | 3,
//   genre: false | string,
//   type: "movie" | "tv",
//   // languageType?: "original" | "dubbing" | "subtitles",
//   language?: null | string,

// ) => {
//   const [loading, setLoading] = useState(true);
//   const [filteredResults, setFilteredResults] = useState<any>({})

//   const getData = async () => {
//     setFilteredResults(
//       {
//         "backdrop_path": "/Aa9TLpNpBMyRkD8sPJ7ACKLjt0l.jpg",
//         "first_air_date": "2022-08-21",
//         "genre_ids": [
//           10765,
//           18,
//           10759
//         ],
//         "id": 94997,
//         "name": "House of the Dragon",
//         "origin_country": [
//           "US"
//         ],
//         "original_language": "en",
//         "original_name": "House of the Dragon",
//         "overview": "The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.",
//         "popularity": 4495.747,
//         "poster_path": "/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
//         "vote_average": 8.5,
//         "vote_count": 1889
//       }




//     );
//     setLoading(false);
//   }

//   useEffect(() => {
//     getData();
//     setLoading(true);
//   }, [filterType, sort, genre, type, language])

//   return { loading, filteredResults };
// }










