from faker import Faker
from faker.providers import DynamicProvider
import random

accountType = DynamicProvider( # Custom user defined generator
    provider_name = "Account_Type", # f.AccountType() as function call to generate random data
    elements = ["Client","Professional"] # Generate the following randomly 
)


f = Faker() # using the faker python module to generate random data

f.add_provider(accountType) # add_provider to use as a function call 
#f.add_provider(Ausaddress)

print(f"ID  |  Firstname | LastName |  Email  |  Password  |  AccountType ")
for i in range(1,20):
    print(f"{f.unique.random_int(min=1, max=20)} |  {f.user_name()} | {f.first_name()} | {f.last_name()} | {f.email()} | {f.password()} | {f.Account_Type()}") # calls from Dynamic provider here