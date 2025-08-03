const API_BASE = 'http://localhost:5000/api/rental';

export const createRental = async (rentalData) => {
  const res = await fetch(`${API_BASE}/create-rental`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rentalData),
  });
  return res.json();
};

export const getRentalById = async (id) => {
  const res = await fetch(`${API_BASE}/get-rental/${id}`);
  return res.json();
};

export const getUserRentals = async (userId) => {
  const res = await fetch(`${API_BASE}/get-user-rentals/${userId}`);
  return res.json();
};

export const updateRentalStatus = async (id, newStatus) => {
  const res = await fetch(`${API_BASE}/update-rental-status/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  });
  return res.json();
};

export const cancelRental = async (id) => {
  const res = await fetch(`${API_BASE}/cancel-rental/${id}`, {
    method: 'PATCH',
  });
  return res.json();
};
