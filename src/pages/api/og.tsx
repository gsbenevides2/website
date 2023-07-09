import { NextRequest, ImageResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { origin, searchParams } = new URL(req.url);
  const text = searchParams.get("text");
  if (!text) {
    return new Response("Missing text query", {
      status: 400,
    });
  }
  if (text.length > 100) {
    return new Response("Text must be less than 100 characters", {
      status: 400,
    });
  }
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          background: "linear-gradient(270deg, #4c3e4a 26.56%, #575469 100%)",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          src={origin + "/images/oc.png"}
          style={{
            background: "white",
            borderRadius: "50%",
          }}
          width={150}
          height={150}
        />
        <div
          style={{
            width: 200,
            maxWidth: 200,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 40,
              textAlign: "center",
              color: "white",
            }}
          >
            {text}
          </span>
        </div>
      </div>
    ),
    {
      width: 500,
      height: 334,
    }
  );
}
