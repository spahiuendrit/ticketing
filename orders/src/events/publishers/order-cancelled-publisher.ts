import {
  OrderCancelledEvent,
  Publisher,
  Subjects,
} from "@esorg/tickets-common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
