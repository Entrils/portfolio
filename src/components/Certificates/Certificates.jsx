import React, { useEffect, useState, Children, cloneElement, useRef } from 'react'
import styles from "./Certificates.module.css";
import { getImageUrl } from '../../utils';
import certificates from "../../data/certificates.json";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CSSTransition} from 'react-transition-group'

export const Certificates = ({children}) => {
  const CERT_WIDTH_FULL = 710;
  const [pages, setPages] = useState([])
  const [offset,setOffset] = useState([])

  const handleLeftArrowClick = () =>{
    //console.log('Left');
    setOffset(currentOffset =>{
      const newOffset = currentOffset + CERT_WIDTH_FULL;
      //console.log(newOffset)
      return Math.min(newOffset,0);
    })
  }

  const handleRightArrowClick = () =>{
    //console.log('Right');

    setOffset((currentOffset) => {
      const newOffset = currentOffset - CERT_WIDTH_FULL;

      const maxOffset = -(CERT_WIDTH_FULL *(pages.length-1))
      //console.log(newOffset)
      return Math.max(newOffset,maxOffset);
    })
 
  }

  useEffect(()=>{
    setPages(
      certificates.map((certificate,id) => {
        return <div key={id} className={styles.certificate}>
            <div className={styles.certificateImageContainer}>
              <img src={getImageUrl(certificate.imageSrc)} alt={certificate.title} />
            </div>
          </div>
      })
    )
  },[])
  
  return (
    
    <section className={styles.container} id='certificates'>
      <h2 className={styles.title}>Сертификаты</h2>
      <div className={styles.window}>
        
      <FaChevronLeft className={styles.LeftArrow} onClick={handleLeftArrowClick}/>
      <div className={styles.content}>
      <div className={styles.certificates}
        style={{
          transform: `translateX(${offset}px)`
        }}>
        {pages}</div>
      </div>
      <FaChevronRight className={styles.RightArrow} onClick={handleRightArrowClick}/>
      </div>
    </section>
  );
}
