# FoodApp API

## How to run the API

1. Clone this repo and install all packages with `yarn` (or your favorite package manager)
2. Run `docker-compose up -d` to download the image and create the container.
3. After the container is running, run `yarn prisma migrate dev` to create the db and the models.
4. Start the server with `yarn start`

## How to use it

From the app call the endpoint localhost:3000/api/auth/login
or
localhost:3000/api/auth/register

The data you past must be a JSON object and a POST call.

For the register, it must look like:
{  
 "fullName":"Luis Leal",
"email":"luisrrleal@gmail.com",
"password1":"12345",
"password2":"12345",
}

For the login, it must look like:
{  
 "email":"luisrrleal@gmail.com",
"password":"12345"
}

(you can change the port if you want to)
