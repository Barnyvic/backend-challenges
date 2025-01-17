import express, { Request, Response, Router } from "express";
import { randomBytes } from "crypto";

const app = express();
app.use(express.json());

const router = Router();

const shortToLongMap: Record<string, string> = {};
const longToShortMap: Record<string, string> = {};

const isValidUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};



router.post("/shorten", (req: Request, res: Response) => {
  const { longUrl } = req.body;
  if (!longUrl || typeof longUrl !== "string") {
   return res.status(400).json({ error: "Invalid or missing longUrl" });
  }

  if (!isValidUrl(longUrl)) {
   return res.status(400).json({
     error: "Invalid URL format. URL must start with http:// or https://",
   });
  }

  if (longToShortMap[longUrl]) {
  return res.json({
    message: "URL already shortened!",
    shortId: longToShortMap[longUrl],
    longUrl,
  });
  }
  const shortId = randomBytes(4).toString("hex");
  shortToLongMap[shortId] = longUrl;
  longToShortMap[longUrl] = shortId;
  return res.json({ shortId, longUrl });
});


router.get("/:shortId", (req: Request, res: Response) => {
  const { shortId } = req.params;
  const longUrl = shortToLongMap[shortId];
  if (!longUrl) {
   return res.status(404).json({ error: "Short ID not found" });
  }
  return res.redirect(longUrl);
});

app.use("/", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`URL shortener listening on port ${PORT}`);
});
