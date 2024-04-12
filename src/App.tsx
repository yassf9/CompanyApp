import './App.css'
import { Provider} from 'react-redux';
import compstore from './Redux/Store';
import { ToastContainer } from 'react-toastify';
import Company from './Component/Company';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {

  return (
    <div>
      
        <Provider store={compstore}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Company />}></Route>
            </Routes>
          </BrowserRouter>
          <ToastContainer position='top-right'></ToastContainer>
      </Provider>
    </div>
  );
}

export default App
