import {
  NotFoundError,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
  Listener,
} from "@esorg/tickets-common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  onMessage = async (data: OrderCreatedEvent["data"], message: Message) => {
    if (message.getSubject() == Subjects.OrderCreated) {
      console.log(message.getSubject());
      // find the ticket that the order is reserving

      const ticket = await Ticket.findById(data.ticket.id);

      // if no ticket throw error

      if (!ticket) {
        throw new Error("Ticket not found");
      }

      // mark the ticket as being reserved by setting its orderId property

      ticket.set({ orderId: data.id });

      // save the ticket

      await ticket.save();

      await new TicketUpdatedPublisher(this.client).publish({
        id: ticket.id,
        version: ticket.version,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        orderId: ticket.orderId,
      });

      // ack the message

      message.ack();
    }
  };
}
