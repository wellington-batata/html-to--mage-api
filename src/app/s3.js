import AWS from 'aws-sdk';
import "babel-dotenv";
import fs from 'fs';
import {Duplex} from 'stream';  

class Storage {
    constructor(){
        AWS.config.setPromisesDependency();
        AWS.config.update({
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: 'us-east-2'})
    }

    async list(){
        const s3 = new AWS.S3();
        const params = {
          bucket: process.env.AWS_BUCKET_KEY
        };
        const response = await s3.listObjectsV2(params);
        console.log(response);
    };  

    async upload(key, buffer){
        
        const s3 = new AWS.S3();

        var bodystream = bufferToStream(buffer);

        s3.createBucket(function () {
            var params = {
             Bucket: process.env.AWS_BUCKET_KEY,
             Key: `2020/20/02/${key}`,
             Body: bodystream,
            };
            s3.upload(params, function (err, data) {
             if (err) {
              console.log('xiii');
              console.log(err);
             }
             console.log('foi');
             console.log(data);
            });
          });
    }

}

function bufferToStream(buffer) {  
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

export default new Storage();