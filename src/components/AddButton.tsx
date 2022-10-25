import "./button.scss"
import add from "../icons/add.png";
import tick from "../icons/tick.png";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToMyList, checkIfInMyList, getLikeStatus, setLikeStatus } from "../app/slices/myListSlice";
import { useEffect } from "react";


//Add to my list button
type AddButtonProps = {
  data: any, //button data
}

function AddButton(props: AddButtonProps) {
  const showType = props.data?.name ? "tv" : "movie";
  const dispatch = useAppDispatch();

  const isInMyList = useAppSelector((state) => checkIfInMyList(props.data.id, showType, state))

  const handleClick = () => {
    const type = props.data?.title ? "movie" : "tv";
    dispatch(addToMyList({ ...props.data, type: type }))
  }

  return (
    <>
      <button className="add-button--round" onClick={() => handleClick()}>
        <>
          <div className="button-image" >
            <img src={isInMyList ? tick : add} alt={isInMyList ? "Add to my list" : "Remove from my list"} />
          </div>

          {isInMyList && <span className="tool-tip-text">Remove From List</span>}
          {!isInMyList && <span className="tool-tip-text">Add to My List</span>}

        </>
      </button>


    </>
  )
}

export default AddButton