import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
  // useState - add local state to component
  // React will preserve this state between re-renders
  // useState returns a pair: the current state value and a function that lets you update it.
  // const [products, setProduct] = useState([])

  // useDispatch - A hook to access the redux dispatch function.
  const dispatch = useDispatch()

  // useSelector - A hook to access the redux store's state.
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  // By using useEffect Hook, you tell React that your component needs to do something after render.
  // Data fetching, setting up a subscription, and manually changing the DOM in React components are
  // all examples of side effects or just effects
  useEffect(() => {
    // const fetchProducts = async () => {
    //   const { data } = await axios.get('/api/products')
    //   // call setProduct of useState
    //   setProduct(data)
    // }
    // fetchProducts()

    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}></Product>
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
