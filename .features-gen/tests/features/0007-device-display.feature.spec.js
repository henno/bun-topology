// Generated from: tests/features/0007-device-display.feature
import { test } from "playwright-bdd";

test.describe('Device Display', () => {

  test('Device table columns', { tag: ['@serial'] }, async ({ Given, When, Then, page }) => { 
    await Given('I am on the scan page', null, { page }); 
    await When('I start a scan and it completes', null, { page }); 
    await Then('each device row shows: type icon, IP, hostname, vendor', null, { page }); 
  });

  test('Device type icons', { tag: ['@serial'] }, async ({ Given, Then, And, page }) => { 
    await Given('I started a scan and it completed', null, { page }); 
    await Then('routers show a router icon', null, { page }); 
    await And('switches show a switch icon', null, { page }); 
    await And('computers show a computer icon', null, { page }); 
    await And('unknown devices show a question mark icon', null, { page }); 
  });

  test('Missing hostname', { tag: ['@serial'] }, async ({ Given, When, Then, page }) => { 
    await Given('I started a scan and it completed', null, { page }); 
    await When('I look at the device with no hostname', null, { page }); 
    await Then('the hostname column shows "—"', null, { page }); 
  });

  test('Missing vendor', { tag: ['@serial'] }, async ({ Given, When, Then, page }) => { 
    await Given('I started a scan and it completed', null, { page }); 
    await When('I look at the device with no vendor', null, { page }); 
    await Then('the vendor column shows "Unknown"', null, { page }); 
  });

  test('All mock devices appear', { tag: ['@serial'] }, async ({ Given, When, Then, page }) => { 
    await Given('I am on the scan page', null, { page }); 
    await When('I run a scan in mock mode', null, { page }); 
    await Then('I see exactly 5 devices', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/0007-device-display.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@serial"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given I am on the scan page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When I start a scan and it completes","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then each device row shows: type icon, IP, hostname, vendor","stepMatchArguments":[]}]},
  {"pwTestLine":12,"pickleLine":9,"tags":["@serial"],"steps":[{"pwStepLine":13,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Given I started a scan and it completed","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then routers show a router icon","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"And switches show a switch icon","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And computers show a computer icon","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And unknown devices show a question mark icon","stepMatchArguments":[]}]},
  {"pwTestLine":20,"pickleLine":16,"tags":["@serial"],"steps":[{"pwStepLine":21,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given I started a scan and it completed","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When I look at the device with no hostname","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then the hostname column shows \"—\"","stepMatchArguments":[{"group":{"start":26,"value":"\"—\"","children":[{"start":27,"value":"—","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":26,"pickleLine":21,"tags":["@serial"],"steps":[{"pwStepLine":27,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"Given I started a scan and it completed","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When I look at the device with no vendor","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then the vendor column shows \"Unknown\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Unknown\"","children":[{"start":25,"value":"Unknown","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":32,"pickleLine":26,"tags":["@serial"],"steps":[{"pwStepLine":33,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"Given I am on the scan page","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When I run a scan in mock mode","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then I see exactly 5 devices","stepMatchArguments":[{"group":{"start":14,"value":"5","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end