import math
import random
import secrets

import dotenv
import faker
import hashlib

import json
import sys

import requests
import time

from urllib.parse import quote

EARTH_MEAN_RADIUS_KMS = 6371.009
MIN_PYTHON = (3, 8)


def random_lat_long_radius(center: (float, float), radius: float) -> (float, float):
    (latitude, longitude) = center
    distance_offset = secrets.SystemRandom().uniform(1.0, radius)

    new_latitude = latitude + math.degrees(distance_offset * 1000.0 / (EARTH_MEAN_RADIUS_KMS * 1000.0))
    new_longitude = longitude + math.degrees(distance_offset * 1000.0 / (EARTH_MEAN_RADIUS_KMS * 1000.0)) / math.cos(
        math.radians(latitude))

    return new_latitude, new_longitude


def generate_wollongong_address(faker):
    backend_env = dotenv.dotenv_values("./env/backend.env")
    with open("./data/wollongong_postcodes.json", "r") as f:
        wollongong_postcodes = json.load(f)

    GOOGLE_API_NEARBY_PLACES_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    GOOGLE_API_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json"

    SLEEP_TIME = 0.5
    LOCATION_TYPES = [
        "accounting",
        "airport",
        "amusement_park",
        "aquarium",
        "art_gallery",
        "atm",
        "bakery",
        "bank",
        "bar",
        "beauty_salon",
        "bicycle_store",
        "book_store",
        "bowling_alley",
        "bus_station",
        "cafe",
        "campground",
        "car_dealer",
        "car_rental",
        "car_repair",
        "car_wash",
        "casino",
        "cemetery",
        "church",
        "city_hall",
        "clothing_store",
        "convenience_store",
        "courthouse",
        "dentist",
        "department_store",
        "doctor",
        "drugstore",
        "electrician",
        "electronics_store",
        "embassy",
        "fire_station",
        "florist",
        "funeral_home",
        "furniture_store",
        "gas_station",
        "gym",
        "hair_care",
        "hardware_store",
        "hindu_temple",
        "home_goods_store",
        "hospital",
        "insurance_agency",
        "jewelry_store",
        "laundry",
        "lawyer",
        "library",
        "light_rail_station",
        "liquor_store",
        "local_government_office",
        "locksmith",
        "lodging",
        "meal_delivery",
        "meal_takeaway",
        "mosque",
        "movie_rental",
        "movie_theater",
        "moving_company",
        "museum",
        "night_club",
        "painter",
        "park",
        "parking",
        "pet_store",
        "pharmacy",
        "physiotherapist",
        "plumber",
        "police",
        "post_office",
        "primary_school",
        "real_estate_agency",
        "restaurant",
        "roofing_contractor",
        "rv_park",
        "school",
        "secondary_school",
        "shoe_store",
        "shopping_mall",
        "spa",
        "stadium",
        "storage",
        "store",
        "subway_station",
        "supermarket",
        "synagogue",
        "taxi_stand",
        "tourist_attraction",
        "train_station",
        "transit_station",
        "travel_agency",
        "university",
        "veterinary_care",
        "zoo"
    ]

    while True:
        ret_street = ""
        ret_suburb = ""
        ret_state = ""
        ret_post_code = ""

        ret_latitude = 0
        ret_longitude = 0

        while True:
            try:
                random_wollongong_location = random.SystemRandom().choice(wollongong_postcodes)

                params = {
                    "key": f"{backend_env['GOOGLE_MAPS_API_KEY']}",
                    "location": f"{random_wollongong_location['latitude']},{random_wollongong_location['longitude']}",
                    "radius": f"{25000}",
                    "type": random.SystemRandom().choice(LOCATION_TYPES)
                }

                result = requests.get(GOOGLE_API_NEARBY_PLACES_URL, params=params)
                if result.status_code != 200:
                    continue

                google_locations = result.json()["results"][1:-1]
                if len(google_locations) == 0:
                    continue

                random_location = random.SystemRandom().choice(google_locations)

                ret_latitude = random_location["geometry"]["location"]["lat"]
                ret_longitude = random_location["geometry"]["location"]["lng"]

                params = {
                    "key": f"{backend_env['GOOGLE_MAPS_API_KEY']}",
                    "latlng": f"{ret_latitude},{ret_longitude}"
                }

                result = requests.get(GOOGLE_API_GEOCODE_URL, params=params)
                if result.status_code != 200:
                    continue

                location = result.json()["results"][0]
                post_code_comp = next((comp for comp in location["address_components"] if "postal_code" in comp["types"]), None)
                if post_code_comp is None:
                    continue

                street_number_comp = next((comp for comp in location["address_components"] if "street_number" in comp["types"]), None)
                if post_code_comp is None:
                    continue

                street_name_comp = next((comp for comp in location["address_components"] if "route" in comp["types"]), None)
                if street_name_comp is None:
                    continue

                suburb_name_comp = next((comp for comp in location["address_components"] if "locality" in comp["types"]), None)
                if suburb_name_comp is None:
                    continue

                state_name_comp = next((comp for comp in location["address_components"] if "administrative_area_level_1" in comp["types"]), None)
                if state_name_comp is None:
                    continue

                ret_street = f"{street_number_comp['long_name']} {street_name_comp['long_name']}"
                ret_suburb = suburb_name_comp["long_name"]
                ret_state = state_name_comp["long_name"]
                ret_post_code = post_code_comp["long_name"]
                break
            except Exception as error:
                print(f"Failed to connect to send GET request: {error}")
                print(f"Sleeping for {SLEEP_TIME} seconds")
                time.sleep(SLEEP_TIME)
        return ret_street, ret_suburb, ret_state, ret_post_code, ret_latitude, ret_longitude


