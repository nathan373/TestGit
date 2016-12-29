"use strict";
const config = require('../appconfig.json');
const AWS = require('aws-sdk');
const options = ({
    accessKeyId: config['aws-accessKeyId'],
    secretAccessKey: config['aws-secretAccessKey']
});
const creds = new AWS.Credentials(options);
const firehose = new AWS.Firehose({
    region: config['aws-region'],
    credentials: creds
});
const dStreamName = 'da_firehose';
function createRecordParam(data) {
    const recordParams = {
        Record: {
            Data: JSON.stringify(data)
        },
        DeliveryStreamName: dStreamName
    };
    return recordParams;
}
function createBatchRecordParam(data) {
    let dataMapping = [];
    let dataLength = data.length;
    let index;
    for (index = 0; index < dataLength; index++) {
        let awsStat = { Data: JSON.stringify(data[index]) };
        dataMapping.push(awsStat);
    }
    const recordParams = {
        Records: dataMapping,
        DeliveryStreamName: dStreamName
    };
    return recordParams;
}
function putRecord(data) {
    let recordInput = createRecordParam(data);
    firehose.putRecord(recordInput, function (err, data1) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
    });
}
function putRecordBatch(data) {
    let recordInput = createBatchRecordParam(data.stats);
    firehose.putRecordBatch(recordInput, function (err, data1) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
    });
}
module.exports = {
    putRecord: putRecord,
    putRecordBatch: putRecordBatch
};
/**
 * Created by vdave on 12/8/2016.
 */
//# sourceMappingURL=awsPush.js.map