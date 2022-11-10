import "./episodeTile.scss"

type EpisodeTileProps = {
  index: number,
  img: string,
  title: string,
  duration: "20" | string,
  description: string
}

function EpisodeTile(props: EpisodeTileProps) {

  return (
    <div className="episode-tile">
      <h2 className="index-no" >{props.index}</h2>
      <div className="episode-image">
        <img src={props.img} alt=""></img>
      </div>
      <div className="episode-summary">
        <div className="episode-title">
          <h3>{props.title}</h3>
          <h3>{props.duration + "m"}</h3>
        </div>
        <div className="episode-description">
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  )
}

export default EpisodeTile