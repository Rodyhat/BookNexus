import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";

const ConfirmEmail = () => {
    const navigate = useNavigate();

    const [isConfirmed, setIsConfirmed] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const handleConfirmation = async () => {
            try {
                const params = new URLSearchParams(
                    window.location.search
                );

                const code = params.get("code");

                /*
                 * The borrow destination is already stored
                 * before the user leaves the signup page.
                 *
                 * Example:
                 * /borrow-confirm/123
                 */
                const redirectTarget =
                    sessionStorage.getItem(
                        "borrowRedirect"
                    );

                console.log(
                    "Saved borrow redirect:",
                    redirectTarget
                );

                if (!code) {
                    setError(
                        "No confirmation code was found."
                    );
                    return;
                }

                const { error: exchangeError } =
                    await supabase.auth.exchangeCodeForSession(
                        code
                    );

                if (exchangeError) {
                    console.error(
                        "Confirmation error:",
                        exchangeError
                    );

                    setError(
                        "We couldn't confirm your email. Please try the confirmation link again."
                    );

                    return;
                }

                setIsConfirmed(true);

                /*
                 * Remove the confirmation code from
                 * the browser URL.
                 */
                window.history.replaceState(
                    {},
                    document.title,
                    "/confirm-email"
                );

                /*
                 * IMPORTANT:
                 *
                 * Do NOT remove borrowRedirect here.
                 *
                 * SignIn will use it after the user logs in.
                 */
                setTimeout(() => {
                    navigate("/signin", {
                        replace: true,
                        state: {
                            from: redirectTarget,
                        },
                    });
                }, 1500);
            } catch (err) {
                console.error(
                    "Confirmation error:",
                    err
                );

                setError(
                    "Something went wrong while confirming your email."
                );
            }
        };

        handleConfirmation();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-[#F9F9FF] flex items-center justify-center px-4 font-sora">
            <div className="bg-white rounded-2xl shadow-sm border border-indigo-50 p-8 w-full max-w-md text-center">

                <div className="flex justify-center mb-5">
                    {error ? (
                        <div className="text-4xl text-red-500">
                            !
                        </div>
                    ) : isConfirmed ? (
                        <FaCheckCircle className="text-5xl text-green-500" />
                    ) : (
                        <FaSpinner className="text-4xl text-primary animate-spin" />
                    )}
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    {error
                        ? "Confirmation Failed"
                        : isConfirmed
                            ? "Email Confirmed!"
                            : "Confirming Email..."}
                </h1>

                <p className="text-gray-600 text-sm leading-6">
                    {error
                        ? error
                        : isConfirmed
                            ? "Your email has been confirmed. Redirecting you to sign in..."
                            : "Please wait while we confirm your email."}
                </p>
            </div>
        </div>
    );
};

export default ConfirmEmail;