// Generated from: tests/features/0004-scan-api.feature
import { test } from "playwright-bdd";

test.describe('Scan API', () => {

  test('Start scan via API', { tag: ['@serial'] }, async ({ When, Then, And, request }) => { 
    await When('I POST to /scans with network "192.168.1.0/24" and core switch "192.168.1.1"', null, { request }); 
    await Then('I receive a scan ID'); 
    await And('the response status is "scanning"'); 
  });

  test('Get scan status', { tag: ['@serial'] }, async ({ Given, When, Then, request }) => { 
    await Given('a scan is running', null, { request }); 
    await When('I GET the scan by ID', null, { request }); 
    await Then('I see the scan status and discovered count'); 
  });

  test('Only one scan at a time', { tag: ['@serial'] }, async ({ Given, When, Then, request }) => { 
    await Given('a scan is running', null, { request }); 
    await When('I POST to /scans', null, { request }); 
    await Then('I receive a 409 Conflict error'); 
  });

  test('Cancel scan', { tag: ['@serial'] }, async ({ Given, When, Then, request }) => { 
    await Given('a scan is running', null, { request }); 
    await When('I DELETE the scan by ID', null, { request }); 
    await Then('the scan is cancelled'); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/0004-scan-api.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@serial"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I POST to /scans with network \"192.168.1.0/24\" and core switch \"192.168.1.1\"","stepMatchArguments":[{"group":{"start":30,"value":"\"192.168.1.0/24\"","children":[{"start":31,"value":"192.168.1.0/24","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":63,"value":"\"192.168.1.1\"","children":[{"start":64,"value":"192.168.1.1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I receive a scan ID","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And the response status is \"scanning\"","stepMatchArguments":[{"group":{"start":23,"value":"\"scanning\"","children":[{"start":24,"value":"scanning","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":12,"pickleLine":9,"tags":["@serial"],"steps":[{"pwStepLine":13,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Given a scan is running","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When I GET the scan by ID","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then I see the scan status and discovered count","stepMatchArguments":[]}]},
  {"pwTestLine":18,"pickleLine":14,"tags":["@serial"],"steps":[{"pwStepLine":19,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given a scan is running","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When I POST to /scans","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then I receive a 409 Conflict error","stepMatchArguments":[]}]},
  {"pwTestLine":24,"pickleLine":19,"tags":["@serial"],"steps":[{"pwStepLine":25,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"Given a scan is running","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"When I DELETE the scan by ID","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then the scan is cancelled","stepMatchArguments":[]}]},
]; // bdd-data-end