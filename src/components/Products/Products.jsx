import React from 'react';
import { connect } from "react-redux";
import { nanoid } from 'nanoid';
import classes from './Products.module.css';
import { CURRENCY_ICONS } from '../../core/constans/currency'
import { bindActionCreators } from 'redux';
import Product from './components/Product';

class Products extends React.Component {

  render() {
    const { products } = this.props;

    return (
      <div className={classes.wrapper}>
        {products && products.map(product => <Product key={product.id} product={product}/>)}
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
