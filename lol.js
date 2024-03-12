const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());

app.post('/save-photo', (req, res) => {
    const photoData = req.body.photo.replace(/^data:image\/png;base64,/, "");
    const photoBuffer = Buffer.from(photoData, 'base64');
    const fileName = `captured_photo_${Date.now()}.png`;
    fs.writeFile(fileName, photoBuffer, (err) => {
        if (err) {
            console.error('Error saving photo:', err);
            res.status(500).send('Error saving photo');
        } else {
            console.log('Photo saved:', fileName);
            res.status(200).send('Photo saved successfully');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

fetch('http://localhost:3000/save-photo', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ photo: dataURL })
})