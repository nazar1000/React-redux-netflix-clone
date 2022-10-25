// uses global stylesheet
import { useAppSelector } from "../app/hooks";
import Tile from "../components/Tile";
import { selectShowsInMyList } from "../app/slices/myListSlice";


const My_List = () => {
  const myList = useAppSelector((state) => selectShowsInMyList(state))

  const tileStyle = {
    width: "clamp(200px, 16vw ,300px)",
    float: "left"
  }

  return (
    <div className="my-list">
      {myList.map((show: any) => {
        return (
          <Tile key={show.id}
            customStyle={tileStyle}
            data={show} />
        )
      })}
    </div>
  )
}

export default My_List;