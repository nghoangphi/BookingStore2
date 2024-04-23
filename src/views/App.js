import './App.scss';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
const App = () => {
  return (
    <div className="App-container">
      <div className='header-container'>
        <Header />

      </div>
      <div className='main-container'>
        <div className='sidenav-container'>




        </div>
        <div className='app-content'></div>
        <Outlet />
      </div>



    </div>
  );
}

export default App;
