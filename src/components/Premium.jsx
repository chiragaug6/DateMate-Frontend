import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import PropTypes from 'prop-types';

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    checkUserPremiumStatus();
  }, []);

  const checkUserPremiumStatus = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/payment/verify`, {
        withCredentials: true,
      });

      if (res?.data?.data?.isPremium) {
        setIsUserPremium(true);
      }
    } catch (error) {
      console.error("Failed to verify premium status:", error);
      setErrorMessage(
        "Failed to verify premium status. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleBuyMembership = async (membershipType) => {
    setErrorMessage("");
    try {
      const response = await axios.post(
        `${BASE_URL}/payment/create`,
        { membershipType },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = response.data.data;

      if (!window.Razorpay) {
        setErrorMessage("Payment gateway not loaded. Please refresh the page.");
        return;
      }

      const razorpayOptions = {
        key: keyId,
        amount,
        currency,
        name: "CodeMate",
        description: `Get ${membershipType} membership`,
        order_id: orderId,
        prefill: {
          name: `${notes.firstName} ${notes.lastName}`,
          email: notes.emailId,
          contact: notes.contact || "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: checkUserPremiumStatus,
      };

      const rzp = new window.Razorpay(razorpayOptions);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
      setErrorMessage("Something went wrong during payment. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="m-10 flex justify-center items-center text-lg">
        Loading your membership status...
      </div>
    );
  }

  if (isUserPremium) {
    return (
      <div className="m-10 text-xl font-semibold text-green-600">
        You are already a premium user!
      </div>
    );
  }

  return (
    <div className="m-10">
      {errorMessage && (
        <div className="mb-4 text-red-600 font-medium">{errorMessage}</div>
      )}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Silver Membership Card */}
        <MembershipCard
          type="Silver"
          features={[
            "Chat with other people",
            "100 connection requests per day",
            "Blue Tick",
            "3 months validity",
          ]}
          onClick={() => handleBuyMembership("silver")}
          buttonClass="btn-secondary"
        />

        <div className="divider lg:divider-horizontal">OR</div>

        {/* Gold Membership Card */}
        <MembershipCard
          type="Gold"
          features={[
            "Chat with other people",
            "Unlimited connection requests per day",
            "Blue Tick",
            "6 months validity",
          ]}
          onClick={() => handleBuyMembership("gold")}
          buttonClass="btn-primary"
        />
      </div>
    </div>
  );
};

const MembershipCard = ({ type, features, onClick, buttonClass }) => (
  <div className="card bg-base-300 rounded-box w-full lg:w-1/2 p-6 shadow-xl">
    <h2 className="font-bold text-3xl mb-4 text-center">{type} Membership</h2>
    <ul className="list-disc list-inside mb-4">
      {features && features.map((feature, idx) => (
        <li key={idx}>{feature}</li>
      ))}
    </ul>
    <div className="flex justify-center">
      <button onClick={onClick} className={`btn ${buttonClass}`}>
        Buy {type}
      </button>
    </div>
  </div>
);

MembershipCard.propTypes = {
  type: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  buttonClass: PropTypes.string
};

export default Premium;
