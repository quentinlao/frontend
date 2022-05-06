import React, { useContext, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-scroll';
import PortfolioContext from '../../context/context';


const Header = () => {
  const { hero } = useContext(PortfolioContext);
  const { title, subname, name, subtitle, cta } = hero;

  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [numb, setNumb] = useState(0);
  const CONSTANTS = {
    DELETING_SPEED: 30,
    TYPING_SPEED: 50,
  };
  const [state, setState] = useState({
    text: "",
    message: "",
    isDeleting: false,
    loopNum: 0,
    typingSpeed: CONSTANTS.TYPING_SPEED,
  });

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsDesktop(true);
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsDesktop(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('This will run every second!');
      setNumb(getRandomInt(6));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

    useEffect(() => {
      let timer = "";
      const handleType = () => {
        setState(cs => ({
          ...cs, // cs means currentState
          text: getCurrentText(cs),
          typingSpeed: getTypingSpeed(cs)
        }));
        timer = setTimeout(handleType, state.typingSpeed);
      };
      handleType();
      return () => clearTimeout(timer);
    }, [state.isDeleting]);

    useEffect(() => {
      console.log("salut", subtitle)
      if (!state.isDeleting && state.text === state.message) {
        setTimeout(() => {
          setState(cs => ({
            ...cs,
            isDeleting: true
          }))
        }, 500);
      } else if (state.isDeleting && state.text === "") {
        setState(cs => ({
          ...cs, // cs means currentState
          isDeleting: false,
          loopNum: cs.loopNum + 1,
          message: getMessage(cs, subtitle)
        }));
      }
    }, [state.text, state.message, state.isDeleting, subtitle]);


    function getCurrentText(currentState) {
      return currentState.isDeleting
          ? currentState.message.substring(0, currentState.text.length - 1)
          : currentState.message.substring(0, currentState.text.length + 1);
    }

    function getMessage(currentState, data) {
      return data[Number(currentState.loopNum) % Number(data.length)];
    }

    function getTypingSpeed(currentState) {
      return currentState.isDeleting
          ? CONSTANTS.TYPING_SPEED
          : CONSTANTS.DELETING_SPEED;
    }

    return (
    <section id="hero" className="jumbotron">
      <Container>
        <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={500} distance="30px">
          <h1 className="hero-title">
            {title}{' '}<br/>
            {subname}<span className="text-color-main">{name},</span>
            <br />
          </h1>
          <h1 className="hero-job">{subtitle ? state.text : ''}<span id="cursor" />

          </h1>
        </Fade>
        <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
          <p className="hero-cta">
            <span className="cta-btn cta-btn--hero">
              <Link to="about" smooth duration={1000}>
                {cta}
              </Link>
            </span>
          </p>
        </Fade>
      </Container>
    </section>
  );
};

export default Header;
