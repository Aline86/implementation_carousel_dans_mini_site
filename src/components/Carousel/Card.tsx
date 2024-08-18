import { BACKDROP_BASE_SMALL_URL } from './../../config.tsx'
import { useEffect } from 'react';
interface CardData {
    data: any,
    cardRef: any,
    transitionFinished: boolean,
    trasnsType: string,
    transX: number,
    width: number, 
    height: number,
    gap: number,
    updateCurrentTvShow: any,
    currentTvShow: any

} 

function Card({data, cardRef, transitionFinished, trasnsType, transX, width, gap, height, updateCurrentTvShow, currentTvShow
} : CardData) { 
    const result = window.matchMedia("(max-width: 700px)");
    useEffect(() => {
    
    }, [currentTvShow])
    if(transitionFinished){
        return ( <div className="card-app" onClick={() => {updateCurrentTvShow(data)}} style={{ background: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url("${BACKDROP_BASE_SMALL_URL}${data.backdrop_path}") no-repeat center / cover`, width:`${!result.matches ?  `${width}px`: `calc(100vw - 40px)`}`, height:`${height}px`, marginRight:`${!result.matches ? gap : 10}px`, transition: `${trasnsType}`, marginLeft:`${result.matches ? gap * 0.5 : 0}px`, transform: `translateX(${transX}px)`}} ref={cardRef}>
            <span className='title'>{data.name}</span>
        </div> )
    }
    else {
        return ( <div onClick={() => { updateCurrentTvShow(data); }}  className="card-app" ref={cardRef} style={{ background: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url("${BACKDROP_BASE_SMALL_URL}${data.backdrop_path}") no-repeat center / cover`, width:`${!result.matches ? `${width}px`: `calc(100vw - 40px)`}`, height:`${height}px`, marginRight:`${!result.matches ? gap :  10}px`, marginLeft:`${result.matches ? gap * 0.5 : 0}px`}}>
            <span className='title'>{data.name}</span>
        </div> )
    }
}

export default Card