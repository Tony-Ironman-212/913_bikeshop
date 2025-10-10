const express = require('express');
const router = express.Router();
const ContactFromClient = require('../models/ContactFromClient');

// GET api/contact-client lấy toàn bộ contact từ client
router.get('/', async (req, res) => {
  try {
    const contacts = await ContactFromClient.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
});

// POST api/contact-client tạo mới contact từ client
router.post('/', async (req, res) => {
  try {
    const contact = new ContactFromClient(req.body);
    const newContact = await contact.save();
    res.status(201).json({ message: '問い合わせが正常に送信されました' });
  } catch (err) {
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
});

// GET api/contact-client/:id lấy chi tiết contact từ client, cho admin xem
router.get('/:id', async (req, res) => {
  try {
    const contact = await ContactFromClient.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: '問い合わせが見つかりません' });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
});

module.exports = router;
