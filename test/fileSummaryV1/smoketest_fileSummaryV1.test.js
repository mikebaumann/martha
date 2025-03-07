/** Run smoketests from the command line.  For example:
 *
 *    BASE_URL="https://us-central1-broad-dsde-dev.cloudfunctions.net" npm run-script smoketest_fileSummaryV1
 *
 * Run smoketests after a deployment to confirm that the functions deployed successfully
 */

const test = require('ava');
const supertest = require('supertest')(process.env.BASE_URL);

// NOTE: We can only test failure cases of fileSummaryV1Handler.
// Because these smoketests are executed by a Google Service Account, we are unable to test fileSummaryV1Handler (with Authz)
// without first authenticating that service account with Fence.

test.cb('smoketest_fileSummaryV1 responds with 400 if a uri is not provided', (t) => {
    supertest
        .post('/fileSummaryV1')
        .set('Content-Type', 'application/json')
        .send({ notValid: 'dos://broad-dsp-dos.storage.googleapis.com/dos.json' })
        .expect(400)
        .expect((response) => t.true(response.text.includes('must specify the URI')))
        .end(t.end);
});

test.cb('smoketest_fileSummaryV1 responds with 400 if uri passed is malformed', (t) => {
    supertest
        .post('/fileSummaryV1')
        .set('Content-Type', 'application/json')
        .send({ uri: 'somethingNotValidURL' })
        .expect(400)
        .expect((response) => t.true(response.text.includes('must specify the URI')))
        .end(t.end);
});

test.cb('smoketest_fileSummaryV1 responds with 400 if uri is valid but not authorization is provided', (t) => {
    supertest
        .post('/fileSummaryV1')
        .set('Content-Type', 'application/json')
        .send({ uri: 'dos://broad-dsp-dos.storage.googleapis.com/dos.json' })
        .expect(401)
        .expect((response) => t.true(response.text.includes('must contain a bearer token')))
        .end(t.end);
});