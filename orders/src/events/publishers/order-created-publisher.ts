import { OrderCreatedEvent, Publisher, Subjects } from "@esorg/tickets-common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
