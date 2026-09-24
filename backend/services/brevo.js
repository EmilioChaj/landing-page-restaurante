import { ContactsApi, ContactsApiApiKeys } from '@getbrevo/brevo';

let api = null;

function getApi() {
  if (!api) {
    api = new ContactsApi();
    api.setApiKey(ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
  }
  return api;
}

export async function subscribeContact(email, listId, templateId, redirectUrl) {
  const contactsApi = getApi();

  await contactsApi.createDoiContact({
    email,
    includeListIds: [listId],
    templateId,
    redirectionUrl: redirectUrl,
  });

  return { success: true };
}
