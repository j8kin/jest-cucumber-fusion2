Feature: Simple test
    Scenario: Simple step without parameters
        Given I add 1 and 2 and expect 3

    Scenario: Simple step with couple string parameters
        Given I add 2 and 3 and expect 5

    Scenario Outline: Simple scenario outline (<first> + <second> = <answer>)
        Given I add <first> and <second> and expect <answer>

        Examples:
            | first | second | answer |
            | 2     | 3      | 5      |
            | 5     | 6      | 11     |
            | 1     | 2      | 3      |