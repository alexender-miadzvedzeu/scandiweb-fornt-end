import React from 'react';
import { connect } from "react-redux";
import classes from './ProductPage.module.css';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { loadProductByIdThunk } from '../../core/thunk/products';
import { nanoid } from 'nanoid';
import { CURRENCY_ICONS } from '../../core/constans/currency'
import { removeHTMLtagFromString } from '../../core/helpers/removeHTMLtagFromString';
import { changeProductAttributeAction, removeProductByIdAction } from '../../core/actions/products';
import { addProductToCartAction } from '../../core/actions/cart';

class ProductPage extends React.Component {

  constructor() {
    super()
    this.state = {
      currentImgUrl: '',
    }
  }

  componentDidMount() {
    const { productId } = this.props.match.params
    this.props.loadProductById(productId)
  }

  componentWillUnmount() {
    this.props.removeCurrentProduct()
  }

  render() {
    const { currentProduct, currentCurrency, changeProductAttribute, addProductToCart } = this.props;
    const { currentImgUrl, error, errorText } = this.state;

    const onImageClick = currentImgUrl => this.setState({ currentImgUrl })
    const isValidAttributes = currentProduct && currentProduct.attributes.reduce((acc, val) => val.items.every(e => !e.selected) ? false : acc, true)
    const addToCart = () => {
      if (isValidAttributes) {
        addProductToCart(currentProduct);
        this.props.history.push('/')
      } else {
        this.setState({ 
          error: true,
          errorText: 'Chose the option'
        })
      }
    }

    return (
      <div className={classes.wrapper}>
        {currentProduct && (
          <>
            <div className={classes.wrapper__gallery}>
              <div className={classes.wrapper__gallery__navBar}>
                {currentProduct.gallery.map(url => <img
                  key={nanoid()}
                  onClick={() => onImageClick(url)}
                  className={classes.wrapper__gallery__navBar__img}
                  src={url}
                  alt='img'
                />)}
              </div>
              <div className={classes.wrapper__gallery__currentImage}>
                <img src={currentImgUrl ? currentImgUrl : currentProduct.gallery[0]} />
              </div>
            </div>
            <div className={classes.wrapper__info}>
              <div className={classes.wrapper__info__title}>
                <h1 className={classes.wrapper__info__brand_name}>
                  {currentProduct.brand}
                </h1>
                <h2 className={classes.wrapper__info__product_name}>
                  {currentProduct.name}
                </h2>
              </div>
              <div className={classes.wrapper__info__attributes}>
                {currentProduct.attributes.map(atr => {
                  return (
                    <div key={atr.id}>
                      <h3 className={classes.wrapper__info__attributes__name}>
                        {`${atr.name}:`}
                      </h3>
                      <div className={classes.wrapper__info__attributes__box}>
                        {atr.items.map(val => {
                          return (
                            <div 
                              onClick={() => changeProductAttribute(atr.id, val.value)} 
                              className={val.selected ? classes.wrapper__info__attributes__box__attribute_selected : classes.wrapper__info__attributes__box__attribute} 
                              key={nanoid()}
                            >
                              {val.displayValue}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className={classes.wrapper__info__price}>
                <h3 className={classes.wrapper__info__attributes__name}>Price:</h3>
                <h3 className={classes.wrapper__info__price__value}>
                  {`${CURRENCY_ICONS[currentCurrency]} ${currentProduct.prices.reduce((acc, val) => {
                    return acc = val.currency === currentCurrency ? val.amount : acc
                  }, '')}`}
                </h3>
              </div>
              {error && <span className={classes.wrapper__error}>{errorText}</span>}
              <button onClick={addToCart} className={classes.wrapper__addToCartButton}>
                Add to cart
              </button>
              <p className={classes.wrapper__productDescription}>
                {removeHTMLtagFromString(currentProduct.description)}
              </p>
            </div>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = store => ({
  currentProduct: store.productsReducer.currentProduct,
  isLoading: store.productsReducer.isLoading,
  currentCurrency: store.overalReducer.currentCurrency
})

const mapDispatchToProps = dispatch => ({
  loadProductById: bindActionCreators(loadProductByIdThunk, dispatch),
  removeCurrentProduct: bindActionCreators(removeProductByIdAction, dispatch),
  changeProductAttribute: bindActionCreators(changeProductAttributeAction, dispatch),
  addProductToCart: bindActionCreators(addProductToCartAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductPage));
