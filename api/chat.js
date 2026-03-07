export const runtime = "nodejs";

import mock from "../src/mock.js";

export async function GET() {
  return Response.json({
    message: "Mock import works",
    data: mock
  });
}