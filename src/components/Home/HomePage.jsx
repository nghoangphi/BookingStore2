import React from 'react'; // Import React
import video from '../../assets/5350514911077.mp4';

const HomePage = (props) => {
    return (
        <div className="homepage-container">
            <video 
            autoPlay 
            muted 
            loop 
            >
                <source
                    src={video}
                    type="video/mp4" />
            </video>
            <div className='homepage-content'>
                <div className='title-1' style={{ color: 'yellow' }}></div>
                <div className='title-2'></div>

            </div>
        </div>
    )
}

export default HomePage;