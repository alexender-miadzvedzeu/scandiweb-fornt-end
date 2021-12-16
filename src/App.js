import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { loadCategoriesThunk, loadCurrenciesThunk } from './core/thunk/overal';
import Navbar from './components/Navbar/Navbar';

class App extends React.Component {

  componentDidMount(){
    this.props.loadCurrencies()
    this.props.loadCategories()
  }

  render() {
    return (
      <>
        <Navbar/>
      </>
    )
  }
}

const mapStateToProps = store => ({
  currencies: store.overalReducer.currencies,
  categories: store.overalReducer,
})

const mapDispatchToProps = dispatch => ({
  loadCurrencies: bindActionCreators(loadCurrenciesThunk, dispatch),
  loadCategories: bindActionCreators(loadCategoriesThunk, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
