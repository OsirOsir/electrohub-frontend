import React, { useState, useEffect} from 'react';

import './App.css';
import OfferSection from './components/OfferSection';
import ItemsAll from './components/ItemsAll';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/items")
    .then(response => response.json())
    .then(data => setItems(data));
  }, []);

  return (
    <div className="App">
      <OfferSection items={items}/>
      <ItemsAll items={items}/>
    </div>
  );
}

export default App;
