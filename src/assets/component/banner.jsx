import '../styles/banner.css'
import { useState, useEffect } from 'react'
import shirtbanner from '../img/shirtsbanner.png'
import shakebanner from '../img/shakebanner.png'
import bannerIMG from '../img/bannerShake.png'

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    
    const bannerImages = [
        bannerIMG
    ]

    useEffect(() => {
        if (bannerImages.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
            }, 5000) // Change slide every 5 seconds
            
            return () => clearInterval(interval)
        }
    }, [bannerImages.length])

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)
    }

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
    }

    return (
        <div className="banner-container">
            <div className="banner-wrapper">
                {bannerImages.map((image, index) => (
                    <div
                        key={index}
                        className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
                    >
                        <img src={image} alt={`Banner ${index + 1}`} className="banner-image" />
                    </div>
                ))}
            </div>

            <div className="banner-content">
                {/* <h1 className="banner-title">Welcome to Onistore</h1> */}
                {/* <p className="banner-subtitle">Discover Authentic Japanese Treasures</p> */}
                <button className="banner-cta">Explore Collection</button>
            </div>

            {bannerImages.length > 1 && (
                <>
                    <button className="banner-nav banner-nav-prev" onClick={handlePrevSlide}>❮</button>
                    <button className="banner-nav banner-nav-next" onClick={handleNextSlide}>❯</button>
                    
                    <div className="banner-dots">
                        {bannerImages.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                            ></span>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Banner

