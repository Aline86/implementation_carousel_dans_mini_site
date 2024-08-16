import s from './style.module.css';
import { useEffect, useState } from 'react';
import { FiveStarRating } from '../FiveStarRating/FiveStarRating';


interface TVShowData {
    tvShow: any
}
export function TVShowDetail({tvShow}: TVShowData) {
    const rating = tvShow.vote_average
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