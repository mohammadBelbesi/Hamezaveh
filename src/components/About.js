import React from "react";
// import { Button } from "react-bootstrap";
// import { useNavigate } from "react-router";
import myPhoto from "../photo/img.jpeg";

const About = () => {
  // const navigate = useNavigate();
  // const handleLogout = async () => {
  //   try {
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <>
     <div className="">
      <div className="con"  >
        <p>
          "המזווה נועד לייצר אלטרנטיבה צרכנית ירושלמית - מאפשר צרכנות שלוקחת בחשבון שיקולים סביבתיים, חברתיים וכלכליים, תוך יצירת קולקטיב קהילתי ושותפויות"
        </p>
        <img src={myPhoto} alt="" className="profile-picture" />
        </div>
        <p className="intro" >

          
         <strong> ברוכים/ות הבאות/ים למזווה! </strong>
          <br />
          <br />
        
          <strong>מה זה "המזווה"</strong>
          <br />
          <br />
          קולקטיב ירושלמי שמנגיש אורח חיים סביבתי, בריא, מקיים וקהילתי!
          המזווה מקדם צרכנות חברתית מקומית בשאיפה לאפס פסולת.
          <br />
          <br />
          <strong>איך זה עובד</strong>
          <br />
          נפגשות אחת לכמה שבועות באירועים שונים בירושלים, בהן המזווה פותח חנות פופאפ למכירת קטניות ומוצרים יבשים.
          באים מהבית עם כלים רב פעמיים ורוכשים במחיר חברתי ובמינימום פוסלת.
          <br />
          <br />
          <strong>מי אנחנו?</strong>
          <br />
          אנחנו זה אתם/ן!
          פעילות המזווה מבוססת על מתנדבים ומתנדבות שביחד מפעילות את הקולטקטיב.
          מוזמנים/ות להיות חלק: לקנות יבשים / לתנדב באירועים / להיות חלק מהקהילה 💜
          <br /><br />
          <strong> על העמותות שמפעילות את המזווה</strong>
            <br/>
          <a  href="https://jsy.org.il/" target="_blank" rel="noopener noreferrer"   className="link-text rounded-sm group hover:text-black hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-500">
            הישיבה החילונית
          </a>
          <br />
          <a   href="https://www.tevaivri.org.il/" target="_blank" rel="noopener noreferrer"   className="link-text rounded-sm group hover:text-black hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-500 ">
          טבע עברי- בר קיימא
          </a>
        </p>
        
      </div>
      <style>
        {`
        .underline-on-hover:hover {
          text-decoration: underline;
        }
        `}
      </style>
      <br/>
      {/* <div className="button-container">
        <div className="d-grid gap-2">
          <Button variant="primary" className="butreturn" onClick={handleLogout}>
            חזור
          </Button>
        </div>
      </div> */}
     
    </>
  );
};

export default About;

