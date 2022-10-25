import "./tile.scss"
import { CSSProperties, useEffect, useState } from "react";
import { getGenreName } from "../helper/helper";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { forceTileClosed, isShowTileActive, setForceTileClosed, setShowTileActive } from "../app/slices/globalSlice";
import PlayButton from "./PlayButton";
import AddButton from "./AddButton";
import LikeButton from "./LikeButton";
import PreviewButton from "./PreviewButton";

type TileProps = {
  customStyle?: {},
  data: any
}

function Tile(props: TileProps) {
  // const { } = useContext(ContextGlobal); //Global tile settings, only one tile should play at the time
  const type = props.data?.name ? "tv" : "movie";

  const [hoverAnimation, setHoverAnimation] = useState<CSSProperties>({}) //animation style
  const [animationName, setAnimationName] = useState(""); //name of animation used

  //Local
  const [isOpen, setIsOpen] = useState(false); //tile preview is fully open
  const [isAnimating, setIsAnimating] = useState(false); //tile preview opening is in progress
  const [shouldClose, setShouldClose] = useState(false); // tile preview should close
  const [isNext, setIsNext] = useState<React.MouseEvent<HTMLDivElement, MouseEvent> | undefined>();

  //global
  const isTileActive = useAppSelector(state => isShowTileActive(state));
  const isForceTileClosed = useAppSelector(state => forceTileClosed(state))
  const dispatch = useAppDispatch()

  //If mouse is on another tile while this tile is still active, close this tile.
  useEffect(() => {
    if (isOpen) {
      dispatch(setForceTileClosed(false))
      setShouldClose(true)
    }

  }, [isForceTileClosed])


  //If user moved to another tile(this), start this as soon as the other tile finished
  //Start animation
  useEffect(() => {
    if (isNext && !isTileActive) {
      startAnimation("enter", isNext);
      setIsNext(undefined);
    }

  }, [isNext, isTileActive])

  //When closing animation, delay and status change
  useEffect(() => {
    let animationCloseTimer: ReturnType<typeof setTimeout>;

    if (shouldClose && isOpen) {

      //Change to closing animation
      setHoverAnimation({
        animationName: (animationName + "-reverse"),
        animationFillMode: "forwards",
        animationDirection: "normal",
        display: "block"
      })

      //closing animation delay
      animationCloseTimer = setTimeout(() => { //animation starts
        setShouldClose(false);
        setIsOpen(false);
        dispatch(setShowTileActive(false));
        dispatch(setForceTileClosed(false))

        setHoverAnimation({
          display: "none"
        });
      }, 250)
    }

    //Check if mouse is within the

    return () => clearTimeout(animationCloseTimer);
  }, [isOpen, shouldClose])


  const startAnimation = (type: "enter" | "exit", event: any): void => {
    //
    if (type === "enter" && isTileActive && (!isAnimating && !isOpen)) dispatch(setForceTileClosed(true))

    if (type === "exit" && (isAnimating || isOpen)) setShouldClose(true); // If on mouse out trigger
    if (type === "enter" && !isOpen && !shouldClose && !isTileActive) {

      //Target tile, checks location of the tile in relation to margins of the site, and picks the right animation
      let element = event.target.getBoundingClientRect();
      let isLeft = element.x < 100;
      let isRight = window.innerWidth - (element.x + element.width) < 100

      let newAnimationName: string;
      if (isLeft) newAnimationName = "tile-expand-left";
      else if (isRight) newAnimationName = "tile-expand-right";
      else newAnimationName = "tile-expand-center"
      setAnimationName(newAnimationName) // for the purpose of reverse animation

      //animation delay
      setTimeout(() => {
        setHoverAnimation({
          animationName: type == "enter" ? newAnimationName : (newAnimationName + "-reverse"),
          // animationDelay: ".1s",
          display: "block"
        })

      }, 300);
      setIsAnimating(true);
      dispatch(setShowTileActive(true));

      //delay for animation to finish
      const animationOpenTimer = setTimeout(() => { //animation starts
        setIsAnimating(false); //animation is off
        setIsOpen(true); //tile preview is fully open

      }, 500)
    }
  }

  return (
    <div className="card" style={props?.customStyle}
      onMouseOver={(e) => { startAnimation("enter", e) }}
      onMouseEnter={(e) => { if (isTileActive) setIsNext(e) }}
      onMouseLeave={(e) => { if (isNext) setIsNext(undefined); if (isAnimating) startAnimation("exit", e) }}>
      <div className="card__image">
        <img src={"https://image.tmdb.org/t/p/w300" + (props.data.backdrop_path ? props.data.backdrop_path : props.data.poster_path)} alt="" />
        <h1>{type == "movie" ? props.data.title : props.data.name}</h1>
      </div>

      <div className="card__preview" style={hoverAnimation} onMouseLeave={(e) => startAnimation("exit", e)}>
        <img src={"https://image.tmdb.org/t/p/w500" + (props.data.backdrop_path ? props.data.backdrop_path : props.data.poster_path)} alt="" />

        <div className="card__preview__info">
          <div className="tile-buttons">
            <div>
              {/* <Button type="play" shape="round" data={props.data} /> */}
              <PlayButton type="round" data={props.data} />
              {/* <Button type="add" shape="round" data={props.data} /> */}
              <AddButton data={props.data} />

              {/* <Button type="like" shape="round" data={props.data} /> */}
              <LikeButton data={props.data} />
            </div>
            {/* <Button type="info" shape="round" data={props.data} /> */}
            <PreviewButton type={"round"} data={props.data} />
          </div>
          <div>
            <div>Show infos</div>
            <div>
              {props?.data.genre_ids && props.data.genre_ids.map((genre: any, index: number) => {

                return <span key={index}>{getGenreName(genre, type)} <span style={{ color: "grey" }}>&bull;</span> </span>
              })
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Tile;
