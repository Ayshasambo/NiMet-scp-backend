const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// The directory where files are stored, configured via .env
// We add ".." to reach the project root if the default directory is used
const FILE_DIRECTORY = process.env.FILE_DIRECTORY || path.join(__dirname, '..', 'files');

// Ensure the default directory exists if FILE_DIRECTORY is not set
if (!process.env.FILE_DIRECTORY && !fs.existsSync(FILE_DIRECTORY)) {
    fs.mkdirSync(FILE_DIRECTORY, { recursive: true });
}

router.get('/:date', (req, res) => {
    const { date } = req.params;
    
    // Basic validation for date format to be precisely 8 digits (YYYYMMDD)
    if (!/^\d{8}$/.test(date)) {
        return res.status(400).json({ 
            error: 'Invalid date format. Please provide the date in YYYYMMDD format (e.g., 20251215).' 
        });
    }

    // Construct the file name based on the specified format
    const fileName = `rr_mrg_${date}_ALL.nc`;
    const filePath = path.join(FILE_DIRECTORY, fileName);

    // Check if the file exists in the specified directory
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ 
            error: 'File not found.',
            details: `No file found for the date ${date} in the specified directory.`
        });
    }

    // Dynamically build the download URL based on the incoming request
    const protocol = req.protocol;
    const host = req.get('host');
    const downloadUrl = `${protocol}://${host}${req.originalUrl}/download`;

    return res.json({
        message: 'File found.',
        fileName: fileName,
        date: date,
        downloadUrl: downloadUrl
    });
});

router.get('/:date/download', (req, res) => {
    const { date } = req.params;
    
    const fileName = `rr_mrg_${date}_ALL.nc`;
    const filePath = path.join(FILE_DIRECTORY, fileName);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ 
            error: 'File not found.',
            details: `No file found for the date ${date} in the specified directory.`
        });
    }

    res.download(filePath, fileName, (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Internal server error while downloading the file.' });
            }
        }
    });
});

module.exports = router;
