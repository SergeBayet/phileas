# API Documentation

## `/users`

### Description

Endpoint to users API.



```
POST /users
```
Create a user.
**name** *String* User name with a minimum of 6 character and a maximum of 255. (Required)
**email** *String* Email of the user. Must be unique in the database and required
**password** *String* Password required too. With these contraints :
- minimum 8 characters
- maximum 64 characters
- must have at least one uppercase character
- must have at least one lowercase character
- must have at least one digit
- can't contain spaces characters
**admin** *Boolean* True if the user is administrator. (Default: false)
```
GET /users
```
Get a user by his identifier.
**id** *ObjectId* Identifier of the user to get information from.
**query** *String* search string
```
PUT /users/{id}
```
Update a user by his identifier
**id** *ObjectId* Identifier of the user to update.

```
DELETE /users/{id}
```
Delete a user by his identifier
**id** *ObjectId* Identifier of the user to update.
