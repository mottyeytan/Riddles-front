import { createContext } from "react"
import { useState } from "react"
import type { Product as ProductType } from "../componets/Product.tsx"


export const spc = createContext ({} as {value: ProductType[], setValue: (value: ProductType[]) => void});


export default function SelectedProductContext(props: any){
const [selectedProduct, setSelectedProduct] = useState<ProductType[]>([])

return (
    <spc.Provider value={{
        value: selectedProduct,
        setValue: setSelectedProduct}}>
       {props.children}
    </spc.Provider>
)
}


