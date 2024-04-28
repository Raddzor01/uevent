import ticketsTable from '../models/Tickets.js';
import { TICKETS_UNLIMITED } from '../../consts/default.js';
import eventsTable from '../models/Event.js';
import { scheduleEventReminder } from './mailScheduler.js';
import { ClientError } from '../middleware/error.js';
import usersTable from '../models/User.js';

const subscribeToEvent = async(event_id, user_id, isVisible) => {
	await ticketsTable.create(user_id, event_id, isVisible);

	const event = await eventsTable.read(event_id);
	const visitor = await usersTable.read(user_id);

	if(!event)
		throw new ClientError("Event not found", 404);

	if(!visitor)
		throw new ClientError("User not found", 404);

	if(event.tickets_available !== TICKETS_UNLIMITED)
		await eventsTable.update(event_id, "tickets_available", event.tickets_available - 1);

	scheduleEventReminder(event.date, event_id);
};

export { subscribeToEvent };