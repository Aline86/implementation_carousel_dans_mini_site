import { useEffect, useState } from 'react';
import s from './style.module.css';
import { StarFill, Star as StarEmpty, StarHalf } from 'react-bootstrap-icons';

interface FiveStarRatingData {
    rating: number
}
export function FiveStarRating({rating}: FiveStarRatingData) {
    const [htmlOutput, sethtmlOutput] = useState([])

    const returnStars = () => {
        const deb_full: string = String(Math.floor(rating / 2));
        const full = parseFloat(deb_full);
        const remainder = rating - full;
  
        let htmlOutputData: any = [];

        for (let index = 0; index < full; index++) {
            htmlOutputData.push(<StarFill />)
        }
        if(remainder >= 0.5) {
            htmlOutputData.push(<StarHalf />)
            for (let index = 0; index < 5 - full - 1; index++) {
                htmlOutputData.push(<StarEmpty />)
            }
        }
        else {
            for (let index = 0; index < 5 - full; index++) {
                htmlOutputData.push(<StarEmpty />)
            }
        }
        
       
        return sethtmlOutput(htmlOutputData);
    }

    useEffect(() => {
        returnStars()
    }, [rating])
    return (
        <div className={s.rating_container}>
            {htmlOutput.length === 5 && (
                htmlOutput.map((value, index) => {
                    return (
                        <div key={index} className={s.rating}>{value}</div>
                    )
                })
            )}
        </div>
    )
}