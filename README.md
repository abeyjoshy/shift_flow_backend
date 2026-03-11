
This is a small prototype backend applicaiton for the shift flow app.

To run this application in windows, download mongodb and nodejs and install in your system

Open terminal and navigate to the shift_flow_backend folder

Use 'npm install' to install the node modules

To run the app you can use 'npm start'


API Testing
-----------

# Create Store:
POST: http://localhost:3000/shiftflow/v1/api/create-store
BODY: 
{
  "store_name": "Eyre Square Branch",
  "email": "eyresquare@daybreak.com",
  "password": "EyreSquare@123",
  "is_active": true
}

# Create User:
POST: http://localhost:3000/shiftflow/v1/api/create-user
BODY: 
{
  "store_id": "69b1892f49430edf4e91fa12",
  "name": "Abey Joshy",
  "email": "abeyjoshy@email.com",
  "username": "abey",
  "password": "Abey@123"
}
# use the object id of the store for the value of store_id


# Login: 

POST: http://localhost:3000/shiftflow/v1/api/login
BODY: 
{
  "username": "abey",
  "password": "Abey@123"
}

Sample Output: 
{
    "status": "SUCCESS",
    "message": "Successfully generated token",
    "payLoad": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjE5Yjk3ZTEyZDE0N2NkNzAzZDBjNSIsInVzZXJuYW1lIjoiYWJleSIsImlhdCI6MTc3MzI1NDE2OSwiZXhwIjoxNzczMjU3NzY5fQ.HD2r1fKAReD6kxVjrW0oVRfIjk_oRD2fMBO1YK5Joto"
    }
}


# Get All Stores:

GET: http://localhost:3000/shiftflow/v1/api/stores
# use the token from the login as bearer token for this API

Sample Output: 

{
    "status": "SUCCESS",
    "message": "Store details fetched successfully",
    "payLoad": [
        {
            "_id": "69b1892f49430edf4e91fa12",
            "store_name": "West Side Branch",
            "email": "westside@daybreak.com",
            "is_active": true,
            "created_at": "2026-03-11T15:24:31.328Z",
            "updated_at": "2026-03-11T15:24:31.328Z",
            "__v": 0
        },
        {
            "_id": "69b18a153e69386af5ec4ce5",
            "store_name": "Eyre Square Branch",
            "email": "eyresquare@daybreak.com",
            "is_active": true,
            "created_at": "2026-03-11T15:28:21.499Z",
            "updated_at": "2026-03-11T15:28:21.499Z",
            "__v": 0
        }
    ]
}

# Get All users in a store

GET: http://localhost:3000/shiftflow/v1/api/stores/:store_id/users
# pass the store_id as params which is the object id that u recieve when you get all store details, ed: 69b1892f49430edf4e91fa12 - for West Side Branch
Sample Output: 
{
    "status": "SUCCESS",
    "message": "Users fetched successfully",
    "payLoad": [
        {
            "_id": "69b19b97e12d147cd703d0c5",
            "store_id": "69b1892f49430edf4e91fa12",
            "name": "Abey Joshy",
            "email": "abeyjoshy@email.com",
            "username": "abey",
            "role": "employee",
            "is_active": true,
            "availability": [],
            "created_at": "2026-03-11T16:43:03.998Z",
            "__v": 0
        }
    ]
}
