
//Used in combination with useAxiosAll hook

//Un-highlight selections to show on the page.
export const sortData = (data: any) => {
  let homePageData = [
    [data.tvLists.popular, "Popular Tv Shows"],
    [data.movieLists.popular, "Popular Movies"],
    [data.tvLists.topRated, "Top Rated Tv"],
    // [data.tvLists.trendingToday, "Trending Today Tv"],
    // [data.tvLists.onTheAir, "On the air"],
    // [data.movieLists.trendingToday, "Trending Today Movies"],
    // [data.movieLists.nowPlaying, "Playing now "],
    // [data.movieLists.topRated, "Top Rated Movies"],
    // [data.tvLists.airingToday, "Playing Today TV"],
  ]

  let tvPageData = [
    [data.tvLists.popular, "Popular"],
    // [data.tvLists.topRated, "Top Rated"],
    // [data.tvLists.trendingWeek, "Trending This Week"],
    // [data.tvLists.onTheAir, "On The Air"],

    //genres
    [data.tvGenres[0], "Action & Adventure"],
    [data.tvGenres[1], "Animation"],
    [data.tvGenres[2], "Comedy"],
    // [data.tvGenres[3], "Crime"],
    // [data.tvGenres[4], "Documentary"],
    // [data.tvGenres[5], "Drama"],
    // [data.tvGenres[6], "Family"],
    // [data.tvGenres[7], "Kids"],
    // [data.tvGenres[8], "Mystery"],
    // [data.tvGenres[9], "News"],
    // [data.tvGenres[10], "Reality"],
    // [data.tvGenres[11], "Sci-Fi & Fantasy"],
    // [data.tvGenres[12], "Soap"],
    // [data.tvGenres[13], "Talk"],
    // [data.tvGenres[14], "War & Politics"],
    // [data.tvGenres[15], "Western"],
  ]

  let moviePageData = [
    [data.movieLists.newThisYear, "New This Year"],
    // [data.movieLists.topRated, "Top Rated"],
    // [data.movieLists.nowPlaying, "Now Playing"],
    // [data.movieLists.trendingWeek, "Trending This Week"],

    //genres
    [data.movieGenres[0], "Action"],
    [data.movieGenres[1], "Adventure"],
    [data.movieGenres[2], "Animation"],
    // [data.movieGenres[3], "Comedy"],
    // [data.movieGenres[4], "Crime"],
    // [data.movieGenres[5], "Documentary"],
    // [data.movieGenres[6], "Drama"],
    // [data.movieGenres[7], "Family"],
    // [data.movieGenres[8], "Fantasy"],
    // [data.movieGenres[9], "History"],
    // [data.movieGenres[10], "Horror"],
    // [data.movieGenres[11], "Music"],
    // [data.movieGenres[12], "Mystery"],
    // [data.movieGenres[13], "Romance"],
    // [data.movieGenres[14], "Science Fiction"],
    // [data.movieGenres[15], "TV Movie"],
    // [data.movieGenres[16], "Thriller"],
    // [data.movieGenres[17], "War"],
    // [data.movieGenres[18], "Western"],

  ]

  let popularPageData = [
    [data.movieLists.upcoming, "Up Coming Movies"],
    [data.movieLists.popular, "Popular Movies"],
    // [data.movieLists.trendingWeek, "Trending This Week Movies"],
    // [data.tvLists.popular, "New This Year Movies"],
    // [data.tvLists.trendingWeek, "Popular Tv"],
    // [data.tvLists.newThisYear, "Trending This Week Tv"],
    // [data.movieLists.newThisYear, "New This Year Tv"],
  ]


  return { homePageData, tvPageData, moviePageData, popularPageData }
}





