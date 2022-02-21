import { Publisher, PaymentCreatedEvent, Subjects } from "@esorg/tickets-common"

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}