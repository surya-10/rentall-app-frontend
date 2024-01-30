import logo from './logo.svg';
import './App.css';
import ImageUpload from './upload';
import { Route, Routes } from 'react-router-dom';
import BookBike from './components/bikePage';
import PaymentPage from './components/payment';
import AmountPay from './components/pay';
import Cancel from './components/cancel';
import Success from './components/success';
import Mybookings from './components/booking';
import Signup from './components/signup';
import Login from './components/login';
import CheckEmail from './checkEmail';
import UpdatePassword from './components/updatePassword';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/available-bikes' element={<ImageUpload/>}/>
        <Route path='/book/:id' element={<BookBike/>}/>
        <Route path='/payment/book' element={<PaymentPage/>}/>
        <Route path='/payment/confirm/:id/:price/:startDate/:endDate/:days' element={<AmountPay/>}/>
        <Route path='/cancel' element={<Cancel/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/bookings/:userId' element={<Mybookings/>}/>
        <Route exact path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element={<CheckEmail/>}/>
        <Route path='/new-password/:id' element={<UpdatePassword/>}/>
      </Routes>

    </div>
  );
}

export default App;
