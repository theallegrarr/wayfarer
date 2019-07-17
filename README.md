# WayFarer API
This is a documentation of the various applications and uses of the WayFarer API

## Version: 1.0.0

### /auth/signup

#### POST
##### Summary:

Create a user account

##### Description:

You can register with this route and get your access token

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | body | set a user ID | Yes | integer |
| password | body | choose a password | Yes | string |
| first_name | body | user first name | Yes | string |
| last_name | body | user last name | Yes | string |
| email | query | Register for a user account | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | User Created |

### /auth/signin

#### POST
##### Summary:

Sign in to user account

##### Description:

For returning members, you can simply use the sign in route to get an access token

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| email | body | enter account email | Yes | string |
| password | body | enter account password | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | success |
| 401 | Wrong login parameters |

### /trips

#### POST
##### Summary:

Create a trip

##### Description:

Member can create trip for users to book seat on

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| bus_id | body | choose a bus ID | Yes | integer |
| destination | body | set trip destination | Yes | string |
| origin | body | set trip origin | Yes | string |
| trip_date | body | set trip date | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Created |
| 400 | User not valid |

#### GET
##### Summary:

View all available trips

##### Description:

Any valid user can view all available trips.

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | trips are displayed |
| 400 | Invalid user |

### /trips/{tripId}

#### PATCH
##### Summary:

Disable/Cancel a trip

##### Description:

Any Admin can cancel a trip.

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | trip is disabled |
| 400 | only admin allowed to patch trips |

### /bookings

#### GET
##### Summary:

View all bookings

##### Description:

Returns all stored bookings

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| token | body | token for authentication | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | success |
| 400 | error |

#### POST
##### Summary:

Creates a booking

##### Description:

Creates a booking with the trip id provided

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| trip_id | query | ID of trip you want to book | Yes | string |
| token | query | user token | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | success |
| 400 | failed |

### /bookings/{bookingId}

#### DELETE
##### Summary:

Deletes a booking

##### Description:

User can delete any booking he/her creates

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| bookingId | path | reference the id for your booking in the route | Yes | string |
| token | path | token for authentication | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | success |
| 400 | failed |
