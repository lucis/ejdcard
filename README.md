## EJD Card

Integrated payment system for an internal event.

> Built for the Encontrão EJD in Campina Grande - PB

<p align="center">
  <img src="https://i.imgur.com/vfn607N.png" width="200" alt="EJDCard"/>
</p>

## Authentication
- By default, **Firebase Auth** is used with Google and Facebook providers. For Google login, Firebase configures everything automatically, but for Facebook social login **additional setup is required**: create an app in the Facebook developer portal, enable the login service, and specify the URL where the system is deployed. There should be plenty of tutorials covering this (Firebase Auth and Facebook).

## Authorization
After a user authenticates, the **admin** can assign roles that determine which sections of the application they can access. (You must set which user is the admin directly in the Firebase database.)

Roles are assigned via the letters that represent them, by writing a string in each user's configuration. For example: adding `vu` as a user's roles allows them to make sales and top-ups.

| Role | Meaning |
|--|--|
| `v` | User can make sales with any card |
| `u` | User can top up cards |
| `c` | User can register cards (and set initial balance) |
| `r` | User can read a card's balance (automatically granted to all logged-in users) |
| `a` | User is an administrator and can change other users' permissions |

## Development
- You need to **create a Firebase app** and configure the credentials in `withRoot.js`.
- Then run `yarn start` and everything should work.
- Sign in with your provider (Google or Facebook), and in the database add the role `vucra` to the user that was created for you.
