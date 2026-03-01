import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import Confetti from "./Confetti";
import "./MessageCard.css";

function MessageCard({ isActive }) {
  const [curtainsOpened, setCurtainsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevIsActive = useRef(isActive);

  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const curtainHintRef = useRef(null);
  const messageContentRef = useRef(null);

  const message = `[Recipient Name],

Dear Nandu, 
The first day that i saw you i knew that she's gonna be somebody to me, it never really felt ki you're a stranger ive never talked to before but still i had to observe you from a distance and icl it was exhilerating, you're lit one of your own kind and when you talked to me for the first time it was so fbhdjdjd, i had heard you speak a million words but now you were talking to me first never thought you would. so anyways that day you made a part of me very happy btw. not because i am some obsessive psycho but because you made me realise that you were the friend i always wanted and i ever needed. I may not have been that good of a friend lately and been a lil absent but if you ever needed me even at 3am, ill rush towards you to be there for you without even thinking twice, you mean that much to me. *you literally deserved the whole world* and i hope that i could make this world a little lighter for you whenever you needed. You're one of the most amazing person yeah but you're also kind of a bitch (not to me but to others,yeah) so anyways 
If the world was divided into two -
One side will have all the answers to our questions
The other would have me and you,
Hustling against the waves 
Streaming down the avalanches
Screaming from the edge of a mountain
My veg biryani beside your chicken biryani
And sunset ahead
Supined on grass, stars overhead
Only if it's okay with you?
Only if you want me too...

HAPPY BIRTHDAY TO THE CANDLE OF MY LIFE 🫶🏼❤️🎀💗❤️‍🩹❤️‍🔥❣️💟💕💞💓🩷🧡💛💚💙🩵💜🤍🩶🖤🤎
  // Handle page transitions
  useEffect(() => {
    // Only trigger on transition to active
    if (isActive && !prevIsActive.current) {
      setTimeout(() => setShowConfetti(true), 10);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      prevIsActive.current = isActive;
      return () => clearTimeout(timer);
    }

    // Reset curtains when leaving page with smooth animation
    if (!isActive && prevIsActive.current) {
      setTimeout(() => {
        setCurtainsOpened(false);

        // Smooth reset animation
        if (curtainLeftRef.current && curtainRightRef.current) {
          const resetTimeline = gsap.timeline();

          resetTimeline.to([curtainLeftRef.current, curtainRightRef.current], {
            opacity: 1,
            duration: 0.3,
          });

          resetTimeline.to(
            [curtainLeftRef.current, curtainRightRef.current],
            {
              x: "0%",
              rotationY: 0,
              duration: 0.5,
              ease: "power2.inOut",
            },
            0.3
          );
        }

        if (messageContentRef.current) {
          gsap.to(messageContentRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
          });
        }
      }, 300);
    }

    prevIsActive.current = isActive;
    return undefined;
  }, [isActive]);

  const handleOpenCurtains = () => {
    if (!curtainsOpened) {
      setCurtainsOpened(true);

      // Detect screen size for responsive animations
      const isMobile = window.innerWidth <= 768;
      const isSmallMobile = window.innerWidth <= 480;

      // Adjust animation parameters based on screen size
      const duration = isSmallMobile ? 1.2 : isMobile ? 1.4 : 1.5;
      const rotationAngle = isSmallMobile ? 10 : isMobile ? 12 : 15;

      // Animate curtain hint fade out
      gsap.to(curtainHintRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.in",
      });

      // Animate curtains opening with 3D effect
      const timeline = gsap.timeline();

      timeline.to(
        curtainLeftRef.current,
        {
          x: "-100%",
          rotationY: -rotationAngle,
          duration: duration,
          ease: "power3.inOut",
        },
        0
      );

      timeline.to(
        curtainRightRef.current,
        {
          x: "100%",
          rotationY: rotationAngle,
          duration: duration,
          ease: "power3.inOut",
        },
        0
      );

      // Fade out curtains
      timeline.to(
        [curtainLeftRef.current, curtainRightRef.current],
        {
          opacity: 0,
          duration: 0.5,
          delay: isMobile ? 0.8 : 1,
        },
        0
      );

      // Reveal message content with smooth animation
      timeline.to(
        messageContentRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.8 : 1,
          ease: "back.out(1.2)",
          delay: isMobile ? 0.6 : 0.8,
        },
        0
      );
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = () => {
    if (!curtainsOpened) {
      // Add subtle scale effect on touch
      gsap.to(curtainHintRef.current, {
        scale: 0.95,
        duration: 0.1,
      });
    }
  };

  const handleTouchEnd = () => {
    if (!curtainsOpened) {
      gsap.to(curtainHintRef.current, {
        scale: 1,
        duration: 0.1,
      });
    }
  };

  return (
    <section className="message">
      <h2>💌 A Message From My Heart</h2>

      <div className="curtain-container">
        <div className="curtain-rod"></div>

        <div
          className={`curtain-wrapper ${
            curtainsOpened ? "opened opening" : ""
          }`}
          onClick={handleOpenCurtains}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="button"
          tabIndex={curtainsOpened ? -1 : 0}
          aria-label="Click or tap to open the curtains and reveal the birthday message"
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !curtainsOpened) {
              e.preventDefault();
              handleOpenCurtains();
            }
          }}
        >
          <div ref={curtainLeftRef} className="curtain curtain-left"></div>
          <div ref={curtainRightRef} className="curtain curtain-right"></div>
          {!curtainsOpened && (
            <div ref={curtainHintRef} className="curtain-hint">
              ✨ {window.innerWidth <= 768 ? "Tap" : "Click"} to Open ✨
            </div>
          )}
        </div>

        <div
          ref={messageContentRef}
          className="message-content"
          role="article"
          aria-label="Birthday message"
        >
          <p className="typed-text">{message}</p>
        </div>
      </div>

      {showConfetti && <Confetti />}
    </section>
  );
}

export default MessageCard;
