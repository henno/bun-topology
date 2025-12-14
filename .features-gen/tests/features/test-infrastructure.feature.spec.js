// Generated from: tests/features/test-infrastructure.feature
import { test } from "playwright-bdd";

test.describe('Test Infrastructure', () => {

  test('Test runner works', { tag: ['@manual'] }, async ({ When, Then, And }) => { 
    await When('I run "bun test"'); 
    await Then('Playwright executes feature files from tests/features/'); 
    await And('step definitions from tests/steps/ are used'); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/test-infrastructure.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@manual"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I run \"bun test\"","stepMatchArguments":[{"group":{"start":6,"value":"\"bun test\"","children":[{"start":7,"value":"bun test","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then Playwright executes feature files from tests/features/","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And step definitions from tests/steps/ are used","stepMatchArguments":[]}]},
]; // bdd-data-end