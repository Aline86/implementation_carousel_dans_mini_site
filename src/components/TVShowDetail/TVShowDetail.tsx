import s from './style.module.css';
import { useEffect } from 'react';
import { FiveStarRating } from '../FiveStarRating/FiveStarRating';


interface TVShowData {
    tvShow: any
}
export function TVShowDetail({tvShow}: TVShowData) {
    const average: string = tvShow.vote_average;
    const rating: number = Number(parseInt(average) * 0.5)
    useEffect(() => {
    }, [rating])
    return (
        <div>
            <div className={s.title}>{tvShow.name}</div>
            <div className={s.rating_container}>
                <FiveStarRating rating={rating}/>
                <div className={s.rating}>{rating}</div>
            </div>
            
            <div className={s.overview}>{tvShow.overview}</div>
        </div>
    )
}