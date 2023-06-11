export const getDummyEvents = async () => {
  return [
    {
      id: "LAS",
      date: "2018-08-04T10:00",
      location: "Las Vegas",
      products: ["1", "3"],
    },
    {
      id: "MAD",
      date: "2022-03-15T14:00",
      location: "Madrid",
      products: ["5", "6"],
    },
  ];
};

export const getDummyProducts = async () => {
  return [
    {
      id: "1",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/800px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg",
      name: "product 1",
      price: "100",
    },
    {
      id: "2",
      imageUrl:
        "https://www.gardendesign.com/pictures/images/675x529Max/site_3/helianthus-yellow-flower-pixabay_11863.jpg",
      name: "product 2",
      price: "200",
    },
    {
      id: "3",
      imageUrl:
        "https://cdn2.stylecraze.com/wp-content/uploads/2013/07/25-Most-Beautiful-Blue-Flowers.jpg",
      name: "product 3",
      price: "300",
    },
    {
      id: "4",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd2_3PLA0Jae2BBJ9y7F6dpBjFrOy1mCXxcA&usqp=CAU",
      name: "product 4",
      price: "400",
    },
  ];
};

export const getDummyUsers = async () => {
  return [
    {
      firstName: "John",
      lastName: "Doe",
      email: "johnDoe@email.com",
      phoneNumber: "0577777777",
      isMember: true,
    },
    {
      firstName: "Quill",
      lastName: "Mark",
      email: "quillMark@email.com",
      phoneNumber: "0522222222",
      isMember: false,
    },
  ];
};

export const getDummyOrders = async () => {
  return [
    {
      eventDate: "2018-08-04T10:00",
      eventLocation: "Las Vegas",
      firstName: "John",
      lastName: "Doe",
      productName: "product 1",
      productPrice: 100,
      quantity: 200,
      paid: 200,
    },
    {
      eventDate: "2022-03-15T14:00",
      eventLocation: "Madrid",
      firstName: "Quill",
      lastName: "Mark",
      productName: "product 2",
      productPrice: 200,
      quantity: 300,
      paid: 600,
    },
  ];
};

export async function updateEvent(id, update) {
  //console.log(updateEvent, update);
}

export async function updateUser(id, update) {
  //console.log(updateUser, update);
}

export async function updateOrder(id, update) {
  //console.log(updateOrder, update);
}

export async function updateProduct(id, update) {
  //console.log(updateProduct, update);
}
