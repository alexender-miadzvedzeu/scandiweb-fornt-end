import React from 'react';
import { connect } from "react-redux";
import classes from './Product.module.css';
import { CURRENCY_ICONS } from '../../../core/constans/currency';
import ICON from '../../../icons/Icon.png'
import { bindActionCreators } from 'redux';
import { addProductToCartAction } from '../../../core/actions/cart';
import { Link } from "react-router-dom";

class Product extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  onCardOver() {
    this.setState({
      showCartButton: false
    })
  }

  onCardOut() {
    this.setState({
      showCartButton: true
    })
  }

  addProductToCartHandle(product, e) {
    e.stopPropagation()
    this.props.addProductWithoutAttr(product)
  }

  render() {
    const { product, currentCurrency, inStock } = this.props;
    const { showCartButton } = this.state;
    return (
      <div onMouseEnter={inStock ? this.onCardOut.bind(this) : null} onMouseLeave={inStock ? this.onCardOver.bind(this) : null} className={inStock ? classes.wrapper : classes.wrapper__out_of_stock}>
        <Link to={`/${product.id}`} className={classes.wrapper__links}>
          <div className={classes.image_container}>
            <img src={product.gallery[0]} alt='img' />
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
        </Link>
        {showCartButton && <div onClick={(e) => this.addProductToCartHandle(product, e)} className={classes.shopButton}>
          <img className={classes.shopButton__logo} alt="icon" src={ICON} />
        </div>}
        {!inStock && <p className={classes.out_of_stock}>OUT OF STOCK</p>}
      </div>
    )
  }
}

const mapStateToProps = store => ({
  products: store.productsReducer.products,
  currentCurrency: store.overalReducer.currentCurrency,
})

const mapDispatchToProps = dispatch => ({
  addProductWithoutAttr: bindActionCreators(addProductToCartAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Product);
