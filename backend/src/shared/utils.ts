import cloudinary from "cloudinary";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export async function uploadProfile(profile: any) {
  const b64 = Buffer.from(profile.buffer).toString("base64");
  const dataURI = "data:" + profile.mimetype + ";base64," + b64;
  const profileUrl = await cloudinary.v2.uploader.upload(dataURI);
  return profileUrl.url;
}
