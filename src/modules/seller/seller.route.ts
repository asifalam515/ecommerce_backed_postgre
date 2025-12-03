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
// get all sellers data
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
// get single seller data by using id

sellerRoute.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const seller = await pool.query(`SELECT * FROM sellers WHERE id=$1 `, [id]);
    if (seller.rows.length === 0) {
      res.send("no seller found");
    }
    res.status(200).json({
      success: true,
      data: seller.rows[0],
      message: "all sellers retrieved",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// update seller data
sellerRoute.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, email, address } = req.body;
  try {
    const seller = await pool.query(
      `UPDATE sellers SET name=$1,email=$2,address=$3 WHERE id=$4 RETURNING *`,
      [name, email, address, id]
    );
    if (seller.rows.length === 0) {
      res.send("update wasn't successful");
    }
    res.status(200).json({
      success: true,
      data: seller.rows[0],
      message: "Updated seller Data",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// delete seller data
sellerRoute.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const deletedUser = await pool.query(
      `DELETE FROM sellers WHERE id=$1 RETURNING *`,
      [id]
    );
    if (deletedUser.rowCount === 0) {
      res.send("delete was not successful");
    }
    res.status(200).json({
      success: true,
      data: deletedUser.rows[0],
      message: "Deleted seller Data",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// sellerRoute.get("");