if __name__ == '__main__':
    if sys.version_info < MIN_PYTHON:
        sys.exit("Python %s.%s or later is required.\n" % MIN_PYTHON)

    faker.Faker.seed(secrets.SystemRandom().random())
    faker = faker.Faker("en_AU")

    AccountTypes = ["Client", "Professional"]
    ClientMembershipTypes = ["Membership subscription", "Pay-on-demand"]
    ProfessionalMembershipTypes = ["Membership subscription", "Commission fee"]
    ProfessionalSpecialities = [
        ("Plumber", "Unclog toilet bowl"),
        ("Plumber", "Unclog kitchen sink"),
        ("Plumber", "Install new toilet bowl"),
        ("Plumber", "Install new tap in kitchen"),
        ("Plumber", "Fix leaking shower head"),
        ("Electrician", "Fix flickering bathroom light"),
        ("Electrician", "Install exhaust fan in bathroom"),
        ("Electrician", "Fix broken breaker switch"),
        ("Electrician", "Install new ethernet wall socket"),
        ("Carpenter", "Fix squeaky cupboard hinge"),
        ("Carpenter", "Install new shelving"),
        ("Painter", "Paint outside side fence"),
        ("Painter", "Paint bedroom a new color"),
        ("Roof Plumber", "Fix leak in roof"),
        ("Roof Plumber", "Fix broken guttering"),
        ("Pest Control", "Treat house for rats and cockroaches"),
    ]

    subscription_cost = 25
    one_time_cost = 20
    client_count = 20
    professional_count = 20

    generated_clients = []
    generated_professionals = []
    generated_client_addresses = []
    generated_memberships = []
    generated_service_requests = []
    generated_payments = []

    for i in range(0, client_count):
        client = {
            "Client_Id": secrets.SystemRandom().getrandbits(32),
            "Name": faker.name(),
            "Username": "",
            # "phone_number": faker.phone_number(),
            "Email": faker.email(),
            "Password": "",
            "Account_Status": "Active"
        }

        client["Username"] = client["Name"].replace(" ", "")
        client["Password"] = hashlib.md5(f"{client['Username']}123".encode()).hexdigest()
        generated_clients.append(client)

    for i in range(0, professional_count):
        (speciality, service_desc) = secrets.SystemRandom().choice(ProfessionalSpecialities)
        professional = {
            "Professional_Id": secrets.SystemRandom().getrandbits(32),
            "Name": faker.name(),
            "Username": "",
            "Email": faker.email(),
            "Password": "",
            "Account_Status": "Active",
            "Professional_Type": speciality
        }

        professional["Username"] = professional["Name"].replace(" ", "")
        professional["Password"] = hashlib.md5(f"{professional['Username']}123".encode()).hexdigest()
        generated_professionals.append(professional)

    for client in generated_clients:
        street, suburb, state, post_code, latitude, longitude = generate_wollongong_address(faker)
        address = {
            "Address_Id": secrets.SystemRandom().getrandbits(32),
            "Street_Address": street,
            "Suburb": suburb,
            "Postcode": post_code,
            "State": state,
            "Latitude": latitude,
            "Longitude": longitude,
            "Client_Id": client["Client_Id"]
        }
        generated_client_addresses.append(address)

        membership = {
            "Member_Id": secrets.SystemRandom().getrandbits(32),
            "Membership_Type": secrets.SystemRandom().choice(ClientMembershipTypes),
            "Client_Id": client["Client_Id"],
            "Professional_Id": None
        }
        generated_memberships.append(membership)

        (speciality, service_desc) = secrets.SystemRandom().choice(ProfessionalSpecialities)

        request = {
            "Request_Id": secrets.SystemRandom().getrandbits(32),
            "Request_Type": speciality,
            "Request_Description": service_desc,
            "Request_Status": "Open",
            "Request_Price": secrets.SystemRandom().randint(50, 150),
            "Client_Id": client["Client_Id"],
            "Professional_Id": None,
            "Address_Id": address["Address_Id"]
        }
        generated_service_requests.append(request)

    for professional in generated_professionals:
        membership_type = secrets.SystemRandom().choice(ProfessionalMembershipTypes)
        membership = {
            "Member_Id": secrets.SystemRandom().getrandbits(32),
            "Membership_Type": membership_type,
            "Client_Id": None,
            "Professional_Id": professional["Professional_Id"]
        }
        generated_memberships.append(membership)

    for membership in generated_memberships:
        if "subscription" in membership["Membership_Type"]:
            payment_type = "Subscription payment"
            payment_amount = subscription_cost
        else:
            # Generate data such that no one-of payments have been made yet
            continue

        payment = {
            "Payment_Id": secrets.SystemRandom().getrandbits(32),
            "Payment_Type": payment_type,
            "Payment_Amount": payment_amount,
            "Client_Id": membership["Client_Id"],
            "Professional_Id": membership["Professional_Id"],
            "Request_Id": None,
            "Card_Number": faker.credit_card_number(),
            "Card_Expiry": faker.credit_card_expire(),
        }
        generated_payments.append(payment)

    with open("./data/clients.json", "w") as f:
        json.dump(generated_clients, f, indent=4)

    with open("./data/professionals.json", "w") as f:
        json.dump(generated_professionals, f, indent=4)

    with open("./data/address.json", "w") as f:
        json.dump(generated_client_addresses, f, indent=4)

    with open("./data/membership.json", "w") as f:
        json.dump(generated_memberships, f, indent=4)

    with open("./data/service_request.json", "w") as f:
        json.dump(generated_service_requests, f, indent=4)

    with open("./data/payment.json", "w") as f:
        json.dump(generated_payments, f, indent=4)

    exit(0)
