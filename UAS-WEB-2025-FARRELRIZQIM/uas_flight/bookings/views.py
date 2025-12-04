from django.shortcuts import render, redirect
from .utils import search_flights

def search_view(request):
    if request.method == 'POST':
        origin = request.POST.get('origin')
        destination = request.POST.get('destination')
        date = request.POST.get('departure_date')
        return_date = request.POST.get('return_date') 

        results = search_flights(origin, destination, date, return_date)

        if results:
            request.session['search_results'] = results
            return redirect('flight_result')
        else:
            return render(request, 'bookings/search.html', {'error': 'Penerbangan tidak ditemukan atau terjadi kesalahan API.'})

    return render(request, 'bookings/search.html')

def result_view(request):
    flights = request.session.get('search_results', [])
    
    if request.method == 'POST':
        selected_index = int(request.POST.get('flight_index'))
        selected_flight = flights[selected_index]
        
        request.session['selected_flight'] = selected_flight
        return redirect('flight_booking')

    return render(request, 'bookings/result.html', {'flights': flights})

def booking_view(request):
    flight = request.session.get('selected_flight')
    
    if request.method == 'POST':
        name = request.POST.get('passenger_name')
        passport = request.POST.get('passport_number')
        
        return render(request, 'bookings/success.html', {'name': name})

    return render(request, 'bookings/booking.html', {'flight': flight})