import { Message } from "node-nats-streaming";
import { Subjects, TicketCreatedEvent, Listener } from "@esorg/tickets-common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  onMessage = async (data: TicketCreatedEvent["data"], msg: Message) => {
    console.log(
      "Ticked has been created",
      msg.getSubject(),
      "data",
      data,
      "msg",
      msg.getSubject()
    );
    const { id, title, price } = data;

    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  };
}
