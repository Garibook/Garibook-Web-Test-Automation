export function generatePickupAndReturnDates() {
  const now = new Date();

  // Pickup = tomorrow
  const pickup = new Date(now);
  pickup.setDate(now.getDate() + 1);
  pickup.setHours(9, 0, 0, 0); // 09:00 AM

  // Return = 2 days after today
  const drop = new Date(now);
  drop.setDate(now.getDate() + 2);
  drop.setHours(9, 0, 0, 0); // 09:00 AM

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12
    hours = String(hours).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
  }

  return {
    pickupDate: formatDate(pickup),
    returnDate: formatDate(drop),
  };
}
