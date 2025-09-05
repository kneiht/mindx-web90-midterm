import { Router } from 'express';
// Nhắn thấy: chỗ này ts yêu cầu thêm type của router vào nếu không nó báo lỗi
import type { Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();

router.post('/auth/register', (req, res) => {
  return res.json({
    message: 'register',
  });
});

router.post('/auth/login', (req, res) => {
  return res.json({
    message: 'login',
  });
});

export default router;
