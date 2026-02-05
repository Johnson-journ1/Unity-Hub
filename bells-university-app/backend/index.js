import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configure lowdb
const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const defaultData = {
    schoolInfo: {
        chancellor: {
            name: "Prof. Adebayo Adedeji",
            bio: "A distinguished academic and visionary leader with extensive experience in higher education administration."
        },
        vc: {
            name: "Prof. Jeremiah O. Akinpelu",
            bio: "Committed to academic excellence and innovation, with a strong background in engineering education."
        },
        staff: [
            {
                title: "Registrar",
                name: "Dr. Bola Oladejo",
                bio: "Ensuring administrative efficiency and student welfare with over 15 years of experience."
            },
            {
                title: "Bursar",
                name: "Mr. Adebayo Adeyemi",
                bio: "Managing financial operations and ensuring fiscal responsibility."
            },
            {
                title: "Librarian",
                name: "Dr. Funmi Ajayi",
                bio: "Overseeing the university's extensive digital and physical library resources."
            }
        ]
    },
    locations: [
        {
            name: "Main Campus",
            description: "The primary campus featuring modern academic buildings, laboratories, and student facilities.",
            category: "Campus",
            lat: 6.6889,
            lng: 3.5081
        },
        {
            name: "Engineering Faculty",
            description: "State-of-the-art engineering laboratories and workshops for practical learning.",
            category: "Faculty",
            lat: 6.6890,
            lng: 3.5082
        },
        {
            name: "Computer Science Building",
            description: "Modern computer labs, programming centers, and IT facilities.",
            category: "Faculty",
            lat: 6.6891,
            lng: 3.5083
        },
        {
            name: "Student Hostel A",
            description: "Comfortable accommodation for male students with modern amenities.",
            category: "Hostel",
            lat: 6.6892,
            lng: 3.5084
        },
        {
            name: "Student Hostel B",
            description: "Comfortable accommodation for female students with modern amenities.",
            category: "Hostel",
            lat: 6.6893,
            lng: 3.5085
        },
        {
            name: "Central Cafeteria",
            description: "Modern dining facility serving nutritious meals and refreshments.",
            category: "Cafeteria",
            lat: 6.6894,
            lng: 3.5086
        },
        {
            name: "Sports Complex",
            description: "Comprehensive sports facilities including basketball court, football field, and gymnasium.",
            category: "Sports",
            lat: 6.6895,
            lng: 3.5087
        },
        {
            name: "Administrative Building",
            description: "Central administration offices, registrar, and student services.",
            category: "Administration",
            lat: 6.6896,
            lng: 3.5088
        }
    ],
    businesses: [
        {
            name: "Campus Bookstore",
            description: "Official university bookstore offering textbooks, stationery, and Bells University merchandise.",
            image: "/uploads/bookstore.jpg"
        },
        {
            name: "Tech Hub Cafe",
            description: "Modern cafe with Wi-Fi, serving coffee, snacks, and light meals for students and staff.",
            image: "/uploads/cafe.jpg"
        },
        {
            name: "Print & Copy Center",
            description: "Full-service printing, copying, and document services available to students and faculty.",
            image: "/uploads/printshop.jpg"
        },
        {
            name: "Student Cooperative Store",
            description: "Affordable groceries, toiletries, and daily essentials run by the student cooperative.",
            image: "/uploads/coop.jpg"
        }
    ],
    news: [
        {
            title: "Bells University Achieves NUC Accreditation for All Programs",
            content: "We are pleased to announce that all academic programs at Bells University of Technology have received full accreditation from the National Universities Commission (NUC). This achievement underscores our commitment to maintaining the highest standards of education.",
            date: "2024-01-15"
        },
        {
            title: "New Engineering Laboratory Opens",
            content: "The state-of-the-art Engineering Innovation Laboratory has been officially opened, featuring cutting-edge equipment for research and practical training in various engineering disciplines.",
            date: "2024-01-10"
        },
        {
            title: "International Partnership with MIT",
            content: "Unity Hub has established a partnership with MIT for joint research programs and student exchange opportunities in technology and innovation.",
            date: "2024-01-05"
        },
        {
            title: "Graduation Ceremony 2024",
            content: "Over 800 students will graduate this year across various disciplines. The ceremony will be held on March 15th at the main auditorium.",
            date: "2024-01-01"
        }
    ],
    admins: [{ username: "admin", passcode: process.env.ADMIN_PASSCODE || "1111" }]
};
const db = new Low(adapter, defaultData);

// Initialize database
await db.read();
await db.write();

