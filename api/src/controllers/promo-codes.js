import promoCodesTable from '../models/Promo-codes.js';
import { ClientError } from '../middleware/error.js';
import eventsTable from '../models/Event.js';

class promoCodesController {

	getPromoCodes = async(req, res) => {
		const eventId = Number(req.query.eventId);

		let promoCodesArray;
		if(eventId)
			promoCodesArray = await promoCodesTable.getAllEventsPromoCodes(eventId);
		else
			promoCodesArray = await promoCodesTable.getAll();

		res.status(200).json({ promoCodesArray });
	}

	getPromoCode = async(req, res) => {
		const promoCodeId = Number(req.params.id);

		const promoCode = await promoCodesTable.read(promoCodeId);

		if(!promoCode)
			throw new ClientError('Promo code not found', 404);

		res.status(200).json({ promoCode });
	}

	createPromoCode = async(req, res) => {
		const { code, discount, event_id } = req.body;

		if(await promoCodesTable.checkFor(code, event_id))
			throw new ClientError("Promo code exists", 409);

		const promoCodeId = await promoCodesTable.create(code, discount, event_id);

		res.status(200).json({ promoCodeId });
	}

	updatePromoCode = async(req, res) => {
		const promoCodeId = Number(req.params.id);
		const { code, discount, event_id } = req.body;

		const promoCode = await promoCodesTable.read(promoCodeId);

		if(code) {
			if(await promoCodesTable.checkFor(code, promoCode.event_id))
				throw new ClientError("Promo code exists", 409);
			await promoCodesTable.update(promoCodeId, "code", code);
		}
		if(discount) await promoCodesTable.update(promoCodeId, "discount", discount);
		if(event_id) {
			if(!await eventsTable.checkFor("id", event_id))
				throw new ClientError("Event not found", 404);
			await promoCodesTable.update(promoCodeId, "event_id", event_id);
		}

		res.sendStatus(201);
	}

	deletePromoCode = async(req, res) => {
		const promoCodeId = Number(req.params.id);

		await promoCodesTable.delete(promoCodeId);

		res.sendStatus(204);
	}
}

const controller = new promoCodesController();
export default controller;