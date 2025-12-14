@serial
Feature: Network Selection from Routing Table

  Scenario: Auto-detect networks from routing table
    Given I am on the scan page
    Then I see a list of detected IPv4 networks with checkboxes
    And each network shows its CIDR notation
    And the core switch IP is pre-filled as the first usable IP in the range

  Scenario: Select network from list
    Given I am on the scan page
    And I see detected networks
    When I select a network from the list
    Then the network field is populated with the selected CIDR
    And the core switch field is populated with the first usable IP
