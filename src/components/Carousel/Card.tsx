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

    useEffect(() => {
    
    }, [currentTvShow])
    if(transitionFinished){
        return ( <div className="card" onClick={() => {updateCurrentTvShow(data)}} style={{ background: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url("${BACKDROP_BASE_SMALL_URL}${data.backdrop_path}") no-repeat center / cover`, width:`${width}px`, height:`${height}px`, marginRight:`${gap}px`, transition: `${trasnsType}`, transform: `translateX(${transX}px)`}} ref={cardRef}>
            <span className='title'>{data.name}</span>
        </div> )
    }
    else {
        return ( <div onClick={() => { updateCurrentTvShow(data); }}  className="card" ref={cardRef} style={{ background: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url("${BACKDROP_BASE_SMALL_URL}${data.backdrop_path}") no-repeat center / cover`, width:`${width}px`, height:`${height}px`, marginRight:`${gap}px`}}>
            <span className='title'>{data.name}</span>
        </div> )
    }
}

export default Card