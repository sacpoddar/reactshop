import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {
  // useState - add local state to component
  // React will preserve this state between re-renders
  // useState returns a pair: the current state value and a function that lets you update it.
  const [products, setProduct] = useState([])

  // By using useEffect Hook, you tell React that your component needs to do something after render.
  // Data fetching, setting up a subscription, and manually changing the DOM in React components are
  // all examples of side effects or just effects
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      // call setProduct of useState
      setProduct(data)
    }

    fetchProducts()
  }, [])

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
