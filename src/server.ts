import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import path from "path";
import { Pool } from "pg";
import { SellerRoute } from "./modules/seller/seller.route";
const app = express();
const port = 5000;
dotenv.config({ path: path.join(process.cwd(), ".env") });
app.use(express.json());
app.use(cors());
app.use("/", SellerRoute);
export const pool = new Pool({
  connectionString: `${process.env.DATABASE_URL}`,
});

// create database table:
const initDB = async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS sellers(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        address VARCHAR(200) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        
        
        )`);
  // ANOTHER table for product
  await pool.query(`CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    seller_id INT REFERENCES sellers(id) ON DELETE CASCADE,
    productName VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    inStock BOOLEAN DEFAULT true,
     created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )`);
};
initDB();
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
