// Generated from: tests/features/0005-live-updates.feature
import { test } from "playwright-bdd";

test.describe('Live Scan Updates', () => {

  test('Devices appear in real-time during scan', { tag: ['@serial'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the scan page', null, { page }); 
    await When('I start a scan', null, { page }); 
    await Then('devices appear one by one as they are discovered', null, { page }); 
    await And('I see the scan status change to "Complete" when finished', null, { page }); 
    await And('the final device count matches the number discovered', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/0005-live-updates.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@serial"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given I am on the scan page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When I start a scan","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then devices appear one by one as they are discovered","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"And I see the scan status change to \"Complete\" when finished","stepMatchArguments":[{"group":{"start":32,"value":"\"Complete\"","children":[{"start":33,"value":"Complete","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"And the final device count matches the number discovered","stepMatchArguments":[]}]},
]; // bdd-data-end