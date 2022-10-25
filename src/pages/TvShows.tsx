import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Highlight from "../components/L.components/Highlight";
import ListDistributor from "../components/lists/ListDistributor";
import TiledList from "../components/lists/TiledList";
import Loading from "../components/Loading";
import { getViewMode } from "../app/slices/filterSlice";


type Tv_ShowsProps = {
  showsData: any[];
}



export const Tv_Shows = (props: Tv_ShowsProps) => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const updatePageLoaded = () => setPageLoaded(true);

  const viewMode = useAppSelector(state => getViewMode(state))

  return (
    <>
      {!pageLoaded && <Loading />}
      {props.showsData.length > 0 &&
        <>
          {viewMode == "full" &&
            <>
              <Highlight highlight={props.showsData[2][0][9]} />
              <ListDistributor showList={props.showsData} type="tv" updatePageLoaded={updatePageLoaded} />
            </>
          }

          {viewMode == "tiles" &&
            <TiledList />
          }
        </>
      }
      <Outlet />
    </>
  )
}


export default Tv_Shows;