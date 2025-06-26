import getXataClient from '../../lib/xata';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { blogId } = req.query;

  if (!blogId) {
    return res.status(400).json({ error: 'Missing blogId' });
  }

  try {
    const xata = getXataClient();

    // Update "your_table_name" with actual table
    const records = await xata.db.list
      .filter({ blogId })  // filters where blogId === req.query.blogId
      .getAll();

    res.status(200).json({ success: true, records });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
}
