import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { cartCover } from '../assets/assetsindex';
import CartItem from '../components/CartItem';

const Cart = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const [totalAmt, setTotalAmt] = useState(0);

  useEffect(() => {
    let totalPrice = 0;
    productData.forEach((item) => {
      totalPrice += (item.PriceProduct * item.QuantityOfProduct)/100;
    });
    setTotalAmt(totalPrice);
  }, [productData]);

  return (
    <div>
      <img className='w-screen h-cartPage object-cover' src={cartCover} alt='cartCover' />
      <div className='max-w-screen-xl mx-auto py-20 flex'>
        <CartItem />
        <div className='w-1/3 bg-[#fafafa] py-6 px-4'>
          <div className='flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6'>
            <h2 className='text-2xl font-medium'>סכום העגלה</h2>
            <p className='flex items-center gap-4 text-base'>
              סכום{' '}
              <span className='font-titleFont font-bold text-lg'>
                {totalAmt} ₪
              </span>
            </p>
          </div>
          <p className='font-titleFont font-semibold flex justify-between mt-6'>
            הסכום הסופי
            <span className='text-xl font-bold'>{totalAmt} ₪</span>
          </p>
          <button onClick={() => pay(totalAmt)} className='text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300'>
            עבור לתשלום
          </button>
        </div>
      </div>
    </div>
  );
};

function pay(a) {
  const url = "https://app.sumit.co.il/billing/payments/beginredirect/"; // Replace with your desired URL
  const body = {
      "Customer": {
          "ExternalIdentifier": null,
          "NoVAT": null,
          "SearchMode": 0,
          "Name": "Danny Dean",
          "Phone": null,
          "EmailAddress": null,
          "City": null,
          "Address": null,
          "ZipCode": null,
          "CompanyNumber": null,
          "ID": null,
          "Folder": null
      },
      "Items": [
          {
              "Item": {
                  "ID": null,
                  "Name": null,
                  "Description": null,
                  "Price": null,
                  "Currency": null,
                  "Cost": null,
                  "ExternalIdentifier": null,
                  "SKU": null,
                  "SearchMode": null
              },
              "Quantity": 1,
              "UnitPrice":a,
              "Total": null,
              "Currency": null,
              "Description": null
          }
      ],
      "VATIncluded": true,
      "DocumentType": null,
      "RedirectURL": "https://www.google.com",
      "CancelRedirectURL": null,
      "ExternalIdentifier": null,
      "MaximumPayments": null,
      "SendUpdateByEmailAddress": null,
      "ExpirationHours": null,
      "Theme": null,
      "Language": null,
      "Header": null,
      "UpdateOrganizationOnSuccess": null,
      "UpdateOrganizationOnFailure": null,
      "UpdateCustomerOnSuccess": null,
      "DocumentDescription": null,
      "DraftDocument": null,
      "AutomaticallyRedirectToProviderPaymentPage": null,
      "IPNURL": null,
      "Credentials": {
          "CompanyID": 61294932,
          "APIKey": "Gy2gopJM25FoBIRImOQCyUgJO5gp6ONTNwskd4TynjKPjKkTTb"
      },
      "ResponseLanguage": null
  };

  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(data => {
      console.log(data); // Do something with the response data
      const redirectUrl = data.Data.RedirectURL;
    console.log(redirectUrl)
   window.open(redirectUrl, "_blank");
      
  })
  .catch(error => {
      console.error('Error:', error);
  });
}
export default Cart;
