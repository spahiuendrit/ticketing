import { Listener, OrderCancelledEvent, Subjects } from "@esorg/tickets-common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { queueGroupName } from "./queue-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  onMessage = async (data: OrderCancelledEvent["data"], message: Message) => {
    if (message.getSubject() === Subjects.OrderCancelled) {
      const ticket = await Ticket.findById(data.ticket.id);

      if (!ticket) {
        throw new Error("Ticket not found");
      }

      ticket.set({ orderId: undefined });

      await ticket.save();

      new TicketUpdatedPublisher(this.client).publish({
        id: ticket.id,
        version: ticket.version,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        orderId: ticket.orderId,
      });

      message.ack();
    }
  };
}
