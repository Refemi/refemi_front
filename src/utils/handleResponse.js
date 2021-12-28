export default function handleResponse(response = {}, status = 200) {
  if (response.status !== status) {
    throw response.error;
  } else {
    return response.data;
  }
}
