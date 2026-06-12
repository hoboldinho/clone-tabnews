import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const reponseBody = await response.json();

      const parseUpdatedAt = new Date(reponseBody.updated_at).toISOString();
      expect(reponseBody.updated_at).toEqual(parseUpdatedAt);

      expect(reponseBody.dependencies.database.version).toEqual("16.0");
      expect(reponseBody.dependencies.database.max_connections).toEqual(100);
      expect(reponseBody.dependencies.database.opened_connections).toEqual(1);
    });
  });
});
