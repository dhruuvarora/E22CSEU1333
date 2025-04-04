# Average Calculator Microservice
A REST API service that calculates rolling averages of different types of numbers (primes, Fibonacci, even, random) fetched from a third-party server.
Overview
This microservice fetches numbers from external APIs, maintains a sliding window of unique values, and calculates their average. It demonstrates fundamental microservice patterns including:

REST API design
Third-party API integration
Stateful data management
Error handling and fallback strategies

# Features

Exposes API endpoints for different number types (p, f, e, r)
Maintains a configurable-size window of unique numbers
Calculates the average of numbers in the current window
Provides previous and current window state in responses
Handles API errors with mock data fallback
Implements timeout handling for API requests

API Endpoints
CopyGET /numbers/{numberid}
Where {numberid} can be:

p - Prime numbers
f - Fibonacci numbers
e - Even numbers
r - Random numbers

# Response Format
jsonCopy{
  "windowPrevState": [array of numbers previously in the window],
  "windowCurrState": [array of numbers currently in the window],
  "numbers": [array of numbers received from 3rd party server],
  "avg": calculated average value
}

# Architecture
The application follows a clean architecture pattern:

Controllers: Handle HTTP requests/responses and input validation
Services: Contain business logic for fetching data, maintaining window state, and calculations
Routes: Define API endpoints and connect them to controllers