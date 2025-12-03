import { Request, Response, Router } from "express";
export const SellerRoute = Router();
SellerRoute.post("/sellers", async (req: Request, res: Response) => {
  try {
    const seller = req.body;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
