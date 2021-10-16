Feature: Using Fusion Before and After

    Fusion Before executed before each scenario.
    Fusion After executed after each scenario.

    # let someNumber = 0;
    Scenario: Test Before
        # Before(() => {
        #   if (someNumber !== 42) {
        #     someNumber = someNumber + 1;
        #   }
        # });
        # That is why Some Number must be equal to 1
        Given Some Number is 1

    Scenario: Test Before 2
        # since it is the second scenario before is called the second time and
        # That is why Some Number must be equal to 2
        Given Some Number is 2

        # After(() => {
        #   if (someNumber === 12) {
        #     // set 42 to verify this value in next scenario
        #     someNumber = 42;
        #   }
        # });
        # Set Some Number to 12 to make sure that Some Number became 42 in After()
        Given Set Some Number to 12

    Scenario: Test Before and After together
        # Verify that Some Number is set to 42 in After()
        Given Some Number is 42