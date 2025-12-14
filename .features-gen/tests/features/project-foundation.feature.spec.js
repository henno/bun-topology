// Generated from: tests/features/project-foundation.feature
import { test } from "playwright-bdd";

test.describe('Project Foundation', () => {

  test('Web UI loads', async ({ Given, Then, And, page }) => { 
    await Given('I open the application', null, { page }); 
    await Then('I see the page title "NetMap"', null, { page }); 
    await And('I see a sidebar with navigation', null, { page }); 
    await And('I see "Scan" and "Devices" links', null, { page }); 
  });

  test('Navigation works', async ({ Given, When, Then, page }) => { 
    await Given('I am on the home page', null, { page }); 
    await When('I click "Scan" in the navigation', null, { page }); 
    await Then('I am on the scan page', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/project-foundation.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I open the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Outcome","textWithKeyword":"Then I see the page title \"NetMap\"","stepMatchArguments":[{"group":{"start":21,"value":"\"NetMap\"","children":[{"start":22,"value":"NetMap","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"And I see a sidebar with navigation","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And I see \"Scan\" and \"Devices\" links","stepMatchArguments":[{"group":{"start":6,"value":"\"Scan\"","children":[{"start":7,"value":"Scan","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":17,"value":"\"Devices\"","children":[{"start":18,"value":"Devices","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":13,"pickleLine":9,"tags":[],"steps":[{"pwStepLine":14,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Given I am on the home page","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When I click \"Scan\" in the navigation","stepMatchArguments":[{"group":{"start":8,"value":"\"Scan\"","children":[{"start":9,"value":"Scan","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then I am on the scan page","stepMatchArguments":[]}]},
]; // bdd-data-end