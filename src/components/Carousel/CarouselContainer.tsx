import { useEffect, useState } from 'react'
import Card from "./Card"

interface CarouselData {
  colors: any[],
  transitionFinished: boolean,
  cardWidth: number,
  updateCardRef: any,
  updateColors: any,
  cardRef: any,
  updateTransitionState: any,
  width: number, 
  height:number,
  gap: number,
  cardNumber: number,
  updateCurrentTvShow: any,
  currentTvShow: any,

} 

function CarouselContainer({currentTvShow, colors,  transitionFinished, cardWidth, updateCardRef, cardRef, updateTransitionState, updateColors, width, gap, height, cardNumber, updateCurrentTvShow} : CarouselData) {
  const [trigger, setTrigger] = useState(0);
  const [move, setMove] = useState(0);
  const [isLeft, setIsLeft] = useState(true);
  const result = window.matchMedia("(max-width: 700px)");
  
  function updateTransitionLeft() {
    const popItem = colors.shift();
    if(popItem !== undefined) {
      colors.push(popItem)
      updateColors(colors);
      updateTransitionState(true);
    }   
  }

  function updateTransitionRight() {
    const popItem = colors.pop();
    if(popItem !== undefined) {
      colors.unshift(popItem)
      updateColors(colors);
      updateTransitionState(true);
    }
  }
 
  function moveLeft() {
    setMove(-cardWidth - gap + 15);
    setIsLeft(true)
    setTrigger(trigger + 1);
    updateTransitionState(true)
  }

  function moveRight() {
    setMove(cardWidth + gap - 15);
    setIsLeft(false)
    setTrigger(trigger + 1);
    updateTransitionState(true)
  }

  useEffect(() => {
    updateCardRef()
  }, []);

  useEffect(() => {
    if(isLeft) {
      updateTransitionLeft()
    }
    else
    {
      updateTransitionRight()
    }
  }, [trigger]);

  return (
    <div className="body" onTransitionEnd={() => updateTransitionState(false)}>
      {transitionFinished ? (<button className="left" onClick={() => moveRight()} style={{marginRight: `${!result.matches ? gap : 0 }px`, pointerEvents: 'none', color: 'lightgray'}}  >&#x27E8;</button>) : (<button className="left" onClick={() => moveLeft()} style={{marginRight: `${gap}px`}}><span>&#x27E8;</span></button>) }
      <div className="container_class" style={{minWidth:`${cardWidth + gap } px`, margin: `${gap}px auto`, height: `${height + 2}px`, width: `${width * (cardNumber)}px`, maxWidth: "100%"}} >
          <div className="card-container" style={{ minWidth:`${cardWidth + gap - 15 }px`, transform: `translateX(-${ cardWidth + gap - 15 }px)`}}>
            <div className="cards">
              
              {
                colors.map((value, index) => {
                  return (
                    <Card  currentTvShow={currentTvShow} updateCurrentTvShow={updateCurrentTvShow} key={index} data={value} cardRef={cardRef} transitionFinished={transitionFinished} trasnsType={"transform 0.3s ease-in"} transX={move} width={width} gap={gap} height={height} />
                  )
                })
                
              }
              {
                <Card currentTvShow={currentTvShow} updateCurrentTvShow={updateCurrentTvShow} key={-1} data={colors[0]} cardRef={cardRef} transitionFinished={transitionFinished} trasnsType={"transform 0.3s ease-in"} transX={move} width={width} gap={gap} height={height} />
              }
            </div>
          </div>
      </div>
          {transitionFinished ? (<button className="right" onClick={() => moveLeft()} style={{marginLeft: `${!result.matches ? gap : 0 }px`, pointerEvents: 'none', color: 'lightgray'}}  >&#x27E9;</button>) : (<button className="right" onClick={() => moveRight()} style={{marginLeft: `${gap}px`}} ><span>&#x27E9;</span></button>) }   
    </div>
    
  )
}

export default CarouselContainer
