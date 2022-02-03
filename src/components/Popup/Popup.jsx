import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import classes from './Popup.module.css';
import { withRouter } from "react-router-dom";
import { CURRENCY_ICONS } from '../../core/constans/currency';
import { nanoid } from 'nanoid';
import { changeProductAttributeInCartAction, changeProductQuanityInCartAction } from '../../core/actions/cart';
import { Link } from 'react-router-dom';

class Popup extends React.Component {

  constructor() {
    super()
    this.state = {
    }
  }

  changeQuanityInCartHandle(index, type, e){
    e.stopPropagation()
    this.props.changeQuanityInCart(index, type)
  }

  changeProductAttributeInCartHandle(index, id, value, e){
    e.stopPropagation()
    this.props.changeProductAttributeInCart(index, id, value, e)
  }

  render() {
    const { 
      shopingBag, 
      currentCurrency,  
      closeBagPopupHandle 
    } = this.props;

    return (
      <div className={classes.wrapper}>
        {shopingBag.length > 0 ? (
          <>
            <div className={classes.wrapper__items}>
              {shopingBag.map((product, index) => {
                return (
                  <div 
                    key={nanoid()} 
                    className={classes.wrapper__items__item}
                  >
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
                                      onClick={(e) => this.changeProductAttributeInCartHandle(index, atr.id, val.value, e)}
                                      className={val.selected ? 
                                        classes.wrapper__info__attributes__box__attribute_selected : 
                                        classes.wrapper__info__attributes__box__attribute
                                      }
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
                    </div>
                    <div className={classes.wrapper__items__item__quanity_buttons}>
                      <div className={classes.wrapper__items__item__quanity_buttons_wrapper}>
                          <button 
                            onClick={(e) => this.changeQuanityInCartHandle(index, 'inc', e)} 
                            className={classes.wrapper__items__item__quanity_buttons_wrapper__button}
                          >+</button>
                          <p className={classes.wrapper__items__item__quanity_buttons_wrapper__val}>
                            {product.quantity}
                          </p>
                          <button 
                            onClick={(e) => this.changeQuanityInCartHandle(index, 'dec', e)} 
                            className={classes.wrapper__items__item__quanity_buttons_wrapper__button}
                          >-</button>
                      </div>
                      <div className={classes.wrapper__items__item__quanity_buttons__image_wrapper}>
                        <img src={product.gallery[0]} alt='img'/>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className={classes.bag_buttons_wrapper__cart__popup__opened__links}>
              <Link to='/cart' >
                <button 
                  onClick={() => closeBagPopupHandle()} 
                  className={classes.bag_buttons_wrapper__cart__popup__opened__links__button}
                >View bag</button>
              </Link>
              <button 
                className={classes.bag_buttons_wrapper__cart__popup__opened__links__checkout_button}
              >Check out</button>
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
  changeQuanityInCart: bindActionCreators(changeProductQuanityInCartAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Popup));
