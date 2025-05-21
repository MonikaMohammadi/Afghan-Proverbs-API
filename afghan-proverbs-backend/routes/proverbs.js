import { Router } from "express";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filepath = path.join(__dirname, '..', 'data', 'proverbs.json');



function readProverbs() {
    const data = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(data)
}

function writeProverbs(data) {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2))
}

// Get all 
router.get('/', (req,res) => {
    const { category, search } = req.query;
    let proverbs = readProverbs();

    if(category) {
        proverbs = proverbs.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if(search) {
        const q = search.toLowerCase();
        proverbs = proverbs.filter(p => p.textDari.toLowerCase().includes(q) ||
        p.textPashto.toLowerCase().includes(q) ||  
        p.translationEn.toLowerCase().includes(q)
        );
    }

    res.json(proverbs)
});


// Get random
router.get('/random', (req, res) => {
    const proberbs = readProverbs();
    const random = proberbs[Math.floor(Math.random() * proberbs.length)];
    res.json(random) 
})

// Get by id
router.get('/:id', (req, res) => {
    const proberbs = readProverbs();
    const proverb = proberbs.find(p => p.id === parseInt(req.params.id));

    if(!proverb) {
        return res.status(404).json({ error: 'Proverb not found'})
    } 
    res.json(proverb)
})

// Post or Add
router.post('/', (req, res) => {
    const { textDari, textPashto, translationEn, meaning, category } = req.body;
    const proverbs = readProverbs();
    const newId = proverbs.length > 0 ? Math.max(...proverbs.map(p => p.id)) + 1 : 1;

    const newProverb = {
        id: newId,
        textDari,
        textPashto,
        translationEn,
        meaning,
        category
    };


    proverbs.push(newProverb);
    writeProverbs(proverbs);
    res.status(201).json(newProverb);
})

// Put or Update
router.put('/:id', (req,res) => {
    const proverbs = readProverbs();
    const index = proverbs.findIndex(p => p.id === parseInt(req.params.id));

    if(index === -1) {
        return res.status(404).json({ error: 'Proverb not found'});
    }

    proverbs[index] = {...proverbs[index], ...req.body };
    writeProverbs(proverbs);
    res.json(proverbs[index])
})

// Delete
router.delete('/:id', (req, res) => {
    const proverbs = readProverbs();
    const filtered = proverbs.filter(p => p.id !== parseInt(req.params.id));

    if(filtered.length === proverbs.length) return res.status(404).json({ error: 'Proverb not found'})

    writeProverbs(filtered);
    res.status(204).end()
})

export default router;