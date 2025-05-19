import express from 'express'
import indexRouter from './routes/index.js'
import path from 'path'

import { dirname } from 'path';
import { fileURLToPath } from 'url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 4500

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.json())
    .get("/", (req, res)=>res.sendFile(path.join(__dirname, 'views/index.html')))
    .use('/api', indexRouter)
    .listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));