@serial
Feature: Live Scan Updates

  Scenario: Devices appear in real-time during scan
    Given I am on the scan page
    When I start a scan
    Then devices appear one by one as they are discovered
    And I see the scan status change to "Complete" when finished
    And the final device count matches the number discovered
