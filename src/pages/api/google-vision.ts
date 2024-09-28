// File: src/pages/api/google-vision.ts

import { NextApiRequest, NextApiResponse } from "next";
import vision from "@google-cloud/vision";

// TODO: Replace this with your actual Google Cloud credentials
const client = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: "YOUR_CLIENT_EMAIL",
    private_key: "YOUR_PRIVATE_KEY",
  },
  projectId: "YOUR_PROJECT_ID",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Image data is required" });
    }

    // Remove the "data:image/jpeg;base64," part if present
    const base64Image = image.replace(/^data:image\/\w+;base64,/, "");

    // Perform text detection on the image
    const [result] = await client.textDetection({
      image: {
        content: base64Image,
      },
    });

    const detections = result.textAnnotations;
    const text = detections ? detections[0].description : "";

    res.status(200).json({ text });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Error processing image" });
  }
}
