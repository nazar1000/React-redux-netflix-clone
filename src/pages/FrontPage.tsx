import "./frontPage.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import FrontPageBg from "../icons/frontPage-bg.png";
import NcloneLogo from "../icons/netflixLogo1.png";
import NcloneMobile from "../icons/netflixmobile1.png";
import NcloneTv from "../icons/netflixtv1.jpg";
import NcloneChildren from "../icons/children.png";
import NcloneAnywhere from "../icons/netflixanywhere1.jpg";

function FrontPage() {
  const [toggleQuestionTabs, setQuestionTabs] = useState([false, false, false, false, false, false])

  const updateQuestionTabs = (toggle: number) => {
    let tabStatus = toggleQuestionTabs.map((value: boolean, index: number) => {
      if (index === toggle) return !toggleQuestionTabs[toggle]
      else return value;
    })
    setQuestionTabs(tabStatus);
  }

  return (
    <div className="front-page-div">

      <div className="nav">
        <div className="logo-div">
          <img src={NcloneLogo} alt="Nclone logo" />
        </div>
        <button className="sign-button"><Link to="/login">Sign In</Link></button>
      </div>

      <div className="main-tile">
        <img src={FrontPageBg} alt="">
        </img>
        <div className="info-div">
          <h2>Unlimited films, TV programmes and more.</h2>
          <h3>Watch anywhere. Cancel at any time.</h3>
          <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
          <div className="email-container">
            <input className="email-input" type="email" placeholder="Email address"></input>
            <button className="email-button" onClick={() => {
              // dispatch(toggleRatedShow({ type: "movie", id: 123, likeStatus: 2 }))
            }}>Get Started </button>
          </div>
        </div>
      </div>

      <div className="tile">
        <div className="text-div">
          <h2>Enjoy on your TV.</h2>
          <h3>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</h3>
        </div>
        <div className="img-div"> <img src={NcloneTv} alt="" /></div>
      </div>

      <div className="tile">
        <div className="text-div">
          <h2>Download your programmes to watch offline.</h2>
          <h3>Save your favorite easily and always have something to watch.</h3>
        </div>
        <div className="img-div"> <img src={NcloneMobile} alt="" /></div>
      </div>

      <div className="tile">
        <div className="text-div">
          <h2>Watch everywhere.</h2>
          <h3>Stream unlimited films and TV programmes on your phone, tablet, laptop and TV without paying more.</h3>
        </div>
        <div className="img-div"> <img src={NcloneAnywhere} alt="" /></div>
      </div>

      <div className="tile">
        <div className="text-div">
          <h2>Create profiles for children.</h2>
          <h3>Send children on adventures with their favorite characters in a space made just for them – free with your membership.</h3>
        </div>
        <div className="img-div"> <img src={NcloneChildren} alt="" /></div>
      </div>

      <div className="faq-tile">
        <h2>Frequently Asked Questions</h2>

        <div className="question-tab">
          <div className="question__name" onClick={() => updateQuestionTabs(0)}>
            <h3>What is Nclone?</h3>
            <span>+</span>
          </div>

          {toggleQuestionTabs[0] &&
            <div className="question__answer">
              <h3>Nclone is a streaming service that offers a wide variety of award-winning TV programmes, films, anime, documentaries and more – on thousands of internet-connected devices.
                You can watch as much as you want, whenever you want, without a single advert – all for one low monthly price. There's always something new to discover, and new TV programmes and films are added every week!</h3>
            </div>}
        </div>

        <div className="question-tab">
          <div className="question__name" onClick={() => updateQuestionTabs(1)}>
            <h3>How much does Nclone cost?</h3>
            <span>+</span>
          </div>
          {toggleQuestionTabs[1] &&
            <div className="question__answer">
              <h3>Watch Nclone on your smartphone, tablet, smart TV, laptop or streaming device, all for one fixed monthly fee. Plans range from £6.99 to £15.99 a month. No extra costs, no contracts.</h3>
            </div>}
        </div>

        <div className="question-tab">
          <div className="question__name" onClick={() => updateQuestionTabs(2)}>
            <h3>Where can I watch?</h3>
            <span>+</span>
          </div>
          {toggleQuestionTabs[2] &&
            <div className="question__answer">
              <h3>Watch anywhere, anytime. Sign in with your Nclone account to watch instantly on the web from your personal computer or on any internet-connected device that offers the Nclone app, including smart TVs, smartphones, tablets, streaming media players and game consoles.
                You can also download your favorite programmes with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Nclone with you anywhere.</h3>
            </div>}
        </div>

        <div className="question-tab">
          <div className="question__name" onClick={() => updateQuestionTabs(3)}>
            <h3>How do I cancel?</h3>
            <span>+</span>
          </div>
          {toggleQuestionTabs[3] &&
            <div className="question__answer">
              <h3>Nclone is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account at any time.</h3>
            </div>}
        </div>

        <div className="question-tab">
          <div className="question__name" onClick={() => updateQuestionTabs(4)}>
            <h3>What can I watch on Nclone?</h3>
            <span>+</span>
          </div>
          {toggleQuestionTabs[4] &&
            <div className="question__answer">
              <h3>Nclone has an extensive library of feature films, documentaries, TV programmes, anime, award-winning Nclone originals, and more. Watch as much as you want, any time you want.</h3>
            </div>}
        </div>

        <div className="question-tab">
          <div className="question__name" onClick={() => updateQuestionTabs(5)}>
            <h3>Is Nclone good for children?</h3>
            <span>+</span>
          </div>
          {toggleQuestionTabs[5] &&
            <div className="question__answer">
              <h3>The Nclone Children's experience is included in your membership to give parents control while children enjoy family-friendly TV programmes and films in their own space.
                Children's profiles come with PIN-protected parental controls that let you restrict the maturity rating of content children can watch and block specific titles you don’t want children to see.</h3>
            </div>}
        </div>
        <div className="bottom-email-container">
          <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
          <div className="email-container">
            <input className="email-input" type="email" placeholder="Email address"></input>
            <button className="email-button">Get Started </button>
          </div>
        </div>
      </div>

    </div>
  )

}

export default FrontPage