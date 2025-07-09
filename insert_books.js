// insert_books.js - Script to populate MongoDB with sample book data

// Import MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI (replace with your MongoDB connection string if using Atlas)
const uri = 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// My  book data
const books = [
  {
    title: 'Woman, Thou Art Loosed!',
    author: 'T.D. Jakes',
    genre: 'Christian Living',
    published_year: 1993,
    price: 13.99,
    in_stock: true,
    pages: 240,
    publisher: 'Bethany House'
  },
  {
    title: 'Destiny: Step Into Your Purpose',
    author: 'T.D. Jakes',
    genre: 'Spiritual Growth',
    published_year: 2015,
    price: 16.99,
    in_stock: true,
    pages: 288,
    publisher: 'FaithWords'
  },
  {
    title: 'The Seven Laws of Influence',
    author: 'Rorisang Thandekiso',
    genre: 'Faith & Leadership',
    published_year: 2022,
    price: 14.99,
    in_stock: true,
    pages: 210,
    publisher: 'Purpose Pioneers'
  },
  {
    title: 'He-Motions: Even Strong Men Struggle',
    author: 'T.D. Jakes',
    genre: 'Men’s Ministry',
    published_year: 2004,
    price: 12.50,
    in_stock: false,
    pages: 272,
    publisher: 'Putnam Adult'
  },
  {
    title: 'Unmerited Favor',
    author: 'Joseph Prince',
    genre: 'Grace Teaching',
    published_year: 2010,
    price: 15.00,
    in_stock: true,
    pages: 304,
    publisher: 'Charisma House'
  },
  {
    title: 'The Purpose Driven Life',
    author: 'Rick Warren',
    genre: 'Spiritual Growth',
    published_year: 2002,
    price: 10.99,
    in_stock: true,
    pages: 336,
    publisher: 'Zondervan'
  },
  {
    title: 'Live Full Die Empty',
    author: 'Les Brown',
    genre: 'Motivational Christian',
    published_year: 1996,
    price: 13.49,
    in_stock: true,
    pages: 192,
    publisher: 'Les Brown Enterprises'
  },
  {
    title: 'Crazy Faith',
    author: 'Michael Todd',
    genre: 'Faith & Miracles',
    published_year: 2021,
    price: 17.99,
    in_stock: true,
    pages: 208,
    publisher: 'WaterBrook'
  },
  {
    title: 'The Power of a Praying Woman',
    author: 'Stormie Omartian',
    genre: 'Prayer',
    published_year: 2002,
    price: 9.99,
    in_stock: true,
    pages: 256,
    publisher: 'Harvest House Publishers'
  },
  {
    title: 'Battlefield of the Mind',
    author: 'Joyce Meyer',
    genre: 'Christian Living',
    published_year: 1995,
    price: 11.99,
    in_stock: false,
    pages: 288,
    publisher: 'Hachette Book Group'
  }
];

// Function to insert books into MongoDB
async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Get database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if collection already has documents
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(`Collection already contains ${count} documents. Dropping collection...`);
      await collection.drop();
      console.log('Collection dropped successfully');
    }

    // Insert the books
    const result = await collection.insertMany(books);
    console.log(`${result.insertedCount} books were successfully inserted into the database`);

    // Display the inserted books
    console.log('\nInserted books:');
    const insertedBooks = await collection.find({}).toArray();
    insertedBooks.forEach((book, index) => {
      console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.published_year})`);
    });

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the function
insertBooks().catch(console.error);

/*
 * Example MongoDB queries you can try after running this script:
 *
 * 1. Find all books:
 *    db.books.find()
 *
 * 2. Find books by a specific author:
 *    db.books.find({ author: "George Orwell" })
 *
 * 3. Find books published after 1950:
 *    db.books.find({ published_year: { $gt: 1950 } })
 *
 * 4. Find books in a specific genre:
 *    db.books.find({ genre: "Fiction" })
 *
 * 5. Find in-stock books:
 *    db.books.find({ in_stock: true })
 */ 