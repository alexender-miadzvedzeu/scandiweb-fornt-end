import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { loadCategoriesThunk, loadCurrenciesThunk } from './core/thunk/overal';
import { loadProductsByCategoryThunk } from './core/thunk/products';
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.props.loadCurrencies()
    this.props.loadCategories()
    .then(() => {
      const { currentCategory } = this.props
      this.props.loadProductsByCategory(currentCategory)
    })
  }

  _loadProductsByCategory(currentCategory) {
    this.props.loadProductsByCategory(currentCategory)
  }  

  loadProductsByCategory = this._loadProductsByCategory.bind(this)

  render() {
    return (
      <>
        <Navbar 
          loadProductsByCategory={this.loadProductsByCategory}
        />
        <Products />
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
  loadCategories: bindActionCreators(loadCategoriesThunk, dispatch),
  loadProductsByCategory: bindActionCreators(loadProductsByCategoryThunk, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
