import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";

const PaymentForm = ({
  selectedEmployee,
  setShowModal,
  setSelectedEmployee,
}) => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const queryClient = useQueryClient();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handlePayment = async (data) => {
    const amount = parseInt(data.salary) * 100;

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    setIsLoading(true);

    // Step-1: Validate the card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error);
      setIsLoading(false);
      return;
    }

    try {
      // Step-2: Create payment intent
      const response = await axiosSecure.post("/create-payment-intent", {
        amount,
      });

      const clientSecret = response.data.clientSecret;

      // Step-3: Confirm payment
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: selectedEmployee.name,
            email: selectedEmployee.email,
          },
        },
      });

      if (paymentResult.error) {
        setIsLoading(false);
        return Swal.fire(
          "Payment Failed",
          paymentResult.error.message,
          "error"
        );
      }

      // Step-4: Store record
      if (paymentResult.paymentIntent.status === "succeeded") {
        const paymentData = {
          employeeId: selectedEmployee._id,
          name: selectedEmployee.name,
          email: selectedEmployee.email,
          salary: parseInt(data.salary),
          month: data.month,
          year: data.year,
          paymentStatus: "pending",
          requestedAt: new Date().toISOString(),
          paymentMethodId: paymentMethod.id,
          transactionId: paymentResult.paymentIntent.id,
        };

        await axiosSecure.post("/payment", paymentData);
        queryClient.invalidateQueries(["payments"]);

        Swal.fire({
          icon: "success",
          title: "Payment request created",
          text: "Salary payment request has been sent to the admin for approval.",
          confirmButtonColor: "#1a237e",
        });

        setShowModal(false);
        setSelectedEmployee(null);
        reset();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Payment failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-box w-full max-w-md p-6 rounded-lg">
      <form onSubmit={handleSubmit(handlePayment)} className="space-y-4">
        <h3 className="font-bold text-lg mb-4">
          Pay <span className="text-secondary">{selectedEmployee.name}</span>
        </h3>

        <input
          type="text"
          readOnly
          defaultValue={selectedEmployee.salary}
          className="input input-bordered w-full cursor-not-allowed"
          {...register("salary")}
        />

        <input
          type="text"
          placeholder="Enter month (e.g., July)"
          className="input input-bordered w-full"
          {...register("month", {
            required: true,
            validate: (value) => {
              const numeric = !isNaN(value) && +value >= 1 && +value <= 12;
              const textMonth = new Date(`${value} 1, 2025`).getMonth() >= 0;
              return numeric || textMonth || "Invalid month";
            },
          })}
        />
        {errors.month && (
          <p className="text-red-500 text-sm">Month is required</p>
        )}

        <input
          type="number"
          placeholder="Enter year (e.g., 2025)"
          className="input input-bordered w-full"
          {...register("year", {
            required: true,
            min: { value: 1900, message: "Year must be >= 1900" },
            max: { value: 2099, message: "Year must be <= 2099" },
            validate: (value) =>
              /^\d{4}$/.test(value) || "Must be a 4-digit year",
          })}
        />
        {errors.year && (
          <p className="text-red-500 text-sm">Year is required</p>
        )}

        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": {
                  color: "#a0aec0",
                },
              },
              invalid: {
                color: "#e53e3e",
              },
            },
          }}
          className="p-3 border rounded-md"
        />

        {error && <p className="text-red-500 text-center">{error.message}</p>}

        <div className="modal-action flex-col">
          <button
            type="submit"
            className="btn btn-primary text-white w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner text-secondary"></span>
            ) : (
              "Pay"
            )}
          </button>

          <button
            type="button"
            className="btn w-full"
            onClick={() => {
              setShowModal(false);
              setSelectedEmployee(null);
              reset();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
