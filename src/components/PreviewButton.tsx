import "./button.scss"
import info from "../icons/info.png";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setPreviewData } from "../app/slices/globalSlice";

type PreviewButtonProps = {
  type: "round" | "text", //type of button
  data: any, //button data
}

function PreviewButton(props: PreviewButtonProps) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    const type = props.data?.title ? "movie" : "tv";
    dispatch(setPreviewData({ ...props.data, type: type }))
  }

  //Button styles
  const getNewButtonClass = () => {
    let styleClass = ""
    if (props.type === "text") styleClass = "info-button--text";
    else if (props.type === "round") styleClass = "info-button--round";
    return styleClass;
  }

  return (
    <button className={getNewButtonClass()} onClick={() => handleClick()}>
      {/* button img */}
      <div className="button-image" >
        {props.type === "text" && <img src={info} alt="Preview this" />}
        {props.type === "round" && <span className="arrow-down"></span>}
      </div>

      {/* button extras */}
      {props.type === "text" ? <h1>More info</h1> : ""}
      {props.type === "round" && <span className="tool-tip-text">Show more</span>}
    </button>
  )
}

export default PreviewButton