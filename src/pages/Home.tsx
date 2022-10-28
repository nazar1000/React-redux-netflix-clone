import { useState } from "react";
import Highlight from "../components/L.components/Highlight";
import ListDistributor from "../components/lists/ListDistributor";
import Loading from "../components/Loading";
import "../components/loading.scss"
import { Outlet } from "react-router-dom";

type HomeProps = {
  showsData: any[];
}

const Home = (props: HomeProps) => {
  const [pageLoaded, setPageLoaded] = useState(false);

  // console.log(props)
  const updatePageLoaded = () => {
    setPageLoaded(true);
    // console.log("Page loaded")
  }

  // console.log("home data", props)
  return (
    <>
      {!pageLoaded &&
        <Loading />
      }

      {props.showsData.length > 0 &&
        <>
          <Highlight highlight={props.showsData[2][0][4]} />
          <ListDistributor showList={props.showsData} type="home" updatePageLoaded={updatePageLoaded} />
        </>
      }

      <Outlet />
    </>
  )
}

export default Home;

