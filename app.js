const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory data stores
let shops = [];
let items = [];

// Helper function to find a shop by ID
function findShop(shopId) {
    return shops.find(shop => shop.id === parseInt(shopId));
}

// Helper function to find an item by ID
function findItem(itemId) {
    return items.find(item => item.id === parseInt(itemId));
}

// Create a new shop
app.post('/shops', (req, res) => {
    const { name, location } = req.body;
    const newShop = {
        id: shops.length + 1,
        name,
        location
    };
    shops.push(newShop);
    res.status(201).json(newShop);
});

// Get all shops
app.get('/shops', (req, res) => {
    res.json(shops);
});

// Get a specific shop by ID
app.get('/shops/:id', (req, res) => {
    const shop = findShop(req.params.id);
    if (shop) {
        res.json(shop);
    } else {
        res.status(404).json({ message: 'Shop not found' });
    }
});

// Update a shop by ID
app.put('/shops/:id', (req, res) => {
    const shop = findShop(req.params.id);
    if (shop) {
        const { name, location } = req.body;
        shop.name = name || shop.name;
        shop.location = location || shop.location;
        res.json(shop);
    } else {
        res.status(404).json({ message: 'Shop not found' });
    }
});

// Delete a shop by ID
app.delete('/shops/:id', (req, res) => {
    const shopIndex = shops.findIndex(shop => shop.id === parseInt(req.params.id));
    if (shopIndex !== -1) {
        shops.splice(shopIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Shop not found' });
    }
});

// Create a new item for a shop
app.post('/shops/:shopId/items', (req, res) => {
    const shop = findShop(req.params.shopId);
    if (shop) {
        const { name, price } = req.body;
        const newItem = {
            id: items.length + 1,
            shopId: shop.id,
            name,
            price
        };
        items.push(newItem);
        res.status(201).json(newItem);
    } else {
        res.status(404).json({ message: 'Shop not found' });
    }
});

// Get all items for a specific shop
app.get('/shops/:shopId/items', (req, res) => {
    const shop = findShop(req.params.shopId);
    if (shop) {
        const shopItems = items.filter(item => item.shopId === shop.id);
        res.json(shopItems);
    } else {
        res.status(404).json({ message: 'Shop not found' });
    }
});

// Get a specific item by ID
app.get('/items/:id', (req, res) => {
    const item = findItem(req.params.id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Update an item by ID
app.put('/items/:id', (req, res) => {
    const item = findItem(req.params.id);
    if (item) {
        const { name, price } = req.body;
        item.name = name || item.name;
        item.price = price || item.price;
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(item => item.id === parseInt(req.params.id));
    if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});
