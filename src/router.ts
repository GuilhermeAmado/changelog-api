import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from './modules/middleware';

const router = Router();

// Product routes
router.get('/product', (req, res) => {
  res.json({
    message: 'hello',
  });
});

router.get('/product/:id', () => {});

router.put(
  '/product/:id',
  [body('name').isString(), handleInputErrors],
  () => {}
);

router.post('/product', [body('name').isString(), handleInputErrors], () => {});

router.delete('/product/:id', () => {});

// Update routes
router.get('/update', () => {});

router.get('/update/:id', () => {});

router.put(
  '/update/:id',
  [
    body('title').optional().isString(),
    body('body').optional().isString(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    body('version').optional(),
    handleInputErrors,
  ],
  () => {}
);

router.post(
  '/update',
  [
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    body('version').exists().isString(),
    handleInputErrors,
  ],
  () => {}
);

router.delete('/update/:id', () => {});

// Update Features routes
router.get('/updatefeatures', () => {});

router.get('/updatefeatures/:id', () => {});

router.put(
  '/updatefeatures/:id',
  [
    body('name').optional().isString(),
    body('description').optional().isString(),
    handleInputErrors,
  ],
  () => {}
);

router.post(
  '/updatefeatures',
  [
    body('name').exists().isString(),
    body('description').exists().isString(),
    body('updateId').exists().isString(),
    handleInputErrors,
  ],
  () => {}
);

router.delete('/updatefeatures/:id', () => {});

export default router;
