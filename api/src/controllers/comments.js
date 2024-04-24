import commentsTable from '../models/Comments.js';
import { ClientError } from "../middleware/error.js";
import eventsTable from '../models/Event.js';

class commentsController {

	getAllComments = async(req, res) => {
		const eventId = Number(req.query.eventId);

		let comments;
		if(eventId)
			comments = await commentsTable.getAllEventComments(eventId)
		else
			comments = await commentsTable.getAll();

		res.status(200).json({ comments });
	}

	getComment = async(req, res) => {
		const commentId = Number(req.params.id);

		const comment = await commentsTable.read(commentId);

		if(!comment)
			throw new ClientError('Comment not found', 404);

		res.status(200).json({ comment });
	}

	createComment = async(req, res) => {
		const { content, user_id, event_id } = req.body;

		if(!await eventsTable.checkFor("id", event_id))
			throw new ClientError(`Event does not exists`, 404);

		const commentId = await commentsTable.create(content, user_id, event_id);

		res.status(200).json({ commentId });
	}

	updateComment = async(req, res) => {
		const commentId = Number(req.params.id);
		const { content } = req.body;

		await commentsTable.update(commentId, "content", content);

		res.sendStatus(201);
	}

	deleteComment = async(req, res) => {
		const commentId = Number(req.params.id);

		await commentsTable.delete(commentId);

		res.sendStatus(204);
	}
}

const controller = new commentsController();
export default controller;
