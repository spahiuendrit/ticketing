import request from "supertest";
import { app } from "../../app";

it("fails if email that does not exist is supplied", async () => {
  await request(app).post("/api/users/singin").send({
    email: "test@test.com",
    password: "password",
  }).expect(404)
});

it('fails when an incorrect password is supplied', async () => {
    await request(app).post('/api/users/signup').send({
        email: 'endritspahiu@msn.com',
        password: 'kompjuteri'
    }).expect(201)

    await request(app).post('/api/users/signin').send({
        email: 'endritspahiu@msn.com',
        password: 'kompjuter'
    }).expect(400)
})

it('responds with a cookie when given valid credentials', async () => {
    await request(app).post('/api/users/signup').send({
        email: 'endritspahiu0@msn.com',
        password: 'kompjuteri'
    }).expect(201)

    const response = await request(app).post('/api/users/signin').send({
        email: 'endritspahiu0@msn.com',
        password: 'kompjuteri'
    }).expect(200)

    expect(response.get('Set-Cookie')).toBeDefined();
})