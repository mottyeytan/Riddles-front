import Product from "./Product.tsx"
import { useState, useContext } from "react"
import { spc } from "../usecontext/selected.product.contect.tsx"
import Cart from "./Cart.tsx"
import type { Product as ProductType } from "./Product.tsx"


export default function Store() {
   const {value, setValue} = useContext(spc)

    function handleAddProduct(product: ProductType){
        setValue([...value, product])  
    }

    function handleRemoveProduct(product: ProductType){
        setValue(value.filter((item) => item.name !== product.name))
    }

    function handelTotalPrice(){
        return value.reduce((acc, item) => acc + item.price, 0)
    }

    
    
    return (
        <div className="store"> 
            <h1 className="store-title">Store</h1>
        <div className="store-container">
        <div className="product-list">
            <Product onAddTocart={handleAddProduct}  />   
        </div>
        <div className="cart-list">
            <Cart cartItems={value} handleRemoveProduct={handleRemoveProduct} totalPrice={handelTotalPrice}  />
        </div>
        </div>

        </div>
    )
}