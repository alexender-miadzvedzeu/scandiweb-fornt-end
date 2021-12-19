import React from 'react';
import { connect } from "react-redux";
import classes from './ProductsPage.module.css';
import Product from './components/Product';
import { Link } from "react-router-dom";

class Products extends React.Component {

  render() {
    const { products } = this.props;
    
    return (
      <div className={classes.wrapper}>
        {products && products.map(product => {
          return (
            <Link key={product.id} to={`/${product.id}`} className={classes.wrapper__links}>
              <Product product={product}/>
            </Link> 
            )
        })}
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
