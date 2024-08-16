import { useEffect, useState, useRef } from 'react'
import './styles/global.css'
import CarouselContainer from "./CarouselContainer"

interface CustomCarouselInfo {
  width: number, 
  height: number,
  cardNumber: number,
  gap: number,
  tvshows: Array<any>,
  updateCurrentTvShow: any,
  currentTvShow: any,

} 
function Carousel({width, height, gap, cardNumber, tvshows, updateCurrentTvShow, currentTvShow}: CustomCarouselInfo) {

  const [colors, setColors] = useState<any[]>([]);
  const [transitionFinished, setTransitionFinished] = useState(false);
  const [cardWidth, setCardWidth] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>();
  
  function generateColor() {
    setColors(tvshows);
  }

 
  function updateCardRef() {
    const cardWidth: number|undefined = cardRef.current?.clientWidth
    if(cardWidth !== undefined) {
      setCardWidth(cardWidth + 15)
    }
  }
 
  function updateTransitionState(state: boolean) {
    setTransitionFinished(state);
  }

  function updateColors(state: boolean) {
    setTransitionFinished(state);
  }

  useEffect(() => {
    generateColor();
  }, []);

  return (
    <div className="body-container" >
        {colors.length === cardNumber && 
          <CarouselContainer 
            width={width} 
            height={height} 
            gap={gap}
            updateColors={updateColors} 
            colors={colors} 
            transitionFinished={transitionFinished} 
            updateTransitionState={updateTransitionState} 
            cardWidth={cardWidth} 
            updateCardRef={updateCardRef} 
            cardRef={cardRef} 
            cardNumber={cardNumber}
            updateCurrentTvShow={updateCurrentTvShow}
            currentTvShow={currentTvShow}
          />
        }       
    </div>
    
  )
}

export default Carousel
