import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Highlight from "../components/L.components/Highlight";
import ListDistributor from "../components/lists/ListDistributor";
import TiledList from "../components/lists/TiledList";
import Loading from "../components/Loading";
import { getViewMode } from "../app/slices/filterSlice";

type MovieProps = {
  showsData: any[],
}

const Movies = (props: MovieProps) => {
  const [pageLoaded, setPageLoaded] = useState(false);

  const updatePageLoaded = () => setPageLoaded(true);
  const viewMode = useAppSelector((state) => getViewMode(state))

  return (
    <>

      {!pageLoaded &&
        <Loading />
      }

      {props.showsData.length > 0 &&
        <>
          {viewMode === "full" &&
            <>
              <Highlight highlight={props.showsData[3][0][16]} />
              <ListDistributor showList={props.showsData} type="movies" updatePageLoaded={updatePageLoaded} />
            </>
          }

          {viewMode === "tiles" &&
            <>
              <TiledList />
              {() => updatePageLoaded()}
            </>
          }
        </>
      }
      <Outlet />
    </>
  )
}

export default Movies;