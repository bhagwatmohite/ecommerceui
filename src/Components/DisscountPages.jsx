
import { Card, Carousel, ListGroup } from 'react-bootstrap';

const DiscountPages = () => {
  // Dummy data for categories and their discounts with images
  const categories = [
    { id: 1, name: 'Electronics', discount: 10, image: 'electronics.jpg' },
    { id: 2, name: 'Clothing', discount: 20, image: 'clothing.jpg' },
    { id: 3, name: 'Books', discount: 15, image: 'books.jpg' },
    { id: 11, name: 'Electronics', discount: 10, image: 'electronics.jpg' },
    { id: 22, name: 'Clothing', discount: 20, image: 'clothing.jpg' },
    { id: 33, name: 'Books', discount: 15, image: 'books.jpg' },
    { id: 12, name: 'Electronics', discount: 10, image: 'electronics.jpg' },
    { id: 21, name: 'Clothing', discount: 20, image: 'clothing.jpg' },
    { id: 33, name: 'Books', discount: 15, image: 'books.jpg' },
    // Add more categories as needed
  ];

  // Split categories into chunks of 3 for default display
  const chunkSize = 3;
  const chunkedCategories = [];
  for (let i = 0; i < categories.length; i += chunkSize) {
    chunkedCategories.push(categories.slice(i, i + chunkSize));
  }

  return (
    <div className="container">
      <h2>Category Discounts</h2>
      <Carousel interval={null} indicators={false} wrap={false} className="mb-3">
        {chunkedCategories.map((chunk, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex">
              {chunk.map(category => (
                <Card key={category.id} style={{ width: '18rem', marginRight: '15px' }}>

                  <Card.Body>
                    <Card.Title>{category.name}</Card.Title>
                    <ListGroup variant="flush">
                      <ListGroup.Item>Discount: {category.discount}%</ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default DiscountPages;
