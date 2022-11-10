import "./button.scss"
import like from "../icons/like.png";
import like_fill from "../icons/like-filled.png";
import dislike from "../icons/dislike.png";
import dislike_fill from "../icons/dislike-filled.png";
import likePlus from "../icons/likeplus.png";
import likePlus_fill from "../icons/likeplus-filled.png";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getLikeStatus, setLikeStatus } from "../app/slices/myListSlice";

type LikeButtonProps = {
  data: any, //button data
}

function LikeButton(props: LikeButtonProps) {
  const dispatch = useAppDispatch();

  const showType = props.data?.name ? "tv" : "movie";
  const likeStatus = useAppSelector((state) => getLikeStatus(props.data.id, showType, state))

  //Redux store update
  const toggleLike = (rating: number) => {
    dispatch(setLikeStatus({ type: showType, id: props.data.id, likeStatus: rating }))
  }

  return (
    <>
      <button className="like-button--round" >
        <div className="button-image">
          {/* Like status */}
          {likeStatus === 0 && <img src={like} alt="rating neutral" />}
          {likeStatus === 1 && <img src={dislike_fill} alt="rating disliked" />}
          {likeStatus === 2 && <img src={like_fill} alt="rating Liked" />}
          {likeStatus === 3 && <img src={likePlus_fill} alt="rating very liked" />}
        </div>

        {/* button dropdown*/}
        <div className="like-dropdown" data-testid="like-dropdown">
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
      </button>
    </>
  )
}

export default LikeButton