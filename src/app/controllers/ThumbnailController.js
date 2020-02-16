import screenshot from '../screenshot';

class ThumbnailController {
  async store(req, res) {
    const { data } = req.body;
    const html = await screenshot.renderTamplate(data);
    const print = await screenshot.doPrintScreen(html);
    
    res.json({
      result: 'ok'
    });
  }
}

export default new ThumbnailController();
