import React from 'react';
import { connect } from "react-redux";
import { nanoid } from 'nanoid';
import classes from './Navbar.module.css';
import Logo from '../../icons/logo.png'
import Arrow from '../../icons/arrow.png'
import Cart from '../../icons/cart.png'
import { CURRENCY_ICONS } from '../../core/constans/currency'
import { bindActionCreators } from 'redux';
import { setCurrentCategoryAction, setCurrentCurrencyAction } from '../../core/actions/overal';

class Navbar extends React.Component {

  constructor() {
    super()
    this.state ={
      showCurrencies: false
    }
  }

  toogleShowCurrencies() {
    this.setState(prevState => ({
      showCurrencies: !prevState.showCurrencies
    }))
  }

  render() {
    const { categories, currentCurrency, currentCategory, setCurrentCategory, setCurrentCurrency, loadProductsByCategory } = this.props;
    const { showCurrencies } = this.state;

    const loadProducts = name => () => {
      setCurrentCategory(name)
      loadProductsByCategory(name)
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.button_container}>
          {categories && categories.map(el => (
             <div onClick={loadProducts(el.name)}  key={nanoid()} className={el.name === currentCategory ? classes.button_container__button_active : classes.button_container__button_passive}>
              {el.name}
            </div>
          ))}
        </div>
        <div className={classes.icon_container}>
          <img src={Logo} />
        </div>
        <div className={classes.shop_button_wrapper}>
          <button onClick={()=> this.toogleShowCurrencies()} className={classes.bag_buttons_wrapper}>
            <div className={classes.bag_buttons_wrapper__currency}>
              <div className={classes.bag_buttons_wrapper__currency__logo}>
                {CURRENCY_ICONS[currentCurrency]}
              </div>
              <div className={!showCurrencies ? classes.bag_buttons_wrapper__currency__arrow : classes.bag_buttons_wrapper__currency__arrow_opened}>
                <img src={Arrow} alt='arrow'/>
              </div>
              <div className={!showCurrencies ? classes.bag_buttons_wrapper__currency__currecnies_list : classes.bag_buttons_wrapper__currency__currecnies_list_opened}>
                {Object.keys(CURRENCY_ICONS).map(el => 
                  <div onClick={() => setCurrentCurrency(el)} key={nanoid()} className={classes.bag_buttons_wrapper__currency__currecnies_list__box}>
                    <div className={classes.currencies_logo}>{CURRENCY_ICONS[el]}</div>
                    <div className={classes.currencies_val}>{el}</div>
                  </div>  
                )}
              </div>
            </div>
          </button>
          <button className={classes.bag_buttons_wrapper__cart}>
            <img src={Cart}/>
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  categories: store.overalReducer.categories,
  currentCurrency: store.overalReducer.currentCurrency,
  currentCategory: store.overalReducer.currentCategory
})

const mapDispatchToProps = dispatch => ({
  setCurrentCategory: bindActionCreators(setCurrentCategoryAction, dispatch),
  setCurrentCurrency: bindActionCreators(setCurrentCurrencyAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
