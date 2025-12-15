@serial
Feature: Device Display

  Scenario: Device table columns
    Given I am on the scan page
    When I start a scan and it completes
    Then each device row shows: type icon, IP, hostname, vendor

  Scenario: Device type icons
    Given I started a scan and it completed
    Then routers show a router icon
    And switches show a switch icon
    And computers show a computer icon
    And unknown devices show a question mark icon

  Scenario: Missing hostname
    Given I started a scan and it completed
    When I look at the device with no hostname
    Then the hostname column shows "—"

  Scenario: Missing vendor
    Given I started a scan and it completed
    When I look at the device with no vendor
    Then the vendor column shows "Unknown"

  Scenario: All mock devices appear
    Given I am on the scan page
    When I run a scan in mock mode
    Then I see exactly 5 devices
