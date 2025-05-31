const express = require('express');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
require('dotenv').config();
const fs = require('fs');

const { generateCertificates } = require('./generate');
const { sendEmails } = require('./mailer');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.post('/upload', upload.fields([{ name: 'template' }, { name: 'data' }]), async (req, res) => {
  try {
    const templatePath = req.files.template[0].path;
    const dataPath = req.files.data[0].path;

    const { subject, message, nameX, nameY, courseX, courseY } = req.body;

    const workbook = xlsx.readFile(dataPath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const certs = await generateCertificates(templatePath, rows, {
      nameX: Number(nameX),
      nameY: Number(nameY),
      courseX: Number(courseX),
      courseY: Number(courseY),
    });

    await sendEmails(certs, subject, message);

    res.json({ message: 'Certificates sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating or sending certificates');
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
