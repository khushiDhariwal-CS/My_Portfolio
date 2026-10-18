import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: "#F1EBE1",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#2B2823",
          fontWeight: 700,
          borderRadius: 8,
          border: "1px solid #E7DFD2",
          letterSpacing: "-0.5px",
        }}
      >
        KD
      </div>
    ),
    {
      ...size,
    }
  );
}
