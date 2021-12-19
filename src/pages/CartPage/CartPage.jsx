import React from 'react';
import { connect } from "react-redux";
import classes from './CartPage.module.css';
import { withRouter } from "react-router-dom";

class CartPage extends React.Component {

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    console.log('here')
    return (
      <div className={classes.wrapper}>
        Cart page
      </div>
    )
  }
}

const mapStateToProps = store => ({
  
})

const mapDispatchToProps = dispatch => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartPage));
