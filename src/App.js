import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { loadCurrenciesThunk } from './core/thunk/overal';
import { loadProductsByCategoryThunk } from './core/thunk/products';
import Navbar from './components/Navbar/Navbar';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';
import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom";
import { withRouter } from 'react-router';

class App extends React.Component {

  componentDidMount(){
    const { currentCategory } = this.props
    this.props.loadCurrencies()
    this.props.loadProductsByCategory(currentCategory)
  }

  render() {
    const { url } = this.props.match;
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <ProductsPage/>
          </Route>
          <Route path='/cart'>
            <CartPage/>
          </Route>
          <Route path={`${url}:productId`}>
            <ProductPage />
          </Route>
        </Switch>
      </>
    )
  }
}

const mapStateToProps = store => ({
  currencies: store.overalReducer.currencies,
  categories: store.overalReducer,
  currentCategory: store.overalReducer.currentCategory
})

const mapDispatchToProps = dispatch => ({
  loadCurrencies: bindActionCreators(loadCurrenciesThunk, dispatch),
  loadProductsByCategory: bindActionCreators(loadProductsByCategoryThunk, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
