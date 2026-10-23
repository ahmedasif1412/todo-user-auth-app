const BASE_URL = "http://localhost:1000/api/todos";

export const getTodos = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const addTodo = async (task) => {
  const token = localStorage.getItem("token");

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ task }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const editTodo = async (id, task) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ task }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const toggleTodo = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const removeTodo = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
