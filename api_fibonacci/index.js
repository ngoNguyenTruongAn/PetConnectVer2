const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

// Hàm tạo dãy Fibonacci
const fibCache = new Map();

function generateFibonacci(n) {
    if (fibCache.has(n)) return fibCache.get(n);

    const fib = new Array(n);
    fib[0] = 0;
    if (n > 1) fib[1] = 1;
    for (let i = 2; i < n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }

    fibCache.set(n, fib);
    return fib;
}


// Endpoint: /fibonacci?n=10
app.get('/fibonacci', (req, res) => {
    const n = parseInt(req.query.n);
    if (isNaN(n) || n < 1) {
        return res.status(400).json({ error: "Tham số 'n' phải là số nguyên dương" });
    }

    const sequence = generateFibonacci(n);
    res.json({ result: sequence });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
