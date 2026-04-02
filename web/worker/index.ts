import { Hono } from "hono";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Define the environment types for Hono
type Bindings = {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
};

type Variables = {
  supabase: SupabaseClient;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>().basePath("/api");

// Middleware to initialize Supabase client and attach it to the context
app.use("*", async (c, next) => {
  const supabase = createClient(
    c.env.SUPABASE_URL,
    c.env.SUPABASE_ANON_KEY
  );
  c.set("supabase", supabase);
  await next();
});

// Logger middleware for debugging (optional but helpful)
app.use("*", async (c, next) => {
  console.log(`[Hono] Request: ${c.req.method} ${c.req.url}`);
  await next();
});

// Root API route (maps to /api because of basePath)
app.get("/", (c) => {
  return c.json({
    name: "Prosper API",
    framework: "Hono",
    status: "Running",
    timestamp: new Date().toISOString(),
  });
});

// Example sub-route to test Supabase (maps to /api/todos)
app.get("/todos", async (c) => {
  const supabase = c.get("supabase");
  const { data: todos, error } = await supabase.from("todos").select();

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  return c.json({ todos });
});

// Example sub-route (maps to /api/health)
app.get("/health", (c) => {
  return c.json({ status: "OK" });
});

export default app;
