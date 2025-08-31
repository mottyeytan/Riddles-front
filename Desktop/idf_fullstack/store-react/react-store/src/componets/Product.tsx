import "../componets.css/product.css"



export interface Product {
    name: string
    description: string 
    price: number
}

const products: Product[]= [
    {
        name: "Product 1",
        description: "Description 1",
        price: 100
    },
    {
        name: "Product 2",
        description: "Description 2",
        price: 200
    },
    
]




export default function product({onAddTocart}: {onAddTocart: (product: Product) => void}) {
    
    
    return (
        <div className="product">
            <h1>Products</h1>
            {products.map((product) => (
                <div key={product.name} className="product-item">
                    <h2>{product.name}</h2>
                    <p>{product.price}</p>
                    <p>{product.description}</p>
                    <button onClick={() => onAddTocart(product)}>
                        Add to cart
                    </button>
                </div>
            ))}
        </div>
    )
}