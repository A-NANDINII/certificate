const fs = require('fs');
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

async function generateCertificates(templatePath, data, coords) {
  const templateBytes = fs.readFileSync(templatePath);
  const generated = [];

  // Create output directory if it doesn't exist
  const outputDir = path.join(__dirname, 'certificates');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  for (const entry of data) {
    const pdfDoc = await PDFDocument.load(templateBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const { width, height } = firstPage.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Get percentage coordinates and convert to absolute positions
  const nameX = parseFloat(coords.nameX);
const nameY = parseFloat(coords.nameY);
const courseX = parseFloat(coords.courseX);
const courseY = parseFloat(coords.courseY);


    const fontSizeName = 24;
    const fontSizeCourse = 18;

    // Optionally center the text
    const nameTextWidth = font.widthOfTextAtSize(entry.Name, fontSizeName);
    const courseTextWidth = font.widthOfTextAtSize(entry.Course, fontSizeCourse);

    // Draw Name
    firstPage.drawText(entry.Name, {
      x: nameX - nameTextWidth / 2,
      y: nameY,
      size: fontSizeName,
      font,
      color: rgb(0, 0, 0),
    });

    // Draw Course
    firstPage.drawText(entry.Course, {
      x: courseX - courseTextWidth / 2,
      y: courseY,
      size: fontSizeCourse,
      font,
      color: rgb(0, 0, 0),
    });

    // Save PDF
    const sanitizedFileName = entry.Name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const outputFilename = `${sanitizedFileName}.pdf`;
    const outputPath = path.join(outputDir, outputFilename);
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);

    generated.push({
      path: outputPath,
      email: entry.Email,
      name: entry.Name,
    });
  }

  return generated;
}

module.exports = { generateCertificates };
