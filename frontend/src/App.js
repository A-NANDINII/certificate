import React, { useState } from 'react';
import './App.css';
import Home from './Home';
import UploadForm from './UploadForm';
import ThankYou from './ThankYou';

function App() {
  const [page, setPage] = useState('home');

  const navigate = (to) => setPage(to);

  return (
    <div className="app">
      {page === 'home' && <Home navigate={navigate} />}
      {page === 'upload' && <UploadForm navigate={navigate} />}
      {page === 'thankyou' && <ThankYou navigate={navigate} />}
    </div>
  );
}

export default App;
