const request = require("supertest");
const app = require("../src/app.js");
const User = require("../src/models/User.js");

jest.mock("../src/models/User.js", () => ({ create: jest.fn() }));

describe("User routes", () => {
  describe("CREATE controller", () => {
    it("should create a user and return the username", async () => {
      // 9. Refactor fake userData variable to have compliant password
      const userData = {
        username: "testuser",
        password: "Testpassword!",
        email: "testuser@example.com",
      };
      const userMock = { ...userData, _id: "mockedId" };
      User.create.mockResolvedValue(userMock);

      const response = await request(app).post("/user").send(userData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ user: userMock.username });
      expect(User.create).toHaveBeenCalledWith(userData);
    });

    it("should return 500 if user creation fails", async () => {
      const error = new Error("User creation failed");
      User.create.mockRejectedValue(error);
      // 10. Add send method and compliant password field to second it block and run tests to demonstrate all working
      const response = await request(app)
        .post("/user")
        .send({ password: "Test!" });

      expect(response.status).toBe(500);
      expect(response.text).toContain("User creation failed");
    });

    // 4. Write new it block for testing if a password integrity error is thrown if a password doesn't contain uppercase and special characters. Show the test failing
    it("should return error message if password isn't strong", async () => {
      const response = await request(app)
        .post("/user")
        .send({ password: "test" });

      expect(response.status).toBe(500);
      expect(response.text).toContain(
        "Password must contain at least one uppercase character and one special character"
      );
    });
  });
});
