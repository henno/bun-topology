// Generated from: tests/features/0009-real-scanner.feature
import { test } from "playwright-bdd";

test.describe('Real Network Scanner', () => {

  test('Real scanner implementation exists', { tag: ['@serial', '@manual'] }, async ({ Given, When, Then }) => { 
    await Given('the RealScanner class is implemented'); 
    await When('the server starts without NETMAP_MOCK'); 
    await Then('it uses RealScanner instead of MockScanner'); 
  });

  test('Manual verification - Real network scan', { tag: ['@serial', '@manual'] }, async ({ Given, When, Then, And }) => { 
    await Given('I start the server without mock mode'); 
    await When('I navigate to the scan page in a browser'); 
    await And('I enter a real network range'); 
    await And('I click Start Scan'); 
    await Then('I should see actual devices from my network'); 
    await And('I should not see any mock devices'); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/0009-real-scanner.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":9,"tags":["@serial","@manual"],"steps":[{"pwStepLine":7,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Given the RealScanner class is implemented","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When the server starts without NETMAP_MOCK","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then it uses RealScanner instead of MockScanner","stepMatchArguments":[]}]},
  {"pwTestLine":12,"pickleLine":14,"tags":["@serial","@manual"],"steps":[{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given I start the server without mock mode","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When I navigate to the scan page in a browser","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"And I enter a real network range","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"And I click Start Scan","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then I should see actual devices from my network","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And I should not see any mock devices","stepMatchArguments":[]}]},
]; // bdd-data-end