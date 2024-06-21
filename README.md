Bike Rental App
Overview
The Bike Rental App allows users to rent bikes based on availability. Users can sign up, log in, and book bikes for specific durations using Stripe payment integration. If a bike rental ends today, it becomes available for booking the next day. Users can view their booked bikes in their dashboard and manage their bookings. The app also includes features for password recovery to ensure user account security.

Features
User registration and login with authentication token
Password recovery for registered users
Bike booking based on availability
Stripe payment integration for bike booking transactions
Daily availability reset for bikes
User dashboard to manage booked bikes.

Registration and Login
Sign Up:
Users can register by providing a username, email, and password.

Log In:
Users can log in with their email and password. If the credentials are correct, an authentication token will be issued.

Password Recovery
Forgot Password:
Users who have forgotten their password can request a password reset link by providing their registered email address.

Reset Password:
Users can update their password using the link sent to their email, provided they are a valid user.

Bike Booking
Check Bike Availability:
Users can check if a bike is available for booking.

Book Bike:
Users can select an available bike, choose a rental duration, and make a payment using Stripe integration.

Availability Reset:
Bikes become available for booking the next day after their current rental period ends.