import { CronJob } from "cron";
import { CRON_TIMEZONE } from '../../consts/nodemailer.js';
import eventsTable from '../models/Event.js';
import usersTable from '../models/User.js';
import companiesTable from '../models/Company.js';
import { sendMail } from '../utils/mail.js';
import { EMAIL_TEMPLATES } from '../../consts/email_templates.js';

const scheduleCompanySubscribersNotification = (event_id) => {
	const date = new Date();

	date.setMinutes(date.getMinutes() + 1);

	new CronJob(
		date,
		async() => {
			const event = await eventsTable.read(event_id);

			if(!event)
				return;

			const subscribers = await usersTable.getCompanySubscribers(event.company_id);
			const company = await companiesTable.read(event.company_id);

			if(!subscribers || !company)
				return;

			subscribers.forEach((subscriber) => {
				const html = EMAIL_TEMPLATES.EVENT_CREATED.html(event.name, company.name, event.id);
				sendMail(subscriber.email, EMAIL_TEMPLATES.EVENT_CREATED.subject, html);
			});
		},
		null,
		true,
		CRON_TIMEZONE,
	);
}

const scheduleEventReminder = (date, event_id) => {
	new CronJob(
		date,
		async() => {
			const event = await eventsTable.read(event_id);

			if(!event)
				return;

			const visitors = await usersTable.getEventGuests(event_id);
			const company = await companiesTable.read(event.company_id);

			if(!visitors.length || !company)
				return;

			visitors.forEach((visitor) => {
				const html = EMAIL_TEMPLATES.EVENT_REMINDER.html(event.id, event.name, event.date);
				sendMail(visitor.email, EMAIL_TEMPLATES.EVENT_CREATED.subject, html);
			});
		},
		null,
		true,
		CRON_TIMEZONE,
	);

}

export { scheduleCompanySubscribersNotification, scheduleEventReminder };