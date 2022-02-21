import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, currentUser } from "@esorg/tickets-common";
import { validateRequest } from "@esorg/tickets-common";

import { Ticket } from "../models/ticket";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticketData = {
      title,
      price,
      userId: req.currentUser!.id,
    };

    console.log('req body', title, price);

    console.log('TICKET DATA BEFORE BUILD', ticketData);

    const ticket = Ticket.build(ticketData);

    await ticket.save();

    console.log('TICKET DATA after BUILD', ticket);


    res.status(201).send(ticket);

    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });
  }
);

export { router as createTicketRouter };
