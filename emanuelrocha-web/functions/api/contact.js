import { handleContact } from "../../server/contact-handler.js";

export function onRequestPost({ request, env }) {
    return handleContact(request, env);
}
