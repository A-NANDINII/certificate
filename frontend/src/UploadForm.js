import React, { useState } from 'react';

function UploadForm({ navigate }) {
  const [template, setTemplate] = useState(null);
  const [excel, setExcel] = useState(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [nameX, setNameX] = useState(150);
  const [nameY, setNameY] = useState(300);
  const [courseX, setCourseX] = useState(150);
  const [courseY, setCourseY] = useState(270);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('template', template);
    form.append('data', excel);
    form.append('subject', subject);
    form.append('message', message);
    form.append('nameX', nameX);
    form.append('nameY', nameY);
    form.append('courseX', courseX);
    form.append('courseY', courseY);

    const res = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: form,
    });

    if (res.ok) {
      navigate('thankyou');
    } else {
      const result = await res.json();
      alert(result.message || 'Error sending certificates.');
    }
  };

  return (
    <div className="app-container">
      <h1>Upload Certificate Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="template">Upload Certificate Template (PDF)</label>
          <input type="file" id="template" accept="application/pdf" onChange={(e) => setTemplate(e.target.files[0])} required />
          <small>Only PDF format accepted.</small>
        </div>

        <div>
          <label htmlFor="excel">Upload Data File (Excel)</label>
          <input type="file" id="excel" accept=".xlsx,.xls" onChange={(e) => setExcel(e.target.files[0])} required />
          <small>Must contain: Name, Email, Course columns.</small>
        </div>

        <div>
          <label>Email Subject</label>
          <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </div>

        <div>
          <label>Email Message</label>
          <textarea placeholder="Message body" value={message} onChange={(e) => setMessage(e.target.value)} required />
        </div>

        <div>
          <h3>Coordinates for Name</h3>
          <label>X Position</label>
          <input type="number" value={nameX} onChange={(e) => setNameX(e.target.value)} required />
          <label>Y Position</label>
          <input type="number" value={nameY} onChange={(e) => setNameY(e.target.value)} required />
        </div>

        <div>
          <h3>Coordinates for Course</h3>
          <label>X Position</label>
          <input type="number" value={courseX} onChange={(e) => setCourseX(e.target.value)} required />
          <label>Y Position</label>
          <input type="number" value={courseY} onChange={(e) => setCourseY(e.target.value)} required />
        </div>

        <button type="submit">Generate & Send</button>
      </form>
    </div>
  );
}

export default UploadForm;
