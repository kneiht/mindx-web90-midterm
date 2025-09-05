import { Router } from 'express';
// Nhắn thấy: chỗ này ts yêu cầu thêm type của router vào nếu không nó báo lỗi
import type { Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();

router.post('/users/register', (req, res) => {
  return res.json({
    message: 'register',
  });
});

router.post('/users/login', (req, res) => {
  return res.json({
    message: 'login',
  });
});

router.get('/posts', (req, res) => {
  return res.json({
    message: 'get posts',
  });
});

router.post('/posts', (req, res) => {
  return res.json({
    message: 'create posts',
  });
});

router.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  return res.json({
    message: `get post with id: ${id}`,
  });
});

export default router;
