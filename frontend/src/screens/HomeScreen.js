import { useEffect, useState, useReducer } from 'react';
import React from 'react';

import axios from 'axios';
// import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';

import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
// import { Carousel } from 'react-bootstrap-carousel';

//defining reducer fn
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

function HomeScreen() {
  //   const [products, setProducts] = useState([]);
  //destructuring our passed variables and setting our initial state
  const [{ products, loading, error }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      // console.log(typeof fetch);
      try {
        const result = await axios.get('/api/products'); //get data from this link as we await
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
      //   setProducts(result.data); //get back the "data" that our backend is returninig with res.json
    };

    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Amazona</title>
      </Helmet>
      <h1>Featured Products</h1>

      <div className="mb-3">
        <Carousel>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src="https://afiaghana.com/wp-content/uploads/2021/06/bosphorus-restaurant-and-cafe-ghana-696x418.jpg"
              alt="First slide"
              style={{ height: '30vh', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src="https://media-cdn.tripadvisor.com/media/photo-s/06/b8/68/80/bosphorus-accra.jpg"
              alt="Second slide"
              style={{ height: '30vh', objectFit: 'cover' }}
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src="https://media.timeout.com/images/103127661/1372/772/image.jpg"
              alt="Third slide"
              style={{ height: '30vh', objectFit: 'cover' }}
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger"> {error} </MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
