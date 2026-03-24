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

// GET all projects (public)
router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC");
    const rows = result.rows.map((r) => ({
      id: r.id,
      title: r.title,
      client: r.client,
      date: r.date,
      description: r.description,
      coverImage: r.cover_image,
      images: r.images || [],
    }));
    res.json(rows);
  } catch {
    res.status(500).json({ error: "خطأ في جلب المشاريع" });
  }
});

// GET single project (public)
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "المشروع غير موجود" });
      return;
    }
    const r = result.rows[0];
    res.json({
      id: r.id,
      title: r.title,
      client: r.client,
      date: r.date,
      description: r.description,
      coverImage: r.cover_image,
      images: r.images || [],
    });
  } catch {
    res.status(500).json({ error: "خطأ في جلب المشروع" });
  }
});

// POST create project (admin)
router.post("/", requireAuth, async (req, res) => {
  const { title, client, date, description, coverImage, images } = req.body;
  if (!title || !client || !date || !description || !coverImage) {
    res.status(400).json({ error: "جميع الحقول الأساسية مطلوبة" });
    return;
  }
  const id = slugify(title);
  try {
    const result = await pool.query(
      `INSERT INTO projects (id, title, client, date, description, cover_image, images)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [id, title, client, date, description, coverImage, images || []]
    );
    const r = result.rows[0];
    res.status(201).json({ id: r.id, title: r.title, client: r.client, date: r.date, description: r.description, coverImage: r.cover_image, images: r.images });
  } catch (err: any) {
    res.status(500).json({ error: "خطأ في إنشاء المشروع: " + err.message });
  }
});

// PUT update project (admin)
router.put("/:id", requireAuth, async (req, res) => {
  const { title, client, date, description, coverImage, images } = req.body;
  try {
    const result = await pool.query(
      `UPDATE projects SET title=$1, client=$2, date=$3, description=$4, cover_image=$5, images=$6, updated_at=NOW()
       WHERE id=$7 RETURNING *`,
      [title, client, date, description, coverImage, images || [], req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "المشروع غير موجود" });
      return;
    }
    const r = result.rows[0];
    res.json({ id: r.id, title: r.title, client: r.client, date: r.date, description: r.description, coverImage: r.cover_image, images: r.images });
  } catch {
    res.status(500).json({ error: "خطأ في تحديث المشروع" });
  }
});

// DELETE project (admin)
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM projects WHERE id=$1 RETURNING id", [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "المشروع غير موجود" });
      return;
    }
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "خطأ في حذف المشروع" });
  }
});

export default router;
