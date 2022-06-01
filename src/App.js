import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Booking from './components/Booking';

function App() {
  return (
    <div className="App">
      <Booking />
      <ToastContainer />
    </div>
  );
}

export default App;
