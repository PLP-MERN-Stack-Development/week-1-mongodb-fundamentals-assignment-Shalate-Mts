/*********************************
 * TASK 2: BASIC CRUD OPERATIONS *
 *********************************/

// === 1. FIND OPERATIONS ===

// 1.1 Find all books in "Prayer" genre
db.books.find({ genre: "Prayer" });

// 1.2 Find books published after 2015
db.books.find({ published_year: { $gt: 2015 } });

// 1.3 Find books by Sarah Jakes Roberts
db.books.find({ author: "Sarah Jakes Roberts" });

// 1.4 Find all in-stock books
db.books.find({ in_stock: true });

// === 2. UPDATE OPERATIONS ===

// 2.1 Update price of "The Blessed Life" to 18.50
db.books.updateOne(
  { title: "The Blessed Life" },
  { $set: { price: 18.50 } }
);

// 2.2 Mark "The Potter's House" as in stock
db.books.updateOne(
  { title: "The Potter's House" },
  { $set: { in_stock: true } }
);

// === 3. DELETE OPERATIONS ===

// 3.1 Delete "Jesus Calling" (out of stock)
db.books.deleteOne({ title: "Jesus Calling" });

// 3.2 Delete all books published before 2000
db.books.deleteMany({ published_year: { $lt: 2000 } });


/*******************************
 * TASK 3: ADVANCED QUERIES *
 *******************************/

// === 1. COMBINED FILTERS ===

// 1.1 Books both in stock AND published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
});

// === 2. PROJECTION ===

// 2.1 Show only title, author, and price for all books
db.books.find({}, {
  title: 1,
  author: 1,
  price: 1,
  _id: 0  // Exclude the default _id field
});

// === 3. SORTING ===

// 3.2 Sort by published year (descending - newest first)
db.books.find().sort({ published_year: -1 });

// === 4. PAGINATION ===

// 4.1 First page (books 1-5)
db.books.find().limit(5).skip(0);

// 4.2 Second page (books 6-10)
db.books.find().limit(5).skip(5);

// === 5. ADDITIONAL PRACTICAL QUERIES ===

// 5.1 Find the 3 most expensive books
db.books.find()
  .sort({ price: -1 })
  .limit(3);

// 5.2 Find books by T.D. Jakes, sorted by year (newest first)
db.books.find({ author: "T.D. Jakes" })
  .sort({ published_year: -1 });

/********************************
 * TASK 4: AGGREGATION PIPELINES *
 ********************************/

// === 1. AVERAGE PRICE BY GENRE ===
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
      count: { $sum: 1 }
    }
  },
  {
    $sort: { averagePrice: -1 } // Highest avg first
  }
]);

// === 2. AUTHOR WITH MOST BOOKS ===
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  {
    $sort: { bookCount: -1 }
  },
  {
    $limit: 1 // Top author only
  }
]);

// === 3. BOOKS BY PUBLICATION DECADE ===
db.books.aggregate([
  {
    $project: {
      decade: {
        $subtract: [
          "$published_year",
          { $mod: ["$published_year", 10] }
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 } // Oldest first
  }
]);

// === BONUS: IN-STOCK ANALYSIS ===
db.books.aggregate([
  {
    $group: {
      _id: "$in_stock",
      totalValue: { $sum: "$price" },
      count: { $sum: 1 }
    }
  }
]);

/*******************************
 * TASK 5: INDEXING *
 *******************************/

// === 1. CREATE INDEXES ===

// 1.1 Single-field index on 'title' (for fast title searches)
db.books.createIndex({ title: 1 });  // 1 = ascending order

// 1.2 Compound index on 'author' + 'published_year'
db.books.createIndex({ author: 1, published_year: -1 });  // -1 = descending

// === 2. DEMONSTRATE PERFORMANCE GAINS ===

// 2.1 Query without index (slow)
db.books.find({ author: "T.D. Jakes" }).explain("executionStats");

// 2.2 Same query after adding index (fast)
db.books.find({ author: "T.D. Jakes" }).explain("executionStats");

// === 3. TEXT INDEX FOR SEARCH ===

// 3.1 Create text index on title + genre
db.books.createIndex(
  { title: "text", genre: "text" },
  { name: "TextSearchIndex" }
);

// 3.2 Search for "prayer" in indexed fields
db.books.find({
  $text: { $search: "prayer" }
});

// === 4. LIST & MANAGE INDEXES ===

// 4.1 List all indexes
db.books.getIndexes();

// 4.2 Drop the text index
  db.books.dropIndex("TextSearchIndex");