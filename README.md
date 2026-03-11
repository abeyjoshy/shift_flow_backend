# Shift Flow Backend

Small prototype backend application for the **Shift Flow App**.

---

## Setup

Install **Node.js** and **MongoDB** on your system.

Open terminal and navigate to the project folder:

```bash
shift_flow_backend
```

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm start
```

---

## API Testing

### Create Store

**POST**

```
http://localhost:3000/shiftflow/v1/api/create-store
```

Body:

```json
{
  "store_name": "Eyre Square Branch",
  "email": "eyresquare@daybreak.com",
  "password": "EyreSquare@123",
  "is_active": true
}
```

---

### Create User

**POST**

```
http://localhost:3000/shiftflow/v1/api/create-user
```

Body:

```json
{
  "store_id": "69b1892f49430edf4e91fa12",
  "name": "Abey Joshy",
  "email": "abeyjoshy@email.com",
  "username": "abey",
  "password": "Abey@123"
}
```

Use the **store ObjectId** as the `store_id`.

---

### Login

**POST**

```
http://localhost:3000/shiftflow/v1/api/login
```

Body:

```json
{
  "username": "abey",
  "password": "Abey@123"
}
```

Sample Response:

```json
{
  "status": "SUCCESS",
  "message": "Successfully generated token",
  "payLoad": {
    "token": "JWT_TOKEN"
  }
}
```

---

### Get All Stores

**GET**

```
http://localhost:3000/shiftflow/v1/api/stores
```

Use the **login token as Bearer Token**.

---

### Get All Users in a Store

**GET**

```
http://localhost:3000/shiftflow/v1/api/stores/:store_id/users
```

Example:

```
http://localhost:3000/shiftflow/v1/api/stores/69b1892f49430edf4e91fa12/users
```

Use the **store ObjectId** returned from the **Get All Stores** API.
