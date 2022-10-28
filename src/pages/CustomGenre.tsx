import { useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import { useAxiosGenres } from "../hooks/useAxiosGenres"
import Highlight from "../components/L.components/Highlight";
import ListDistributor from "../components/lists/ListDistributor";
import TiledList from "../components/lists/TiledList";
import Loading from "../components/Loading";
import { useAppSelector } from "../app/hooks";
import { getViewMode } from "../app/slices/filterSlice";


function CustomGenre() {
  let { genreId } = useParams();
  let loc = useLocation();

  const viewMode = useAppSelector(state => getViewMode(state))

  const { loading, genresData } = useAxiosGenres(loc.pathname.includes("tv") ? "tv" : "movie", genreId ? Number(genreId) : 0)
  const [pageLoaded, setPageLoaded] = useState(false);

  const updatePageLoaded = () => setPageLoaded(true);

  return (
    <>
      {!pageLoaded && <Loading />}

      {viewMode === "full" && genresData[0] !== undefined &&
        <>
          <Highlight highlight={genresData.length > 0 ? genresData[4] : {}} />
          <ListDistributor showList={genresData} type="genre" updatePageLoaded={updatePageLoaded} />
        </>
      }
      {viewMode === "tiles" && <TiledList />}
    </>
  )
}

export default CustomGenre

