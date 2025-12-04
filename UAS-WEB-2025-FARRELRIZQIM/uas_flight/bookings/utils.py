from amadeus import Client, ResponseError
from decouple import config

amadeus = Client(
    client_id=config('AMADEUS_API_KEY'),
    client_secret=config('AMADEUS_API_SECRET')
)

def search_flights(origin, destination, date, return_date=None):
    try:
        if return_date:
            response = amadeus.shopping.flight_offers_search.get(
                originLocationCode=origin,
                destinationLocationCode=destination,
                departureDate=date,
                returnDate=return_date,
                adults=1,  
                currencyCode='IDR',
                max=5      
            )

        else:
            response = amadeus.shopping.flight_offers_search.get(
                originLocationCode=origin,
                destinationLocationCode=destination,
                departureDate=date,
                adults=1,
                currencyCode='IDR',
                max=5
            )
        return response.data
    except ResponseError as error:
        print(f"Error Amadeus: {error}")
        return None