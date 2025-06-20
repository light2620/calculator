import React from 'react'
import './style.css';
const vehiclePhotos = [
  { src: 'photo1.jpg', alt: 'Front View' },
  { src: 'photo2.jpg', alt: 'Rear View' },
  { src: 'photo3.jpg', alt: 'Side View' },
  { src: 'photo4.jpg', alt: 'Interior View' },
  { src: 'photo4.jpg', alt: 'Interior View' },
  { src: 'photo4.jpg', alt: 'Interior View' },
  { src: 'photo4.jpg', alt: 'Interior View' },
  { src: 'photo4.jpg', alt: 'Interior View' },
];
const VehiclePhotos = () => {
  return (
    <div className="vehicle-photo-container">
      <div className="vehicle-photo-header">
            <p>Vehicle Photos</p>
            <button>Upload Vehicle Photos</button>          
      </div>
     <div className="vehicle-photos-card">
{vehiclePhotos.map((photo, index) => (
            <div className="vehicle-photo" key={index}>
                <img src={photo.src} alt={photo.alt} />
            </div>
            ))}
     </div>
            

    </div> 
  )
}

export default VehiclePhotos
