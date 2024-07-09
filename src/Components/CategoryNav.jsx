// import { useEffect, useState } from 'react';
// import { Nav } from 'react-bootstrap';
// import electronics from '../assets/electronics.webp';
// import fashion from '../assets/fashion.avif';
// import img from '../assets/img.avif';

// const CategoryNav = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         // Fetch categories from API
//         const response = await fetch('http://localhost:8080/getallcategory');
//         if (!response.ok) {
//           throw new Error('Failed to fetch categories');
//         }
//         const data = await response.json();
//         setCategories(data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Mapping category names to their respective images
//   const categoryImages = {
//     Fashion: fashion,
//     Electronics: electronics,
//     // Add more categories and their images as needed
//     Default: img, // Default image if no specific image is found for a category
//   };

//   return (
//     <Nav className="justify-content-center bg-light py-2" style={{ marginTop: '50px' }}>
//       {categories.map((category, index) => (
//         <Nav.Item key={index}>
//           <Nav.Link href={`#${category.name.toLowerCase()}`}>
//             <div className="d-flex flex-column align-items-center">
//               <img
//                 src={categoryImages[category.name] || categoryImages.Default}
//                 alt={category.name}
//                 style={{ width: '50px', height: '50px', marginBottom: '5px', borderRadius: '50%' }}
//               />
//               <span className="text-dark">{category.name}</span>
//             </div>
//           </Nav.Link>
//         </Nav.Item>
//       ))}
//     </Nav>
//   );
// };

// export default CategoryNav;
// CategoryNav.jsx





import { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import electronics from '../assets/electronics.webp';
import fashion from '../assets/fashion.avif';
import img from '../assets/img.avif';

const CategoryNav = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://13.201.255.228:8080/getallcategory');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const categoryImages = {
    Fashion: fashion,
    Electronics: electronics,
    Default: img,
  };

  const handleCategory = (categoryId) => {
    navigate(`/category/${categoryId}`);
  }

  return (
    <Nav className="justify-content-center bg-light py-2" style={{ marginTop: '50px' }}>
      {categories.map((category, index) => (
        <Nav.Item key={index}>
          <Nav.Link onClick={() => handleCategory(category.id)}>
            <div className="d-flex flex-column align-items-center">
              <div style={{
                width: '60px',
                height: '60px',
                marginBottom: '5px',
                borderRadius: '50%',  /* Ensures the image is circular */
                overflow: 'hidden'    /* Clips the image to the container */
              }}>
                <img
                  src={categoryImages[category.name] || categoryImages.Default}
                  alt={category.name}
                  style={{
                    width: '100%',     /* Ensures the image takes up full width of the container */
                    height: '100%',    /* Ensures the image takes up full height of the container */
                    objectFit: 'cover' /* Ensures the image maintains aspect ratio and covers the container */
                  }}
                />
              </div>
              <span className="text-dark">{category.name}</span>
            </div>

          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default CategoryNav;

