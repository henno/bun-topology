@serial
@manual
Feature: Real Network Scanner

  # Note: These tests require manual execution without NETMAP_MOCK
  # Run with: NETMAP_MOCK=false bun run dev
  # Then manually test in browser

  Scenario: Real scanner implementation exists
    Given the RealScanner class is implemented
    When the server starts without NETMAP_MOCK
    Then it uses RealScanner instead of MockScanner

  Scenario: Manual verification - Real network scan
    Given I start the server without mock mode
    When I navigate to the scan page in a browser
    And I enter a real network range
    And I click Start Scan
    Then I should see actual devices from my network
    And I should not see any mock devices
