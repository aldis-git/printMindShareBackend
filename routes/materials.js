const express = require("express");
const {
  createMaterial,
  getMaterials,
  getMaterial,
  updateMaterial,
  deleteMaterial,
} = require("../controllers/materials.js");

// Include other resource routers
const materialItemRouter = require("./materialItems");

const router = express.Router();

// Import route protector
const { protect, authorize } = require("../middleware/authentication.js");

// Re-route into other resource routers
router.use("/:materialId/item", materialItemRouter);

router
  .route("/")
  .get(getMaterials)
  .post(protect, authorize("admin", "owner"), createMaterial);

router
  .route("/:id")
  .get(getMaterial)
  .put(protect, authorize("admin", "owner"), updateMaterial)
  .delete(protect, authorize("owner"), deleteMaterial);

module.exports = router;
