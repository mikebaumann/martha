/**
 * This file is named with a leading `_` to prevent Ava from processing this file and looking for tests within it
 * */

const _publicDataObjectUrlsWithGS = [
    'dos://dos-dss.ucsc-cgp-dev.org/00e6cfa9-a183-42f6-bb44-b70347106bbe',
    'drs://dos-dss.ucsc-cgp-dev.org/00e6cfa9-a183-42f6-bb44-b70347106bbe'
];

const _publicDataObjectUrlsWithoutGS = [
    'dos://qa.dcf.planx-pla.net/206dfaa6-bcf1-4bc9-b2d0-77179f0f48fc',
    'dos://nci-crdc-staging.datacommons.io/206dfaa6-bcf1-4bc9-b2d0-77179f0f48fc',
    'dos://dataguids.org/206dfaa6-bcf1-4bc9-b2d0-77179f0f48fc',
    'drs://qa.dcf.planx-pla.net/206dfaa6-bcf1-4bc9-b2d0-77179f0f48fc',
    'drs://nci-crdc-staging.datacommons.io/206dfaa6-bcf1-4bc9-b2d0-77179f0f48fc',
    'drs://dataguids.org/206dfaa6-bcf1-4bc9-b2d0-77179f0f48fc'
];

const _publicDataObjectUrls = _publicDataObjectUrlsWithoutGS.concat(_publicDataObjectUrlsWithGS);

const _mockedDataObjectUrlsWithGS = [
    'dos://wb-mock-drs-dev.storage.googleapis.com/0c8e7bc6-fd76-459d-947b-808b0605beb3',
    'dos://wb-mock-drs-dev.storage.googleapis.com/65e4cd14-f549-4a7f-ad0c-d29212ff6e46',
    'dos://wb-mock-drs-dev.storage.googleapis.com/drs.json',
    'dos://wb-mock-drs-dev.storage.googleapis.com/preview_dos.json',
    'drs://wb-mock-drs-dev.storage.googleapis.com/0c8e7bc6-fd76-459d-947b-808b0605beb3',
    'drs://wb-mock-drs-dev.storage.googleapis.com/65e4cd14-f549-4a7f-ad0c-d29212ff6e46',
    'drs://wb-mock-drs-dev.storage.googleapis.com/drs.json',
    'drs://wb-mock-drs-dev.storage.googleapis.com/preview_dos.json'
];

const _mockDataObjectUrlsWithoutGS = [
    'dos://wb-mock-drs-dev.storage.googleapis.com/noGSUrl.json',
    'drs://wb-mock-drs-dev.storage.googleapis.com/noGSUrl.json'
];

const _mockedDataObjectUrls = _mockedDataObjectUrlsWithGS.concat(_mockDataObjectUrlsWithoutGS);

function chooseBaseUrl(env) {
    let baseUrl = 'http://localhost:8010/broad-dsde-dev/us-central1';
    if (['dev', 'staging', 'alpha', 'perf', 'prod'].includes(env)) {
        baseUrl = `https://us-central1-broad-dsde-${env}.cloudfunctions.net/`;
    }
    return baseUrl;
}

function marthaLiveEnv(args) {
    const parsedArgs = require('minimist')(args);
    this.env = parsedArgs.e || parsedArgs.env || 'local';
    this.useMockDataObjects = parsedArgs.m || parsedArgs.mock || false;
    this.baseUrl = parsedArgs.base_url || chooseBaseUrl(this.env);
    this.dataObjectUrls = this.useMockDataObjects ? _mockedDataObjectUrls : _publicDataObjectUrls;
    this.dataObjectUrlsWithGS = this.useMockDataObjects ? _mockedDataObjectUrlsWithGS : _publicDataObjectUrlsWithGS;
    this.dataObjectUrlsWithoutGS = this.useMockDataObjects ? _mockDataObjectUrlsWithoutGS : _publicDataObjectUrlsWithoutGS;
}

exports.MarthaLiveEnv = marthaLiveEnv;