import type { Product as ProductType } from "./Product.tsx"

export default function Cart({cartItems, handleRemoveProduct, totalPrice}: {cartItems: ProductType[], handleRemoveProduct: (product: ProductType) => void, totalPrice: () => number}) {
    return (
        <div>
            <h1>Cart</h1>
            {cartItems.length === 0 ? (
                <p>Empty cart</p>
            ) : (
                cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <p>{item.description}</p>
                        <button onClick={() => handleRemoveProduct(item)}>Remove</button>
                    </div>
                ))
            )}
            <p>Total price: {totalPrice()}</p>
        </div>
    )
}