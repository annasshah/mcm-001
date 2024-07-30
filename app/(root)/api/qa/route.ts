import { google } from "googleapis";
import path from "path";

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    // Set up the Google API client
    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve("./path/to/your-service-account-file.json"),
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });

    const client = await auth.getClient();
    const questionAndAnswer = google.questionAndAnswer({
      version: "v1",
      auth: client,
    });

    try {
      const response =
        await questionAndAnswer.projects.locations.questions.list({
          parent: "projects/YOUR_PROJECT_ID/locations/global",
        });

      res.status(200).json(response.data.questions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
