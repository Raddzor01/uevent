# Uevent-api

API for a event-booking application.

## Requirements

- Node.js
- NPM (version 10.5.0 or higher)
- MySQL
- Stripe CLI

## Installation

Follow these steps to set up and run the project locally:

1. Create an `.env` file based on the `.env.example` fil and fill in the required variables.

2. **Database Setup**: Create a database using the provided SQL script.
    ```bash
    mysql -u <username> -p <password> < db/db.sql
    ```

3. **Install Dependencies**: Install the project dependencies using npm.
    ```bash
    npm install
    ```
4. (optionally) **Payment System Setup**: Log in to stripe account by running:
    ```bash
   stripe login
    ```
   Run local listener, buy running the following command
   ```bash
   stripe listen --forward-to ${serverIP}:${serverPort}/webhook
   ```
   For more information, check out [Stripe Developer Tools Docs](https://docs.stripe.com/webhooks)

5. **Start the Server**: Run the application using npm.
    ```bash
    npm run dev
    ```

## Documentation

- Authentication Documentation: [Auth Docs](./docs/Auth.md)
- Users Documentation: [Users Docs](./docs/Users.md)
- Events Documentation: [Events Docs](./docs/Events.md)
- Companies Documentation: [Companies Docs](./docs/Companies.md)
- Comments Documentation: [Comments Docs](./docs/Comments.md)
- Promo Codes Documentation: [Promo Codes Docs](./docs/Promo-codes.md)
- Company Subscriptions Documentation: [Company Subscriptions Docs](./docs/companySubscriptions.md)
- Formats Documentation: [Formats Docs](./docs/Formats.md)
- Themes Documentation: [Themes Docs](./docs/Themes.md)




## License

This project is licensed under the [MIT License](../LICENSE).

## Contact

For inquiries or support, please contact [Telegram](https://t.me/Raddzor).