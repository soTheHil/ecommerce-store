import './App.css';
import Product from './Components/Product';
import data from './data';
function App() {
  return (
    <div className="App">
      <header>
        Delta Games
      </header>
      <main>
        <div className='productsView'>
          {
            data.map(g => <Product product={g} />)
          }
        </div>
       
      </main>
    </div>
  );
}

export default App;
