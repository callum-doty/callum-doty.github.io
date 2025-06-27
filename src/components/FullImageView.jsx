// FullImageView.jsx
import '../styles/ProjectGallery.css';


const FullImageView = () => {
    return (
      <div className="full-image-container">
        <img 
          src={window.location.pathname.split('/gallery/')[1]} // Gets image path from URL
          alt="Full size view"
          className="full-size-image"
        />
      </div>
    );
  };
  
  export default FullImageView;
