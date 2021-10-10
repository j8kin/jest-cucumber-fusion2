Feature: Step not exist

    Some steps exist but step mentioned in scenario not exist

    Scenario: Scenario has not exist step
        Given I add 2 and 3 and expect 5

        Given This Step not exist!

        Given I add 3 and 3 and expect 6