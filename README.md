# Perchwell Engineering Take-Home

Welcome to the Perchwell take-home assignment!

# Requirements

Please see the requirements [here](https://github.com/RivingtonHoldings/engineering_take_home/blob/main/REQUIREMENTS.md).

# DAVID SQUIRES NOTE:

I did not finish all the requirements, including the frontend components.

To test what I've done:

- Run the docker command to start the server and database

```
docker compose build
docker compose up
```

- Enter the Rails docker container

```
docker exec -it {{ YOUR DOCKER IMAGE ID }} /bin/bash
```

- Run the migrations and seed the database

```
bin/rails db:migrate
bin/rails db:seed
```

Now you can test hitting the server using something like Postman or curl.

GET /clients/:client_id/buildings
POST /clients/:client_id/buildings
GET /clients/:client_id/buildings/new
GET /clients/:client_id/buildings/:id/edit
GET /clients/:client_id/buildings/:id
PATCH /clients/:client_id/buildings/:id
PUT /clients/:client_id/buildings/:id

Example: Creating a building for client 2
Request: POST http://0.0.0.0:3000/clients/2/buildings
Body:

```
{
  "building": {
    "address": "457 Caton Avenue",
    "number of bathrooms": "3.4"
  }
}
```

Response:

```
{
    "id": 18,
    "address": "457 Caton Avenue",
    "client_name": "Melody",
    "number of bathrooms": "3.4"
}
```
