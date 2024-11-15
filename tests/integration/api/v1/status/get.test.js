test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const reponseBody = await response.json();

  const parseUpdatedAt = new Date(reponseBody.updated_at).toISOString();
  expect(reponseBody.updated_at).toEqual(parseUpdatedAt);

  expect(reponseBody.dependencies.database.version).toEqual("16.0");
  expect(reponseBody.dependencies.database.max_connections).toEqual(100);
  expect(reponseBody.dependencies.database.opened_connections).toEqual(1);
});
