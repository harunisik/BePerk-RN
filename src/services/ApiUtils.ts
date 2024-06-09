import {printJSON} from '../utils/TestUtil';

export function handleResponse(response: any) {
  return response.data;
}

export function handleError(error: any) {
  // printJSON(error);
  if (error.response?.data?.error) {
    throw new Error(error.response.data.error);
  }

  console.error(
    'handleError: ',
    error.message,
    error.name,
    error.code,
    error.status,
  );

  throw new Error(
    'Unable to perform this action, if the problem persists please raise a ticket on the Service Desk',
  );
}
