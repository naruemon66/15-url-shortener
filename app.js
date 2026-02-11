const express = require('express');
const app = express();
app.use(express.json());

app.post('/shorten', (req, res) => {
    res.json({ code: Date.now().toString(36) });
});

app.get('/:code', (req, res) => {
    res.redirect('https://example.com');
});

app.get('/stats/:code', (req, res) => {
    res.json({ clicks: 42 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
