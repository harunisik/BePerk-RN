export function handleResponse(response: any) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(response);
}

export function handleError(error: any) {
  if (error.response?.data?.error) {
    throw new Error(error.response.data.error.message);
  }

  throw new Error(
    'Unable to perform this action, if the problem persists please raise a ticket on the Service Desk',
  );
}
