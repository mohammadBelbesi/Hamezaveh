export const eventsColumns = [
  { header: "תאריך", accessor: "date", type: "datetime-local" },
  { header: "מקום", accessor: "location", type: "location" },
];

export const usersColumns = [
  { header: "שם פרטי", accessor: "firstname", type: "text" },
  { header: "שם משפחה", accessor: "lastname", type: "text" },
  { header: "אמייל", accessor: "email", type: "text" },
  { header: "מספר נייד", accessor: "phone", type: "text" },
  { header: "חבר מועדון", accessor: "isMember", type: "checkBox" },
];

export const productsColumns = [
  { header: "שם", accessor: "name", type: "text" },
  { header: "מחיר של 100 גרם", accessor: "price", type: "number" },
  { header: "תמונה", accessor: "imageUrl", type: "imageDrop" },
];

// export const ordersColumns = [
//   { header: "Product Name", accessor: "productName", type: "text" },
//   { header: "Quantity", accessor: "quantity", type: "number" },
// ];

export const ordersColumns = [
  // { header: "Date", accessor: "eventDate", type: "datetime-local" },
  // { header: "Location", accessor: "eventLocation", type: "text" },
  // { header: "First Name", accessor: "firstName", type: "text" },
  // { header: "Last Name", accessor: "lastName", type: "text" },
  { header: "שם מוצר", accessor: "productName", type: "text" },
  // { header: "Product Price", accessor: "productPrice", type: "number" },
  // { header: "Paid", accessor: "paid", type: "number" },
  { header: "כמות", accessor: "quantity", type: "number" },
];

export const flattenedOrdersColumns = [
  // { header: "Date", accessor: "eventDate", type: "datetime-local" },
  // { header: "Location", accessor: "eventLocation", type: "text" },
  // { header: "First Name", accessor: "firstName", type: "text" },
  // { header: "Last Name", accessor: "lastName", type: "text" },
  { header: "Product Name", accessor: "productName", type: "text" },
  // { header: "Product Price", accessor: "productPrice", type: "number" },
  // { header: "Paid", accessor: "paid", type: "number" },
  { header: "Quantity", accessor: "quantity", type: "number" },
];
