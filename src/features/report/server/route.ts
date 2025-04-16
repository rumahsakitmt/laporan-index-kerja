import { Hono } from "hono";

const app = new Hono().get("/", async (c) => {
  return c.json({
    message: "Report fetched successfully",
  });
});

export default app;
