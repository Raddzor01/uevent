import { HOURS_BEFORE_EVENT } from './default.js';

export const EMAIL_TEMPLATES = {
	EVENT_CREATED: {
		subject: "A new event just published",
		html: (eventName, companyName, eventId) => {
		return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${companyName} published a new event ${eventName}</title>
</head>
<body style="font-family: Arial, sans-serif;">

<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="text-align: center;">New event just anonced</h2>
    <p>Dear User,</p>
    <p>${companyName} from your subcriptions, published a new event ${eventName}</p>
    <p style="text-align: center;"><a href="${process.env.CLIENT_URL}/events/${eventId}" style="padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Open event page</a></p>
    <p>Best regards,<br> The Ucode Team</p>
</div>

</body>
</html>`;
	}
	},
	EVENT_REMINDER: {
		subject: 'Your event will start soon',
		html: (eventId, eventName, eventDate) => {
			return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Event ${eventName} will start in ${HOURS_BEFORE_EVENT} hours</title>
</head>
<body style="font-family: Arial, sans-serif;">

<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="text-align: center;">The event ${eventName} will start at ${eventDate}</h2>
    <p>Dear User,</p>
    <p>The event ${eventName} will start at ${eventDate}, on which you bought a ticket. Don't be late!</p>
    <p style="text-align: center;"><a href="${process.env.CLIENT_URL}/events/${eventId}" style="padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Open event page</a></p>
    <p>Best regards,<br> The Ucode Team</p>
</div>

</body>
</html>`;
		}
	},
	EVENT_SUBSCRIBE: {
		subject: "You have successfully bought a ticket to an event",
		html: (eventId, eventName, eventDate) => {
			return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>You have successfully bought a ticket to an event ${eventName}</title>
</head>
<body style="font-family: Arial, sans-serif;">

<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <p>Dear User,</p>
    <p>You have successfully bought a ticket to an event ${eventName}</p>
    <p>The event ${eventName} will start at ${eventDate}.</p>
    <p style="text-align: center;"><a href="${process.env.CLIENT_URL}/events/${eventId}" style="padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Open event page</a></p>
    <p>Best regards,<br> The Ucode Team</p>
</div>

</body>
</html>`;
		}
	},
};