# Hotel Mania
Home Page View
![Hotel Mania Home](https://i.ibb.co/LNy5bNn/Screenshot-2024-05-08-104321.png)

Admin Dashboard View
![Hotel Mania Admin Dashboard](https://i.ibb.co/X8Dz9tj/Screenshot-2024-05-08-104708.png)

### Technologies:

#### Frontend:

- React.js
- TypeScript
- TailwindCSS
- Daisy UI (Built-in Tailwind component library)
- Stripe (Payment method)
- React Query (Data fetching npm)

#### Backend:

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Multer (file upload handler)
- JWT
- Cloudinary (Image uploading platform)

This is a single-page, multi-role, and hotel booking web application. The roles are Admin, Hotel Partners, and Users.

### Features

- It is a mobile-responsive and multi-role website such as Hotel Partner, User, and Admin.
- Different dashboards for different roles. APIs and Routes are secured in the client and backend.
- I Used JWT and cookies for authentication and to secure the APIs.
- I used PlayWright for QA testing.
- PageSpeed Insights Performance 82 out of 100

### Admin:

Only the website owner can use the admin account. Once any user registers as a Hotel Partner Admin can approve or disapprove their account after verifying the submited details.

### Hotel Account:

Any hotel wanting to become an onboarded partner will sign up here with the needed data. While an admin approves the hotel accounts, they can add room packages.

### User:

Anyone can visit room packages but only one can book a room with being a user. Users can book a room through the Stripe and watch the previous bookings.

### APIs

#### Common Get APIs:

- https://hotelmania.onrender.com/api/hotels/search
- https://hotelmania.onrender.com/api/hotels/:hotelId

#### Users secured Get APIs:

- https://hotelmania.onrender.com/api/bookings/my-bookings
- https://hotelmania.onrender.com/api/bookings/current_bookings

#### Hotel secured Partners Get APIs:

- https://hotelmania.onrender.com/api/bookings/partner/my-bookings
- https://hotelmania.onrender.com/api/bookings/partner/current_bookings
- https://hotelmania.onrender.com/api/hotels/my-hotels

#### Admin's secured Get APIs:

- https://hotelmania.onrender.com/api/partners
- https://hotelmania.onrender.com/api/hotels
- https://hotelmania.onrender.com/api/bookings
- https://hotelmania.onrender.com/api/statistics

### login credentials

##### Admin:

- email: admin@gmail.com
- password: User100%

##### Hotel Partner:

- email: hotel1@gmail.com
- password: password

##### User :

- email: user@gmail.com
- password: password

### Stripe test card credentials

- Card Number: 4242 4242 4242 4242
- Expiration: 03/42
- CVC: 3424

Live link: https://hotelmania.onrender.com
