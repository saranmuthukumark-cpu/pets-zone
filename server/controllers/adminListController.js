import multer from "multer";
import path from "path";
import PetsModel from "../models/pets.model.js";
import LivestockModel from "../models/livestocks.model.js";
import PharmacyModel from "../models/pharmacy.model.js";
import SuppliesModel from "../models/supplies.model.js";
import VeterinaryModel from "../models/veterinary.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});
export const upload = multer({ storage: multerStorage, limits: { fileSize: 5 * 1024 * 1024 } });

function getModel(category) {
  const map = {
    pets: PetsModel,
    livestocks: LivestockModel,
    pharmacy: PharmacyModel,
    supplies: SuppliesModel,
    veterinary: VeterinaryModel,
  };
  return map[category] || null;
}


function parseDotNotation(flat) {
  const result = {};
  for (const key of Object.keys(flat)) {
    const parts = key.split(".");
    let obj = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!obj[parts[i]] || typeof obj[parts[i]] !== "object") {
        obj[parts[i]] = {};
      }
      obj = obj[parts[i]];
    }
    obj[parts[parts.length - 1]] = flat[key];
  }
  return result;
}

// create
export const createListing = async (req, res) => {
  const Model = getModel(req.params.category);
  if (!Model) return res.status(400).json({ error: "Invalid category" });
  try {
    const data = parseDotNotation({ ...req.body });
    if (req.file) data.image = "/uploads/" + req.file.filename;

    const token = req.headers.cookie?.split("token=")[1]?.split(";")[0];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (user && user.role !== "admin") {
          data.submittedBy = user.name;
        }
      } catch (_) {
      }
    }
    const newItem = new Model(data);
    await newItem.save();
    res.status(201).json({ message: "Created successfully!", item: newItem });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ error: error.message });
  }
};

// put
export const updateListing = async (req, res) => {
  const Model = getModel(req.params.category);
  if (!Model) return res.status(400).json({ error: "Invalid category" });

  try {
    const updateData = { ...req.body };
    if (req.file) updateData.image = "/uploads/" + req.file.filename;

    const updated = await Model.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Updated successfully", updatedData: updated });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
};

// delete
export const deleteListing = async (req, res) => {
  const Model = getModel(req.params.category);
  if (!Model) return res.status(400).json({ error: "Invalid category" });

  try {
    const deleted = await Model.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "eleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
};
