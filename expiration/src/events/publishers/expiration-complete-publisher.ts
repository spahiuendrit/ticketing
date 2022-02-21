import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from "@esorg/tickets-common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
