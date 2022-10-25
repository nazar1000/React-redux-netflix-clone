import "./tiledList.scss"
import { useAxiosFilter } from "../../hooks/useAxiosFilter";
import Tile from "../Tile";
import { useAppSelector } from "../../app/hooks";
import { getFilters } from "../../app/slices/filterSlice";

type TiledListProps = {
  genreFilter: false | string,
  sort: 0 | 1 | 2 | 3;
  isMovies: "movie" | "tv",
  filterType: "general" | "language";
  languageType?: null | "original" | "dubbing" | "subtitles",
  language?: null | string,
}

function TiledList() {
  const filter = useAppSelector(state => getFilters(state))
  const { loading, filteredResults } = useAxiosFilter(filter.filterType, filter.sortOption, filter.genreOption, filter.type, filter.languageOption)

  return (
    <div className="tiled-list">
      {!loading && filteredResults.map((show: any) => {
        return (
          <Tile key={show.id}
            data={show} />
        )
      })
      }
    </div>
  )
}

export default TiledList