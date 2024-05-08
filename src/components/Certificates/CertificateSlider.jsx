import React, { useState } from 'react'
import styles from './Certificates.module.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getImageUrl } from '../../utils';

export const CertificateSlider = ({data}) => {

    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide(slide === data.length-1 ? 0 : slide+1);
    }

    const prevSlide = () => {
        setSlide(slide === 0 ? data.length-1 : slide-1);
    }

  return (

    <div className={styles.carousel}>
    <FaChevronLeft className={styles.LeftArrow} onClick={prevSlide}/>
        {data.map((item, index)=>{
            return <img src={getImageUrl(item.imageSrc)} alt={item.title} key={index} className={slide === index ? styles.slide : styles.slideHdn}/>
        })}
          <FaChevronRight className={styles.RightArrow} onClick={nextSlide}/>
    <span className={styles.indicators}>
        {data.map((_, index) =>{
           return ( 
            <button key={index} 
            onClick={() => setSlide(index)}
            className={ slide === index ? styles.indicatorBtn : styles.indicatorBtnInactive}></button>
        )
        })}
    </span>
    </div>
  )
}
