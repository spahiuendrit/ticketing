import { app } from "../../app";
import { Ticket } from "../ticket";
import request from "supertest";

it("implements optimistic concurrency control", async () => {
  const ticket = await Ticket.build({
    title: "concert",
    price: 500,
    userId: "4324324",
  });

  await ticket.save();

  const firstFetch = await Ticket.findById(ticket.id);

  const secondFetch = await Ticket.findById(ticket.id);

  firstFetch!.set({ price: 10 });

  await firstFetch!.save();
  try {
    secondFetch!.set({ price: 20 });
    await secondFetch!.save();
  } catch (err) {
    return;
  }
});

it("increment the version number on multiple saves", async () => {
  const ticket = await Ticket.build({
    title: "concert",
    price: 500,
    userId: "4324324",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save()
  expect(ticket.version).toEqual(2);


});
