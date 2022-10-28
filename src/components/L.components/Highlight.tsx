import './highlight.scss';
import React, { useState, useEffect } from "react"
import PlayButton from '../PlayButton';
import PreviewButton from '../PreviewButton';

type HighlighProps = {
  highlight: any | [],

}

function Highlight(props: HighlighProps) {
  const [highlightImage, setHighlightImage] = useState<React.CSSProperties>({ backgroundImage: "none" })

  useEffect(() => {
    // console.log(props.highlight)
    setHighlightImage({
      backgroundImage: `url(` + getImage() + `),linear-gradient(180deg, #156ad300 80%, #141414)`,
    })
  }, [props.highlight])

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

  return (
    <div className="highlight-div" data-testid="highlight">
      <div className="highlight-div__bg-div" style={highlightImage}>
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