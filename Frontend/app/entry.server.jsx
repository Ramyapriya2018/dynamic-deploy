import { PassThrough } from "stream";
import { RemixServer } from "@remix-run/react";
import { renderToPipeableStream } from "react-dom/server";

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
) {
  const body = new PassThrough();

  const { pipe } = renderToPipeableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      onShellReady() {
        responseHeaders.set("Content-Type", "text/html");
        pipe(body);
      },
    },
  );

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
