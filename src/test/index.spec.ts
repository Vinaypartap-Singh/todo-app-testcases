import request from "supertest";
import app from "../..";

describe("Server Run Test", () => {
  it("should check if server is running", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Up & Running");
  });
});
