Feature: Example of steps reusing.
    # It is very useful to have one code for 2-3-4 Gherkin steps
    # The idea is to include one step inside another and get the same step
    # Then Reuse Step Example test: 'freetext'
    # And Reuse Step Example test: 'freetext'
    # To use it we need to include one step into another:
    # Then (
    #   And (/^Reuse Step Example test: '(.+)'/, (text)=> {});
    #);

    Scenario: Two steps with different keywords
        Then Reuse Step Example test: 'freetext'
        And Reuse Step Example test: 'freetext'