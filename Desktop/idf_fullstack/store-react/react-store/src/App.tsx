import Store from './componets/store'
import SelectedProductContext from './usecontext/selected.product.contect'

function App() {
  

  return (
    <>
      <SelectedProductContext>
        <Store />
      </SelectedProductContext>
    </>
  )
}

export default App
