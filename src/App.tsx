import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";

import Nav from './components/L.components/Nav';
import Home from './pages/Home';
import TvShows from "./pages/TvShows";
import Movies from "./pages/Movies"
import NewPopular from "./pages/NewAndPopular";
import MyList from "./pages/MyList"
import BrowseByLanguage from "./pages/BrowseByLanguage";
import CustomGenre from "./pages/CustomGenre";
import Preview from './components/L.components/Preview';
import Footer from './components/Footer';
import FrontPage from './pages/FrontPage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import ListPreview from './components/lists/ListPreview';
import useAxiosAll from './hooks/useAxiosAll';
import localData from './helper/localData';
import { useAppSelector } from './app/hooks';
import { isPreviewShowing } from './app/slices/globalSlice';

function App() {

  // const { load, allData } = useAxiosLol(); // homePageData, tvPageData, moviePageData, popularPageData
  const [allData, setAllData] = useState(localData); // homePageData, tvPageData, moviePageData, popularPageData
  const previewIsOpen = useAppSelector(state => isPreviewShowing(state))

  //Sorts data
  useEffect(() => {
    // console.log(allData)
  }, [allData])

  return (
    <>
      <div className='content-wrap'>
        {previewIsOpen &&
          <Preview />
        }

        <Routes>
          <Route index element={
            <FrontPage />
          } />

          <Route path='/login' element={
            <LoginPage />
          } />

          <Route path="/" element={
            <Nav genres={allData?.genreLabels} />
          }>

            <Route path="browse" element={
              <Home showsData={allData?.homePageData ? allData.homePageData : []} />
            }>

              <Route path='list/:listname' element={<ListPreview allData={allData} />} />
            </Route>


            <Route path="tv" element={
              <TvShows showsData={allData?.tvPageData ? allData.tvPageData : []} />}>

              <Route path='list/:listname' element={<ListPreview allData={allData} />} />
            </Route>

            <Route path="tv/genres/:genreId" element={
              <CustomGenre />
            } />

            <Route path="movies" element={
              <Movies
                showsData={allData?.moviePageData ? allData.moviePageData : []} />}>
              <Route path='list/:listname' element={<ListPreview allData={allData} />} />
            </Route>

            <Route path="movies/genres/:genreId" element={<CustomGenre />} />

            <Route path="new-popular" element={
              <NewPopular showsData={allData?.popularPageData ? allData.popularPageData : []} />
            } />

            <Route path="my-list" element={
              <MyList />
            } />

            <Route path="browse-by-language" element={
              <BrowseByLanguage />
            } />

            <Route path="search/:query" element={
              <SearchPage allData={allData?.searchList ? allData.searchList : []} />
            } />

            {/* <Route path='watch/:type-id' element= {} /> */}

          </Route>
        </Routes>
        {/* </BrowserRouter> */}

      </div>
      <Footer />
    </>
  );
}

export default App;