// Middleware
app.use(cors({origin: 'https://unity-hub-9.onrender.com'}));
app.use(express.json()); // for parsing application/json

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from the React app build directory (only in production)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend-vite/dist')));
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Authentication middleware
const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.substring(7);
    // Simple token check (in production, use proper JWT)
    if (token !== 'admin-token') {
        return res.status(401).json({ error: 'Invalid token' });
    }
    next();
};

// Admin login
app.post('/api/admin/login', async (req, res) => {
    const { passcode } = req.body;
    const admin = db.data.admins.find(a => a.passcode === passcode);
    if (admin) {
        res.json({ token: 'admin-token' });
    } else {
        res.status(401).json({ error: 'Invalid passcode' });
    }
});

// School Info routes
app.get('/api/school-info', async (req, res) => {
    res.json(db.data.schoolInfo);
});

app.put('/api/school-info', authenticateAdmin, async (req, res) => {
    db.data.schoolInfo = req.body;
    await db.write();
    res.json(db.data.schoolInfo);
});

// Locations routes
app.get('/api/locations', async (req, res) => {
    res.json(db.data.locations);
});

app.post('/api/locations', authenticateAdmin, async (req, res) => {
    const newLocation = { id: Date.now(), ...req.body };
    db.data.locations.push(newLocation);
    await db.write();
    res.json(newLocation);
});

app.put('/api/locations/:id', authenticateAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    const index = db.data.locations.findIndex(loc => loc.id === id);
    if (index !== -1) {
        db.data.locations[index] = { ...db.data.locations[index], ...req.body };
        await db.write();
        res.json(db.data.locations[index]);
    } else {
        res.status(404).json({ error: 'Location not found' });
    }
});

app.delete('/api/locations/:id', authenticateAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    db.data.locations = db.data.locations.filter(loc => loc.id !== id);
    await db.write();
    res.json({ message: 'Location deleted' });
});

// Businesses routes
app.get('/api/businesses', async (req, res) => {
    res.json(db.data.businesses);
});

app.post('/api/businesses', authenticateAdmin, upload.single('image'), async (req, res) => {
    const newBusiness = {
        id: Date.now(),
        name: req.body.name,
        description: req.body.description,
        image: req.file ? `/uploads/${req.file.filename}` : null
    };
    db.data.businesses.push(newBusiness);
    await db.write();
    res.json(newBusiness);
});

app.put('/api/businesses/:id', authenticateAdmin, upload.single('image'), async (req, res) => {
    const id = parseInt(req.params.id);
    const index = db.data.businesses.findIndex(biz => biz.id === id);
    if (index !== -1) {
        const updatedBusiness = {
            ...db.data.businesses[index],
            name: req.body.name || db.data.businesses[index].name,
            description: req.body.description || db.data.businesses[index].description,
            image: req.file ? `/uploads/${req.file.filename}` : db.data.businesses[index].image
        };
        db.data.businesses[index] = updatedBusiness;
        await db.write();
        res.json(updatedBusiness);
    } else {
        res.status(404).json({ error: 'Business not found' });
    }
});

app.delete('/api/businesses/:id', authenticateAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    const business = db.data.businesses.find(biz => biz.id === id);
    if (business && business.image) {
        const imagePath = path.join(__dirname, business.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
    db.data.businesses = db.data.businesses.filter(biz => biz.id !== id);
    await db.write();
    res.json({ message: 'Business deleted' });
});

// News routes
app.get('/api/news', async (req, res) => {
    res.json(db.data.news);
});

app.post('/api/news', authenticateAdmin, async (req, res) => {
    const newNews = { id: Date.now(), ...req.body };
    db.data.news.push(newNews);
    await db.write();
    res.json(newNews);
});

app.put('/api/news/:id', authenticateAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    const index = db.data.news.findIndex(item => item.id === id);
    if (index !== -1) {
        db.data.news[index] = { ...db.data.news[index], ...req.body };
        await db.write();
        res.json(db.data.news[index]);
    } else {
        res.status(404).json({ error: 'News item not found' });
    }
});

app.delete('/api/news/:id', authenticateAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    db.data.news = db.data.news.filter(item => item.id !== id);
    await db.write();
    res.json({ message: 'News item deleted' });
});

// Basic route
app.get('/', (req, res) => {
    res.send('Bells University Backend API is running!');
});

// Catch all handler: send back React's index.html file for client-side routing (only in production)
if (process.env.NODE_ENV === 'production') {
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend-vite/dist/index.html'));
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

