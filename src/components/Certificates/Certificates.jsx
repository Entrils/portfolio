import React, { useEffect, useState, Children, cloneElement } from 'react'
import styles from "./Certificates.module.css";
import { getImageUrl } from '../../utils';
import certificates from "../../data/certificates.json";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const Certificates = ({children}) => {
  const CERT_WIDTH = 710;
  const [pages, setPages] = useState([])
  const [offset,setOffset] = useState([])

  const handleLeftArrowClick = () =>{
    //console.log('Left');
    setOffset(currentOffset =>{
      const newOffset = currentOffset + CERT_WIDTH;
      //console.log(newOffset)
      return Math.min(newOffset,0);
    })
  }

  const handleRightArrowClick = () =>{
    //console.log('Right');

    setOffset((currentOffset) => {
      const newOffset = currentOffset - CERT_WIDTH;

      const maxOffset = -(CERT_WIDTH *(pages.length-1))
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
      <FaChevronLeft className={styles.arrow} onClick={handleLeftArrowClick}/>
      <div className={styles.content}>
      <div className={styles.certificates}
        style={{
          transform: `translateX(${offset}px)`
        }}>
        {pages}</div>
      </div>
      <FaChevronRight className={styles.arrow} onClick={handleRightArrowClick}/>
      </div>
    </section>
  );
}
