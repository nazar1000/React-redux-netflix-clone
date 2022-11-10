import './highlight.scss';
import React, { useState, useEffect } from "react"
import PlayButton from '../PlayButton';
import PreviewButton from '../PreviewButton';

type HighlighProps = {
  highlight: any | [],

}

function Highlight(props: HighlighProps) {
  const [imageHeight, setImageHeight] = useState<React.CSSProperties>({})

  useEffect(() => {
    const resize = () => updateImageHeight();

    window.addEventListener("resize", () => resize())
    return window.removeEventListener("resize", () => resize)
  }, [])


  // console.log(props.highlight)
  const getImage = (): string => {
    let url = "https://image.tmdb.org/t/p/original";
    let imgUrl;
    if (props.highlight.backdrop_path) imgUrl = props.highlight.backdrop_path;
    else if (props.highlight.poster_path) imgUrl = props.highlight.poster_path;
    else return "";
    // console.log(url + imgUrl)
    return url + imgUrl;
  }

  const updateImageHeight = () => {
    let imgElement = document.getElementById("highlight-image") as HTMLImageElement;

    // if (imgElement !== undefined) {
    if (imgElement.height >= window.innerHeight) setImageHeight({ height: window.innerHeight * 0.85 })
    else if (imgElement.height < window.innerHeight) setImageHeight({ height: imgElement.height * 0.85 })
    // }
  }

  return (
    <div className="highlight-div" data-testid="highlight" style={imageHeight}>
      <div className='highlight__image-div'>
        <img id="highlight-image" src={"https://image.tmdb.org/t/p/original" + getImage()} onLoad={(e) => updateImageHeight()}>
        </img>
        <div className="bg-div__filter"></div>
      </div>


      <div className="highlight__info-div">

        <div className="info-div__title-div">
          {/* <img></img> */}
          {props.highlight && <h1>{props.highlight.title ? props.highlight.title : props.highlight.name}</h1>}
        </div>

        <div className="info-div__intro-div">
          <p>{props.highlight?.overview}</p>
        </div>

        <PlayButton type="text" data={props.highlight} />
        <PreviewButton type="text" data={props.highlight} />
      </div>
    </div>
  )
}

export default Highlight