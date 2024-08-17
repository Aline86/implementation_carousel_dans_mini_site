import { useEffect } from 'react';
import s from './style.module.css';
import  image  from "../../assets/img/logo.png";

interface LogoData {
    title: string,
    subtitle: string
}

export function Logo({title, subtitle}: LogoData) {
    

    useEffect(() => {
     
    }, [])
    return (
        <>
            <div className={s.container_class}>
            <img src={image} alt="" />
            <span className={s.title}>{title}</span>
            </div>
            <span>{subtitle}</span>
        </>
        
    )
}