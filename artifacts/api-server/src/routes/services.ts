import { Router } from "express";
import { pool } from "../lib/db";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

function slugify(text: string) {
  return text
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0600-\u06FF-]/g, "")
    .toLowerCase()
    .slice(0, 80) + "-" + Date.now();
}

// GET all services (public)
router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM services ORDER BY sort_order ASC, created_at ASC");
    const rows = result.rows.map((r) => ({
      id: r.id,
      title: r.title,
      shortDesc: r.short_desc,
      longDesc: r.long_desc,
      icon: r.icon,
      coverImage: r.cover_image,
      images: r.images || [],
    }));
    res.json(rows);
  } catch {
    res.status(500).json({ error: "خطأ في جلب الخدمات" });
  }
});

// GET single service (public)
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM services WHERE id=$1", [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "الخدمة غير موجودة" });
      return;
    }
    const r = result.rows[0];
    res.json({ id: r.id, title: r.title, shortDesc: r.short_desc, longDesc: r.long_desc, icon: r.icon, coverImage: r.cover_image, images: r.images || [] });
  } catch {
    res.status(500).json({ error: "خطأ في جلب الخدمة" });
  }
});

// POST create service (admin)
router.post("/", requireAuth, async (req, res) => {
  const { title, shortDesc, longDesc, icon, coverImage, images } = req.body;
  if (!title || !shortDesc || !longDesc || !coverImage) {
    res.status(400).json({ error: "جميع الحقول الأساسية مطلوبة" });
    return;
  }
  const id = slugify(title);
  try {
    const result = await pool.query(
      `INSERT INTO services (id, title, short_desc, long_desc, icon, cover_image, images)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [id, title, shortDesc, longDesc, icon || "Zap", coverImage, images || []]
    );
    const r = result.rows[0];
    res.status(201).json({ id: r.id, title: r.title, shortDesc: r.short_desc, longDesc: r.long_desc, icon: r.icon, coverImage: r.cover_image, images: r.images });
  } catch (err: any) {
    res.status(500).json({ error: "خطأ في إنشاء الخدمة: " + err.message });
  }
});

// PUT update service (admin)
router.put("/:id", requireAuth, async (req, res) => {
  const { title, shortDesc, longDesc, icon, coverImage, images } = req.body;
  try {
    const result = await pool.query(
      `UPDATE services SET title=$1, short_desc=$2, long_desc=$3, icon=$4, cover_image=$5, images=$6, updated_at=NOW()
       WHERE id=$7 RETURNING *`,
      [title, shortDesc, longDesc, icon || "Zap", coverImage, images || [], req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "الخدمة غير موجودة" });
      return;
    }
    const r = result.rows[0];
    res.json({ id: r.id, title: r.title, shortDesc: r.short_desc, longDesc: r.long_desc, icon: r.icon, coverImage: r.cover_image, images: r.images });
  } catch {
    res.status(500).json({ error: "خطأ في تحديث الخدمة" });
  }
});

// DELETE service (admin)
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM services WHERE id=$1 RETURNING id", [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "الخدمة غير موجودة" });
      return;
    }
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "خطأ في حذف الخدمة" });
  }
});

export default router;
