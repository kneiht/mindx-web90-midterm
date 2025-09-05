import { Router } from 'express';
// Nhắn thấy: chỗ này ts yêu cầu thêm type của router vào nếu không nó báo lỗi
import type { Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();

router.get('/users', (req, res) => {
  return res.json({
    message: 'get all users',
  });
});

export default router;
