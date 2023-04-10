import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

// will be called inside shipping container at the top before header 
//it is row, of line with styled with checout-steps 2rem and have
//four cols one says signin shpping payment and  place order
//whichever step we pass will be active hence that col will be colored as our 
//styles suggest else empty
function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps">
        <Col className={props.step1 ? 'active': ' '}>Sign-In</Col>
        <Col className={props.step2 ? 'active': ' '}>Shipping</Col>
        <Col className={props.step3 ? 'active': ' '}>Payment</Col>
        <Col className={props.step4 ? 'active': ' '}>Place Order</Col>
        
    </Row>
  )
}

export default CheckoutSteps