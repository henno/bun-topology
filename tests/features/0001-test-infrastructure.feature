Feature: Test Infrastructure

  @manual
  Scenario: Test runner works
    When I run "bun test"
    Then Playwright executes feature files from tests/features/
    And step definitions from tests/steps/ are used
