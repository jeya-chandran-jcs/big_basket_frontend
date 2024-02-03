import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from './pages/Login.js';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import Bill from './pages/Bill.jsx';
function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/bill/:billId" element={<Bill />} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
