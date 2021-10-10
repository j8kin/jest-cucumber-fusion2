Feature: Test with tables in steps
    Scenario: Simple test table is step
        Given I calculate the following:
            | first | second | expected |
            | 1     | 2      | 3        |
            | 2     | 3      | 5        |

    Scenario Outline: Scenario outline with examples in table only
        Given I calculate the following:
            | first   | second   | expected |
            | <first> | <second> | <exp>    |

        Examples:
            | first | second | exp |
            | 1     | 2      | 3   |
            | 3     | 4      | 7   |

    Scenario Outline: Scenario outline with examples in step itself and table at the same time
        Given I add '<first>' to the following numbers:
            | number    | expected |
            | <second1> | <exp1>   |
            | <second2> | <exp2>   |

        Examples:
            | first | second1 | exp1 | second2 | exp2 |
            | 123   | 1       | 124  | 3       | 126  |
            | 5     | 5       | 10   | 10      | 15   |

# Scenario Outlines with examples in table header is not supported by Jest-Cucumber:
# Scenario Outline: Scenario outline with examples in table header
#     Given I calculate the following:
#         | first | second | <column3> |
#         | 1     | 2      | 3         |

#     Examples:
#         | column3  |
#         | expected |

