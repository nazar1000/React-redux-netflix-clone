import "./button.scss"
import play from "../icons/play.png";

type PlayButtonProps = {
  type: "round" | "text", //shape of button
  data: any, //button data
}

function PlayButton(props: PlayButtonProps) {
  const showType = props.data?.seasons ? "tv" : "movie";
  const handleClick = () => { }

  //Button styles
  const getNewButtonClass = () => {
    let styleClass = ""
    if (props.type === "text") styleClass = "play-button--text";
    else if (props.type === "round") styleClass = "play-button--round";
    return styleClass;
  }

  return (
    <button className={getNewButtonClass()} onClick={() => handleClick()}>
      {/* button img */}
      <div className="button-image" >
        <img src={play} alt="Play button" />
      </div>

      {props.type === "text" ? <h1>Play</h1> : ""}
    </button>
  )
}

export default PlayButton