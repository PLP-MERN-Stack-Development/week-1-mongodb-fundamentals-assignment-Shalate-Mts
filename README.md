# 📚 PLP Bookstore - MongoDB Assignment

A complete implementation of MongoDB operations for a Christian books database, covering CRUD, aggregation pipelines, and indexing optimization.

## 🛠️ Setup Instructions

### Prerequisites
- MongoDB (Local or Atlas)
- MongoDB Compass (Recommended) or `mongosh`

### Installation
1. **Start MongoDB**:
   ```bash
   # For local installations
   mongod
   ```

2. **Import Data**:
   ```bash
   mongosh plp_bookstore < insert_books.js
   ```

## 📂 File Structure
- `insert_books.js` - Contains 10 Christian books by authors like T.D. Jakes and Sarah Jakes Roberts
- 'queries.js' - All required queries for:
  - Task 2: CRUD operations
  - Task 3: Advanced queries
  - Task 4: Aggregation pipelines
  - Task 5: Indexing

## 🎯 Key Features
1. **Christian Books Dataset**:
   - Genres: Prayer, Christian Living, Leadership
   - Authors: T.D. Jakes, Sarah Jakes Roberts, etc.

2. **Optimized Performance**:
   - Indexes on `title`, `author_published_year` compound
   - Text search on title/genre

3. **Analytics**:
   ''javascript
   // Example: Average price by genre
   db.books.aggregate([
     { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
   ]);''
   

## 📊 Sample Outputs
![Collection View](screenshots/screenshot_database.png)  
*Books collection in MongoDB Compass*

![Aggregation Results](screenshots/screenshot_aggregation_stage1.png)  
*Average price by genre analysis*

![Indexes Results](screenshots/screenshot_indexes.png)  
*Index from collection*

![Queries Results](screenshots/screenshot_mongosh_queries.png)  
*A screenshot of a query ran*

## 👨‍💻 How to Run
1. Execute queries individually in:
   - **MongoDB Compass** (MONGOSH tab)
   - **Terminal**:
     ''bash
     mongosh plp_bookstore
     > load("queries.js")
     ''

2. Verify indexes:
   ''javascript
   db.books.getIndexes();
   ''

## 📜 License
This project is part of the PLP Week 1 - MongoDB assignment (Educational Use)