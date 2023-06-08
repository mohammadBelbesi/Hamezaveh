export const eventsColumns = [
  { header: "Date", accessor: "date", type: "datetime-local" },
  { header: "Location", accessor: "location", type: "location" },
];

export const usersColumns = [
  { header: "First Name", accessor: "firstname", type: "text" },
  { header: "Last Name", accessor: "lastname", type: "text" },
  { header: "Email", accessor: "email", type: "text" },
  { header: "Phone Number", accessor: "phone", type: "text" },
  { header: "Membership", accessor: "isMember", type: "checkBox" },
];

export const productsColumns = [
  { header: "Name", accessor: "name", type: "text" },
  { header: "Price", accessor: "price", type: "number" },
  { header: "Image", accessor: "imageUrl", type: "imageDrop" },
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
  { header: "Product Name", accessor: "productName", type: "text" },
  // { header: "Product Price", accessor: "productPrice", type: "number" },
  // { header: "Paid", accessor: "paid", type: "number" },
  { header: "Quantity", accessor: "quantity", type: "number" },
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
