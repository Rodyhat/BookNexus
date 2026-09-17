import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";

const ConfirmEmail = () => {
    const navigate = useNavigate();

    const [isConfirmed, setIsConfirmed] = useState(false);
    const [message, setMessage] = useState(
        "Please check your email and click the confirmation link to verify your account."
    );

    useEffect(() => {
        const handleConfirmation = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    console.error("Confirmation error:", error);
                    return;
                }

                // No session yet = user is still waiting to click the email
                if (!data?.session?.user) {
                    return;
                }

                // Session exists = email confirmation has completed
                setIsConfirmed(true);
                setMessage("Email confirmed successfully! Redirecting...");

                const redirectTarget =
                    sessionStorage.getItem("borrowRedirect") ||
                    "/user/dashboard";

                sessionStorage.removeItem("borrowRedirect");

                setTimeout(() => {
                    navigate(redirectTarget, { replace: true });
                }, 1000);

            } catch (error) {
                console.error("Confirmation error:", error);
            }
        };

        handleConfirmation();
    }, [navigate]);

    return (
        <div className=" bg-[#F9F9FF] flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-sm border border-indigo-50 p-8  w-full text-center">

                <div className="flex justify-center mb-5">
                    {isConfirmed ? (
                        <FaCheckCircle className="text-5xl text-green-500" />
                    ) : (
                        <FaSpinner className="text-4xl text-primary-container animate-spin" />
                    )}
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    {isConfirmed
                        ? "Email Confirmed!"
                        : "Check Your Email"}
                </h1>

                <p className="text-gray-600 text-sm leading-6">
                    {message}
                </p>
            </div>
        </div>
    );
};

export default ConfirmEmail;