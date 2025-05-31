import React from 'react';

function ThankYou({ navigate }) {
  return (
    <div className="container">
      <h1>Thank You!</h1>
      <p>The certificates have been generated and sent successfully.</p>
      <button onClick={() => navigate('home')}>Back to Home</button>
    </div>
  );
}

export default ThankYou;
