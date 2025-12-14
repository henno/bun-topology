// Generated from: tests/features/mock-scanner.feature
import { test } from "playwright-bdd";

test.describe('Mock Scanner', () => {

  test('Mock mode indicator', async ({ Given, When, Then, page }) => { 
    await Given('the server is running in mock mode'); 
    await When('I open the application', null, { page }); 
    await Then('I see a "Mock Mode" indicator', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/mock-scanner.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given the server is running in mock mode","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I open the application","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I see a \"Mock Mode\" indicator","stepMatchArguments":[{"group":{"start":8,"value":"\"Mock Mode\"","children":[{"start":9,"value":"Mock Mode","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end