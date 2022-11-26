import { Router } from 'express';

const router = Router();

// Product routes
router.get('/product', () => {});
router.get('/product/:id', () => {});
router.put('/product/:id', () => {});
router.post('/product', () => {});
router.delete('/product/:id', () => {});

// Update routes
router.get('/update', () => {});
router.get('/update/:id', () => {});
router.put('/update/:id', () => {});
router.post('/update', () => {});
router.delete('/update/:id', () => {});

// Update Features routes
router.get('/updatefeatures', () => {});
router.get('/updatefeatures/:id', () => {});
router.put('/updatefeatures/:id', () => {});
router.post('/updatefeatures', () => {});
router.delete('/updatefeatures/:id', () => {});

export default router;
