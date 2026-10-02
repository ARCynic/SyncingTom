const CONTACT_API_URL =
  "https://echo.polymathictrail.space/contact";

const REQUEST_TIMEOUT_MS =
  12_000;

async function readResponse(
  response,
) {
  const contentType =
    response.headers.get(
      "content-type",
    );

  if (
    contentType?.includes(
      "application/json",
    )
  ) {
    return response.json();
  }

  const text =
    await response.text();

  return text
    ? {
        message: text,
      }
    : {};
}

export async function sendContactMessage({
  name,
  email,
  subject,
  message,
}) {
  const controller =
    new AbortController();

  const timeoutId =
    window.setTimeout(
      () => {
        controller.abort();
      },
      REQUEST_TIMEOUT_MS,
    );

  try {
    const response =
      await fetch(
        CONTACT_API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({
              name,
              email,
              subject,
              message,
            }),

          signal:
            controller.signal,
        },
      );

    const payload =
      await readResponse(
        response,
      );

    if (!response.ok) {
      throw new Error(
        payload?.message ||
          `Message could not be sent (${response.status}).`,
      );
    }

    return payload;
 } catch (error) {
  if (
    error instanceof DOMException &&
    error.name ===
      "AbortError"
  ) {
    throw new Error(
      "The request took too long. Please try again.",
      {
        cause: error,
      },
    );
  }

  if (
    error instanceof TypeError
  ) {
    throw new Error(
      "The contact service could not be reached. Please try again later.",
      {
        cause: error,
      },
    );
  }

  throw error;
} finally {
    window.clearTimeout(
      timeoutId,
    );
  }
}