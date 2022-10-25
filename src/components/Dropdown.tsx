import "./dropdown.scss";
import { useState } from "react";
import languages_list from "../helper/language_list";
import tileIcon from "../icons/tile.png";
import paragraphIcon from "../icons/left-align.png";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getViewMode, updateViewMode, updateFilter, getFilters } from "../app/slices/filterSlice";


const originalLanguage = [
  "Original Language",
  "Dubbing",
  "Subtitles"
];

const sortMovies = [
  "Suggestions for you",
  "Year Released",
  "A-Z",
  "Z-A",
];

const sortTv = [
  "Suggestions for you",
  "Year Released",
  "Votes desc",
  "Votes asc",
];

const filterName = [
  "Suggestions for you",
  "Year Released",
  "A-Z",
  "Votes desc",
  "Z-A",
  "Votes asc",

]

type filterType = "genreOption" | "sortOption" | "type" | "filterType" | "languageTypeOption" | "languageOption";
type DropdownProps = {
  dropDownType: "original language" | "language" | "sort" | "viewMode",
  pageName?: string;
}

function Dropdown(props: DropdownProps) {
  const [isDropdown, setDropdown] = useState(false);

  const viewMode = useAppSelector((state) => getViewMode(state))
  const filter = useAppSelector((state) => getFilters(state))

  const dispatch = useAppDispatch();
  const changeViewMode = (value: string) => dispatch(updateViewMode(value))

  const handleUpdate = (type: filterType, value: number | string) => {
    dispatch(updateFilter({ type: type, value: value }))
    setDropdown(false);
  }

  const getDropdownSelection = () => {
    let selection = "";

    if (props.dropDownType === "original language") selection = filter.languageOption;
    else if (props.dropDownType === "language") selection = filter.languageOption;
    else if (props.dropDownType === "sort" || props.dropDownType === "viewMode") {
      if (filter.type !== "movie" && (filter.sortOption === 2 || filter.sortOption === 3)) {
        selection = filterName[Number(filter.sortOption) + 1];
      } else selection = filterName[Number(filter.sortOption)];

    }
    return selection;
  }



  return (
    <div className="dropdown-container">

      {/* View Mode*/}
      {props.dropDownType === "viewMode" &&
        <div className='view-toggle'>
          <div className="view-mode-button" style={viewMode === "full" ? { border: "1px solid white" } : {}} onClick={() => changeViewMode("full")}>
            <img src={paragraphIcon} alt="Full view" />
          </div >

          <div className="tiles-over-container" style={viewMode === "tiles" ? { border: "1px solid white", backgroundColor: "rgb(0, 0, 0)" } : {}}>
            <div className="view-mode-button" onClick={() => { changeViewMode("tiles"); handleUpdate("genreOption", props?.pageName ? props.pageName : "") }}>
              <img src={tileIcon} alt="Tiled view" />
            </div>

            {viewMode === "tiles" &&
              <>
                <div className="tiles-container">
                  <div className='flex dropdown-name' onClick={() => setDropdown(!isDropdown)}>
                    <h3 >{getDropdownSelection()}</h3>
                    <span className='arrowDown'></span>
                  </div>

                  {isDropdown &&
                    <div className='dropdown-list'>
                      <ul>
                        {filter.type === "movie" && sortMovies.map((sort: any, index: number) => {
                          return <li key={sort}><button onClick={() => handleUpdate("sortOption", index)}>{sort}</button></li>
                        })}

                        {filter.type !== "movie" && sortTv.map((sort: any, index: number) => {
                          return <li key={sort} ><button onClick={() => handleUpdate("sortOption", index)}>{sort}</button></li>
                        })}
                      </ul>
                    </div>
                  }
                </div>
              </>
            }
          </div>

        </div>

      }


      {/* Label */}
      {props.dropDownType === "original language" && <span className="dropdown-label">Select Your preferences</span>}
      {props.dropDownType === "sort" && <span className="dropdown-label">Sort by</span>}

      {props.dropDownType !== "viewMode" &&
        <div className='dropdown'>
          <div className="dropdown-name" onClick={() => setDropdown(!isDropdown)}>
            <h2>{getDropdownSelection()}</h2>
            <span className="arrow"></span>
          </div>

          {isDropdown && <div className="dropdown-list">
            <ul>
              {props.dropDownType === "language" && languages_list.map((lang: any) => {
                return <li key={lang.code} ><button onClick={() => handleUpdate("languageOption", lang.name)}>{lang.name}</button></li>
              })}

              {props.dropDownType === "sort" && sortTv.map((sort: any, index: number) => {
                return <li key={sort}><button onClick={() => handleUpdate("sortOption", index)}>{sort}</button></li>
              })}

              {props.dropDownType === "original language" && originalLanguage.map((lang: any) => {
                return <li key={lang} ><button onClick={() => handleUpdate("languageTypeOption", lang)}>{lang}</button></li>
              })}

            </ul>
          </div>
          }
        </div>
      }
    </div>




  )


}

export default Dropdown