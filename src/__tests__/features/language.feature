# language: nl
# This scenario is written to make sure that jest-cucumber-fusion 2 supports Localization scenarios
# For more info see: https://cucumber.io/docs/gherkin/languages/
Functionaliteit: Online verkopen

	# Scenario: Sell T-Short
    Scenario: t-shirt verkopen
		# Given I have a T-Short (actually we sell Rick Astley T-Short)
        Gegeven ik heb een t-shirt
		# When I want to sell T-short
        Als ik een t-shirt wil verkopen
		# Then I receive €22
        Dan ontvang ik €22
		# And I'm happy
        En ben ik blij
		#But I don't have any t-shirts left
        Maar heb ik geen t-shirts over

	# Scenario Outline: <Object> to sell
    Abstract Scenario: <Object> verkopen
		# Given I have an: <Object>
        Gegeven ik heb een: <Object>
		# When I sell <Object>
        Als ik <Object> verkoop
		# Then I should get €<Amount> for it
        Dan zou ik er €<Bedrag> voor moeten krijgen
	# Examples:
    Voorbeelden:
        | Object                                         | Bedrag |
        | Autographed Neil deGrasse Tyson book           | 100    |
        | Rick Astley t-shirt                            | 22     |
        | An idea to replace EVERYTHING with blockchains | 0      |

	# Scenario: Buy Book
    Scenario: Boek kopen
		# Given 'Autographed Neil deGrasse Tyson book' is for sale
		Gegeven 'Autographed Neil deGrasse Tyson book' is te koop
		# When I buy 'Autographed Neil deGrasse Tyson book'
		Als ik 'Autographed Neil deGrasse Tyson book' koop
		# Then I spent €100
		Dan heb ik €100 uitgegeven

	# Scenario: stock replenish
	Scenario: voorraad bijvullen
		# Given My stock contains:
        Gegeven mijn voorraad bevat:
            | Object                                         |
            | Autographed Neil deGrasse Tyson book           |
            | Rick Astley t-shirt                            |
		
		# When I add the following products:
        Als ik de volgende producten toevoeg:
            | Object            |
            | Smurfen stripboek |
			
		# Then there are 3 objects in my stock, consisting of:
        Dan zitten er 3 objecten in mijn voorraad, bestaant uit:
            | Object                               |
            | Autographed Neil deGrasse Tyson book |
            | Rick Astley t-shirt                  |
            | Smurfen stripboek                    |