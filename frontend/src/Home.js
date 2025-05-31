import React from 'react';

function Home({ navigate }) {
  return (
    <div className="container">
      <h1>Welcome to Certificate Generator</h1>
      <p>This app generates personalized certificates and sends them via email.</p>
      <button onClick={() => navigate('upload')}>Start Generating</button>
    </div>
  );
}

export default Home;
