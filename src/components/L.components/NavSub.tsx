import "./navsub.scss"
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Dropdown from '../Dropdown';
import { useAppDispatch } from "../../app/hooks";
import { updateViewMode } from "../../app/slices/filterSlice";


type NavSubProps = {
  genres: any,
  isScrolled: boolean,
}

function NavSub(props: NavSubProps) {
  const [isGenresDropDown, setIsGenresDropDown] = useState(false);
  const [pageName, setPageName] = useState("")

  let location = useLocation();
  const dispatch = useAppDispatch()
  const changeViewMode = (value: string) => dispatch(updateViewMode(value))

  return (
    <>
      <div className={props.isScrolled ? "sub-header nav-bg" : "sub-header"}>
        <div>

          {/* Genre selection title */}
          {location.pathname.includes("genres") &&
            <>
              <div className='genre-title'>
                <Link to={"/" + location.pathname.includes("tv") ? "tv" : "movies"}>
                  {location.pathname.includes("tv") ? "Tv Shows >" :
                    location.pathname.includes("movies") ? "Movies <" : ""}
                </Link>

                <h1>{pageName}</h1>
              </div>
            </>
          }

          {/* Page title */}
          <h1>
            {location.pathname === "/tv" ? "TV Shows" : ""}
            {location.pathname === "/movies" ? "Movies" : ""}
            {location.pathname === "/my-list" ? "My List" : ""}
            {location.pathname === "/browse-by-language" ? "Browse By Language" : ""}
          </h1>


          {/* Genre selection dropdown */}
          {!location.pathname.includes("genres") && location.pathname !== "/my-list" && !location.pathname.includes("/browse-by-language") &&
            <button className='genre-dropdown-button' onClick={() => setIsGenresDropDown(!isGenresDropDown)}>Genres
              {isGenresDropDown && <div className='genre-dropdown'>
                <ul>

                  {location.pathname === "/tv" && props.genres[1] !== undefined &&
                    props.genres[1].map((genre: any) => {
                      return (
                        <li key={genre.id} onClick={() => {
                          setPageName(genre.name)
                          changeViewMode("full")
                        }}>
                          <Link to={`${location.pathname}/genres/${genre.id}`}>{genre.name}</Link>
                        </li>
                      )
                    })
                  }

                  {location.pathname === "/movies" && props.genres[0] !== undefined &&
                    props.genres[0].map((genre: any) => {
                      return (
                        <li key={genre.id} onClick={() => {
                          setPageName(genre.name)
                          changeViewMode("full")
                        }}>
                          <Link to={`${location.pathname}/genres/${genre.id}`}>{genre.name}</Link>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>}
            </button>}
        </div>


        {/* Grid view */}
        {(location.pathname === "/tv" || location.pathname === "/movies" || location.pathname.includes("genre")) &&
          <Dropdown dropDownType="viewMode" pageName={pageName} />
        }

        {/* Browse by language filter scrollbar */}
        {location.pathname.includes("/browse-by-language") &&
          <div className='flex'>
            {/* <Dropdown type='original language' /> */}
            <Dropdown dropDownType='language' />
            <Dropdown dropDownType='sort' />
          </div>
        }

      </div>
    </>
  )
}

export default NavSub

