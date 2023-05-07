import React, { useEffect, useState } from "react";
import anime from "animejs";
import { Button } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import './payment.scss';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti'

export default function Payment() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [cardNumber, setCardNumber] = useState("0000 0000 0000 0000");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardExpirationDate, setCardExpirationDate] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [cardType, setCardType] = useState("");
const navigate = useNavigate();
 
    const CandidatePayment = () => {
      axios.post(`http://localhost:4000/CandidatePayment/${sessionStorage.getItem("uid")}`).then((response) => {
        console.log(response.data);
        alert(response.data.message);
        navigate("../User/ViewElection")
  
      });
    };
  

  const flipCard = () => {
    anime({
      targets: ".credit-card-inner",
      rotateY: "180deg",
      duration: "100",
      easing: "linear",
    });
  };
  const unFlipCard = () => {
    anime({
      targets: ".credit-card-inner",
      rotateY: "360deg",
      duration: "100",
      easing: "linear",
    });
  };
  const setNumber = (e) => {
    const cardNumber = e.target.value;
    setCardNumber(cardNumber);
    if (cardNumber[0] === "4") {
      setCardType("Visa");
    } else if (checkSubstring(4, "6011")) {
      setCardType("Discover");
    } else if (checkSubstring(2, "51")) {
      setCardType("MasterCard");
    } else if (checkSubstring(2, "34")) {
      setCardType("American Express");
    } else if (checkSubstring(3, "300")) {
      setCardType("Diners Club");
    } else if (checkSubstring(2, "35")) {
      setCardType("JCB");
    } else {
      setCardType("");
    }
  };

  const checkSubstring = (length, match) => {
    return cardNumber.substring(0, length) === match;
  };

  const setName = (e) => {
    const cardHolderName = e.target.value.toUpperCase();
    setCardHolderName(cardHolderName);
  };
  const setDate = (e) => {
    let data = e.target.value.split("");
    let cardExpirationDate = data
      .map((x) => {
        return x === "-" ? "/" : x;
      })
      .join("");
    setCardExpirationDate(cardExpirationDate);
  };
  const setCVV = (e) => {
    const cardCVV = e.target.value;
    setCardCVV(cardCVV);
  };



  return (
    <div className="paymentcontainer">
      {
        showConfetti && <Confetti
          width={width}
          height={height}
        />
      }
      <div className="credit-card">
        <div className="credit-card-inner">
          <div className="credit-card-front">
            <div id="card-type">{cardType}</div>
            <div id="card-number">{cardNumber}</div>

            <div id="card-expiration">
              {cardExpirationDate !== "" && (
                <div id="validthru">Valid Thru</div>
              )}
              {cardExpirationDate}
            </div>
<div id="card-holder-name">{cardHolderName}</div>
          </div>
          <div className="credit-card-back">
            <div className="card-stripe" />
            <div className="card-sig-container">
              <div className="signature">{cardHolderName}</div>
              CVC {cardCVV}
            </div>
            <p className="credits">
              Built with Cleave.js, Anime.js, and React Icons By Suraj K S.
            </p>
          </div>
        </div>
      </div>
      <form className="card-form">
        <label className="input-label">Credit Card Number</label>
        <input
          placeholder="Enter your credit card number"
          options={{ creditCard: true }}
          id="number-input"
          name="number-input"
          className="text-input"
          maxLength="16"
          onChange={setNumber}
        />
        <label className="input-label">Card Holder Name</label>
        <input
          type="text"
          placeholder="Enter card holder name"
          value={cardHolderName}
          onChange={(e) => setName(e)}
          className="text-input"
          maxLength="30"
        />
        <div className="date-and-csv" style={{ display: "flex" }}>
          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <label className="input-label">Expiration Date</label>
            <input
              type="month"
              placeholder="Enter expiration date"
              className="text-input"
              onChange={(e) => setDate(e)}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <label className="input-label">CVC Security Code</label>
            <input
              options={{
                numeral: "true",
              }}
              placeholder="Enter CVC"
              maxLength="3"
              value={cardCVV}
              className="text-input"
              onChange={(e) => setCVV(e)}
              onFocus={flipCard}
              onBlur={unFlipCard}
            />
          </div>
        </div>
      </form>
      <div>
        <Button className="pay_btn" onClick={()=>{CandidatePayment()}}>
          Click to Pay
          <PaymentIcon />
        </Button>
      </div>
    </div>
  );
}



