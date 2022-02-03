import React from 'react';
import { connect } from "react-redux";
import classes from './ProductsPage.module.css';
import Product from './components/Product';

class Products extends React.Component {

  render() {
    const { products } = this.props;

    return (
      <div className={classes.wrapper}>
        {products && products.map(product => <Product key={product.id} product={product} inStock={product.inStock} />)}
      </div>
    )
  }
}

const mapStateToProps = store => ({
  products: store.productsReducer.products
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);
