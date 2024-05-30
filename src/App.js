import './App.css';
import './component/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Home from './component/home'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path ="/" element={<Home/>}/> 
         
          
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
