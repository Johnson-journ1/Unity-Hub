async function setupDb() {
    const { Low } = await import('lowdb');
    const { JSONFile } = await import('lowdb/node');

    const adapter = new JSONFile('db.json');
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
        admins: [{ username: "admin", passcode: "1111" }]
    };
    const db = new Low(adapter, defaultData);

    await db.read();
    db.data = db.data || defaultData;
    await db.write();

    return db;
}

module.exports = setupDb;