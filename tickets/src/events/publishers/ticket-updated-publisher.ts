import { Publisher, Subjects, TicketUpdatedEvent } from "@esorg/tickets-common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
