import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import classes from './CartPage.module.css';
import { withRouter } from "react-router-dom";
import { CURRENCY_ICONS } from '../../core/constans/currency';
import { nanoid } from 'nanoid';
import { changeProductAttributeInCartAction, changeProductQuanityInCartAction, listImageAction, removeFromBagAction } from '../../core/actions/cart';
import Arrow from '../../icons/Vector.png'

class CartPage extends React.Component {

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    const { 
      shopingBag, 
      currentCurrency, 
      changeProductAttributeInCart, 
      changeQuanityInCart, 
      removeFromBag, 
      listImage 
    } = this.props;

    const listImageHandler = (opt, index) => () => {
      listImage(opt, index)
    }
    return (
      <div className={classes.wrapper}>
        {shopingBag.length > 0 ? (
          <>
            <h3 className={classes.wrapper__title}>
              Cart
            </h3>
            <div className={classes.wrapper__items}>
              {shopingBag.map((product, index) => {
                return (
                  <div key={nanoid()} className={classes.wrapper__items__item}>
                    <div className={classes.wrapper__items__item__info}>
                      <span className={classes.wrapper__items__item__info__brand}>
                        {product.brand}
                      </span>
                      <span className={classes.wrapper__items__item__info__name}>
                        {product.name}
                      </span>
                      <h3 className={classes.wrapper__items__item__info__amount}>
                        {`${CURRENCY_ICONS[currentCurrency]} ${product.prices.reduce((acc, val) => {
                          return acc = val.currency === currentCurrency ? val.amount : acc
                        }, '')}`}
                      </h3>
                      <div className={classes.wrapper__items__item__info__attributes}>
                        {product.attributes.map(atr => {
                          return (
                            <div key={nanoid()}>
                              <h3 className={classes.wrapper__items__item__info__attributes__name}>
                                {`${atr.name}:`}
                              </h3>
                              <div className={classes.wrapper__items__item__info__attributes__box}>
                                {atr.items.map(val => {
                                  return (
                                    <div
                                      onClick={() => changeProductAttributeInCart(index, atr.id, val.value)}
                                      className={val.selected ? 
                                        classes.wrapper__info__attributes__box__attribute_selected : 
                                        classes.wrapper__info__attributes__box__attribute}
                                      key={nanoid()}
                                    >
                                      {val.displayValue}
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )})}
                      </div>
                      <button 
                        onClick={() => removeFromBag(index)} 
                        className={classes.wrapper__items__item__info__remove_button}
                      >Remove</button>
                    </div>
                    <div className={classes.wrapper__items__item__quanity_buttons}>
                      <div className={classes.wrapper__items__item__quanity_buttons_wrapper}>
                          <button 
                            onClick={() => changeQuanityInCart(index, 'inc')} 
                            className={classes.wrapper__items__item__quanity_buttons_wrapper__button}
                          >+</button>
                          <p className={classes.wrapper__items__item__quanity_buttons_wrapper__val}>
                            {product.quantity}
                          </p>
                          <button 
                            onClick={() => changeQuanityInCart(index, 'dec')} 
                            className={classes.wrapper__items__item__quanity_buttons_wrapper__button
                          }>-</button>
                      </div>
                      <div className={classes.wrapper__items__item__quanity_buttons__image_wrapper}>
                        {product.gallery.length > 1 && 
                          <button 
                            onClick={listImageHandler('prev', index)} 
                            className={classes.wrapper__items__item__quanity_buttons__image_wrapper__prev}
                          >
                            <img src={Arrow} alt='arrow'/>
                          </button>}
                        <img src={product.currentImage.url} alt='img'/>
                        {product.gallery.length > 1 && 
                          <button 
                            onClick={listImageHandler('next', index)} 
                            className={classes.wrapper__items__item__quanity_buttons__image_wrapper__next}
                          >
                            <img src={Arrow} alt='arrow'/>
                          </button>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (<h1 className={classes.wrapper__empty_cart}>
          Cart is empty
        </h1>)}
      </div>
    )
  }
}

const mapStateToProps = store => ({
  shopingBag: store.cartReducer.shopingBag,
  currentCurrency: store.overalReducer.currentCurrency
})

const mapDispatchToProps = dispatch => ({
  changeProductAttributeInCart: bindActionCreators(changeProductAttributeInCartAction, dispatch),
  changeQuanityInCart: bindActionCreators(changeProductQuanityInCartAction, dispatch),
  removeFromBag: bindActionCreators(removeFromBagAction, dispatch),
  listImage: bindActionCreators(listImageAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartPage));
