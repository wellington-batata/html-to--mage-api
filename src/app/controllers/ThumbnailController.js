import screenshot from '../screenshot';
import S3 from '../s3';

class ThumbnailController {
  async store(req, res) {
    const { data } = req.body;
    const html = await screenshot.renderTamplate(data);
    const print = await screenshot.doPrintScreen(html);
    console.log(print);
    const response = await S3.upload('teste.png', print);
    console.log(response);

    res.json({
      result: 'ok'
    });
  }
}

export default new ThumbnailController();
