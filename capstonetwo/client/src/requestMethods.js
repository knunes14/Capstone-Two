import axios from 'axios';

const BASE_URL = "http://localhost:3000/server/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjgzNDZjYTU3NjgyYWRkZjI4OWJmNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNDE0NTE4MSwiZXhwIjoxNzE0NDA0MzgxfQ.5xchx9XcauZOEf2LWjrYJZ2yf2hQb_JvcCY_ZqoTbc0";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: "Bearer ${TOKEN}" }
});
