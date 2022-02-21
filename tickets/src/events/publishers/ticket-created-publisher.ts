import { Publisher, Subjects, TicketCreatedEvent } from "@esorg/tickets-common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
