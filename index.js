// process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

const AWS = require('aws-sdk');

const BUCKET = "vastra-staging-localdb";

AWS.config.update({
  // endpoint: "https://ap-south-1.console.aws.amazon.com",
  accessKeyId: "AKIAJFETEKI7CAR6KT3A",
  secretAccessKey: "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",
  region: 'ap-south-1',
  // apiVersion: 'latest'
});

const s3 = new AWS.S3();

exports.handler = function (event, context, callback) {
  let fileName = (new Date()).getTime() + ".zip";
  const organization_id = event.queryStringParameters.organization_id;
  const user_id = event.queryStringParameters.user_id;

  let params = {
    Bucket: BUCKET,
    Key: "mobile/" + org_id + "/" + user_id + "/" + fileName,
    Expires: 60 * 5
  };

  let url = s3.getSignedUrl('putObject', params);
  console.log("final url ***********************", url);
  callback(url);
};


