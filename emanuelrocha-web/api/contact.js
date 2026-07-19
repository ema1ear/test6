import { handleContact } from "../server/contact-handler.js";

export function POST(request) {
    return handleContact(request, process.env);
}
