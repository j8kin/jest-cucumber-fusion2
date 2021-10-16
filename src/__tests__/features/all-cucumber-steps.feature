Feature: Use all Cucumber Steps
    This test also use non-ASCII characters in Scenario steps

    Scenario: Perform all cucumber steps
        Given I have 3 items for sales
        When I bought a new item 'Rammstein single - Auslander' at the price of 23
        Then I have 4 items for sales
        And 'Rammstein single - Auslander' is one of my item(s) for sale
        But 'Item not exists' is not one of my item(s) for sale
