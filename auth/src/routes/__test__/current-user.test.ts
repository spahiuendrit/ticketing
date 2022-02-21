import request from "supertest";
import { app } from "../../app";
import { signInHelper } from "../../helpers/signin-helper";


it("responds with details about the current user", async () => {
  const cookie = await signInHelper();

  const currentUserResponse = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(currentUserResponse.body.currentUser.email).toEqual("test@test.com");
});
