import "./button.scss"
import add from "../icons/add.png";
import info from "../icons/info.png";
import like from "../icons/like.png";
import like_fill from "../icons/like-filled.png";
import dislike from "../icons/dislike.png";
import dislike_fill from "../icons/dislike-filled.png";
import likePlus from "../icons/likeplus.png";
import likePlus_fill from "../icons/likeplus-filled.png";
import play from "../icons/play.png";
import tick from "../icons/tick.png";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToMyList, checkIfInMyList, getLikeStatus, setLikeStatus } from "../app/slices/myListSlice";
import { setPreviewData } from "../app/slices/globalSlice";
import { useEffect } from "react";

type ButtonProps = {
  type: "play" | "info" | "add" | "like" // type of button
  shape: "round" | "text", //shape of button
  text?: "Play" | "More Info", //button text
  data: any, //button data
}

function Button(props: ButtonProps) {

  const showType = props.data?.seasons ? "tv" : "movie";
  console.log(props.data)
  console.log(showType)

  const dispatch = useAppDispatch();
  const likeStatus = useAppSelector((state) => getLikeStatus(props.data.id, showType, state))
  const isInMyList = useAppSelector((state) => checkIfInMyList(props.data.id, showType, state))




  useEffect(() => {
  }, [isInMyList])

  const handleClick = () => {
    const type = props.data?.title ? "movie" : "tv";

    if (props.type === "play") { }
    else if (props.type === "info") dispatch(setPreviewData({ ...props.data, type: type }))
    else if (props.type === "add") dispatch(addToMyList({ ...props.data, type: type }))

    // console.log(isInMyList)
  }

  //Redux store update
  const toggleLike = (rating: number) => {
    dispatch(setLikeStatus({ type: showType, id: props.data.id, likeStatus: rating }))
  }

  //Button styles
  const getNewButtonClass = () => {
    let styleClass = ""

    if (props.type === "play" && props.shape === "text") {
      styleClass = "play-button--text";
    } else if (props.type === "info" && props.shape === "text") {
      styleClass = "info-button--text";

    } else if (props.type === "play" && props.shape === "round") {
      styleClass = "play-button--round";
    } else if (props.type === "info" && props.shape === "round") {
      styleClass = "info-button--round";
    } else if (props.type === "add" && props.shape === "round") {
      styleClass = "add-button--round";
    } else if (props.type === "like" && props.shape === "round") {
      styleClass = "like-button--round";
    }

    return styleClass;
  }

  return (
    <>
      <button className={getNewButtonClass()} onClick={() => handleClick()}>
        {props.type !== "like" &&
          <>
            {/* button img */}
            <div className="button-image" >
              {props.type === "play" && <img src={play} alt="Play button" />}
              {props.type === "info" && props.shape === "text" && <img src={info} alt="Preview this" />}
              {props.type === "add" && <img src={isInMyList ? tick : add} alt="Add to my list" />}
              {props.type === "info" && props.shape === "round" && <span className="arrow-down"></span>}
            </div>

            {/* button extras */}
            {props.shape === "text" ? <h1>{props.text}</h1> : ""}
            {props.type === "add" &&
              <>
                {isInMyList && <span className="tool-tip-text">Remove From List</span>}
                {!isInMyList && <span className="tool-tip-text">Add to My List</span>}
              </>
            }
            {props.type === "info" && props.shape === "round" && <span className="tool-tip-text">Show more</span>}

          </>
        }

        {/* Like button with dropdown*/}
        {props.type === "like" &&
          <>
            <div className="button-image">
              {/* Like status */}
              {likeStatus === 0 && <img src={like}></img>}
              {likeStatus === 1 && <img src={dislike_fill}></img>}
              {likeStatus === 2 && <img src={like_fill}></img>}
              {likeStatus === 3 && <img src={likePlus_fill}></img>}

            </div>

            {/* button dropdown*/}
            <div className="like-dropdown">
              <div className="like-buttons" onClick={() => toggleLike(1)}>
                <div className="button-image" >
                  <img src={likeStatus === 1 ? dislike_fill : dislike} alt="Dislike" />
                </div>
                <span className="tool-tip-text">Not for me</span>
              </div>
              <div className="like-buttons" onClick={() => toggleLike(2)}>
                <div className="button-image" >
                  <img src={likeStatus === 2 ? like_fill : like} alt="Like" />
                </div>
                <span className="tool-tip-text">I like this</span>
              </div>
              <div className="like-buttons" onClick={() => toggleLike(3)}>
                <div className="button-image">
                  <img src={likeStatus === 3 ? likePlus_fill : likePlus} alt="I liked it a lot" />
                </div>
                <span className="tool-tip-text">Love this!</span>
              </div>
            </div>
          </>
        }


      </button>


    </>
  )
}

export default Button