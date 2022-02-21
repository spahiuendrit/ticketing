import express from "express";
import { currentUser } from "@esorg/tickets-common";
import { requireAuth } from "@esorg/tickets-common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
