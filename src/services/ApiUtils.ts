export function handleResponse(response: any) {
  return response.data;
}

export function handleError(error: any) {
  console.log(error);
  if (error.response?.data?.error) {
    throw new Error(error.response.data.error.message);
  }

  throw new Error(
    'Unable to perform this action, if the problem persists please raise a ticket on the Service Desk',
  );
}
