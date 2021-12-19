import React from 'react';
import { connect } from "react-redux";
import { nanoid } from 'nanoid';
import classes from './Product.module.css';
import { CURRENCY_ICONS } from '../../../core/constans/currency';

class Product extends React.Component {

  render() {
    const { product, currentCurrency } = this.props;
    return (
      <div  className={classes.wrapper}>
        <div className={classes.image_container}>
          <img src={product.gallery[0]} alt='image'/>
        </div>
        <div className={classes.info_container}>
          <div className={classes.info_container__text}>
            <div className={classes.info_container__text_name}>
              {product.name}
            </div>
            <div className={classes.info_container__text_brand}>
              {product.brand}
            </div>
          </div>
          <div className={classes.info_container__price}>
            {CURRENCY_ICONS[currentCurrency]}
            {product.prices.filter(price => price.currency === currentCurrency)[0].amount}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  products: store.productsReducer.products,
  currentCurrency: store.overalReducer.currentCurrency,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Product);
