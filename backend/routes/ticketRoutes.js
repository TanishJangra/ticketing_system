import express from "express";
import { getTickets, getTicketById, createTicket, updateTicket, getResolvedTickets, getUnresolvedTickets, getcontactsCenter } from "../controllers/ticketController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", createTicket);
router.get("/", protect, getTickets);
router.get("/resolved", protect, getResolvedTickets);
router.get("/unresolved", protect, getUnresolvedTickets);
router.get("/contactsCenter", protect, getcontactsCenter);
router.get("/:id", protect, getTicketById);
router.put("/:id/status", protect, updateTicket);
// router.put("/:id/assign", protect, assignTicket);

export default router;
