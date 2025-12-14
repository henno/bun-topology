// Generated from: tests/features/0008-routing-table.feature
import { test } from "playwright-bdd";

test.describe('Network Selection from Routing Table', () => {

  test('Auto-detect networks from routing table', { tag: ['@serial'] }, async ({ Given, Then, And, page }) => { 
    await Given('I am on the scan page', null, { page }); 
    await Then('I see a list of detected IPv4 networks with checkboxes', null, { page }); 
    await And('each network shows its CIDR notation', null, { page }); 
    await And('the core switch IP is pre-filled as the first usable IP in the range', null, { page }); 
  });

  test('Select network from list', { tag: ['@serial'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the scan page', null, { page }); 
    await And('I see detected networks', null, { page }); 
    await When('I select a network from the list', null, { page }); 
    await Then('the network field is populated with the selected CIDR', null, { page }); 
    await And('the core switch field is populated with the first usable IP', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/0008-routing-table.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@serial"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given I am on the scan page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I see a list of detected IPv4 networks with checkboxes","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And each network shows its CIDR notation","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"And the core switch IP is pre-filled as the first usable IP in the range","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":10,"tags":["@serial"],"steps":[{"pwStepLine":14,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given I am on the scan page","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"And I see detected networks","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When I select a network from the list","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then the network field is populated with the selected CIDR","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And the core switch field is populated with the first usable IP","stepMatchArguments":[]}]},
]; // bdd-data-end