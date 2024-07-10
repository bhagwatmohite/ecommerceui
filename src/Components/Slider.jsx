// /* eslint-disable react/no-unescaped-entities */
// import { Carousel } from 'react-bootstrap';
// import image from '../assets/img.avif';
// import img2 from '../assets/img2.avif';

// const Slider = () => {
//   return (
//     <Carousel>
//       <Carousel.Item>
//         <div style={{
//           maxWidth: '100%',      /* Ensures the image takes up full width of the carousel */
//           height: '800px',       /* Sets the fixed height for the carousel item */
//           overflow: 'hidden',
//           position: 'relative'
//         }}>
//           <img
//             className="d-block w-100"
//             src={image}
//             alt="First slide"
//             style={{
//               height: '100%',     /* Ensures the image takes up full height of the container */
//               objectFit: 'cover'  /* Ensures the image maintains aspect ratio and covers the container */
//             }}
//           />
//         </div>
//         <Carousel.Caption>
//           <h3>The Grand Gadget Days</h3>
//           <p>Up to 80% off on electronics and accessories</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <div style={{
//           maxWidth: '100%',      /* Ensures the image takes up full width of the carousel */
//           height: '800px',       /* Sets the fixed height for the carousel item */
//           overflow: 'hidden',    /* Clips the image to the container */
//           position: 'relative'   /* Ensures captions align correctly */
//         }}>
//           <img
//             className="d-block w-100"
//             src={img2}
//             alt="Second slide"
//             style={{
//               height: '100%',     /* Ensures the image takes up full height of the container */
//               objectFit: 'cover'  /* Ensures the image maintains aspect ratio and covers the container */
//             }}
//           />
//         </div>
//         <Carousel.Caption>
//           <h3>Another great deal</h3>
//           <p>Don't miss out on these offers</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//   );
// };

// export default Slider;




/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';

const Slider = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await axios.get('http://13.201.255.228:8080/allsliderimages');
        setSliderImages(response.data); // Assuming the API returns an array of image objects
      } catch (error) {
        console.error('Error fetching slider images:', error);
        setError('Error fetching slider images'); // Set error state
      }
    };

    fetchSliderImages();
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Display error message if fetch fails
  }

  return (
    <Carousel>
      {sliderImages.map((image, index) => (
        <Carousel.Item key={index} >
          <div style={{
            height: '500px',       /* Sets the fixed height for the carousel item */
            width: '100%',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <img
              className="d-block"
              src={`http://13.201.255.228:8080/sliderImages/${image.image}`}  // Assuming your API response has a property 'image' for each image
              loading='eager'
              alt={`Slide ${index + 1}`}
              style={{
                width: '100%',
                height: '500px',  /* Fixed height for the image */
                objectFit: 'contian'  /* Ensures the image covers the entire container */
              }}
            />
          </div>
          {/* <Carousel.Caption>
            <h3>Another great deal</h3>
            <p>Don't miss out on these offers</p>
            <p>{image.description}</p>
          </Carousel.Caption> */}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;
