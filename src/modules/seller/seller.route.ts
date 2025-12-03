import { Request, Response, Router } from "express";
import { pool } from "../../server";
export const sellerRoute = Router();
sellerRoute.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, address } = req.body;
    const newSeller = await pool.query(
      `INSERT INTO sellers (name,email,address) VALUES ($1,$2,$3) RETURNING *`,
      [name, email, address]
    );
    res.status(201).json({
      success: true,
      data: newSeller.rows,
      message: "new seller created",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
sellerRoute.get("/", async (req: Request, res: Response) => {
  try {
    const allSellers = await pool.query(`SELECT * FROM sellers`);
    res.status(200).json({
      success: true,
      data: allSellers.rows,
      message: "all sellers retrieved",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// get all sellers data
// sellerRoute.get("");
