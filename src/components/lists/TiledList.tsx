import "./tiledList.scss"
import { useAxiosFilter } from "../../hooks/useAxiosFilter";
import Tile from "../Tile";
import { useAppSelector } from "../../app/hooks";
import { getFilters } from "../../app/slices/filterSlice";

function TiledList() {
  const filter = useAppSelector(state => getFilters(state))
  const { loading, filteredResults } = useAxiosFilter(filter.filterType, filter.sortOption, filter.genreOption, filter.type, filter.languageOption)

  return (
    <div className="tiled-list" data-testid="tiled-list">
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