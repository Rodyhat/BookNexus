import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";

const ConfirmEmail = () => {
    const navigate = useNavigate();

    const [isConfirmed, setIsConfirmed] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let subscription;

        const handleConfirmation = async () => {
            try {
                const params = new URLSearchParams(
                    window.location.search
                );

                const code = params.get("code");

                /*
                 * The redirect destination was already saved
                 * by SignUp in sessionStorage.
                 *
                 * Example:
                 * borrowRedirect = /borrow-confirm/OL12345W
                 */

                if (code) {
                    const { error } =
                        await supabase.auth.exchangeCodeForSession(
                            code
                        );

                    if (error) {
                        console.error(
                            "Confirmation error:",
                            error
                        );

                        setError(
                            "We couldn't confirm your email. Please try the confirmation link again."
                        );

                        return;
                    }

                    setIsConfirmed(true);

                    // Remove the confirmation code from URL
                    window.history.replaceState(
                        {},
                        document.title,
                        "/confirm-email"
                    );

                    /*
                     * IMPORTANT:
                     *
                     * Do not remove borrowRedirect here.
                     *
                     * We still need it after the user signs in.
                     */

                    setTimeout(() => {
                        navigate("/signin", {
                            replace: true,
                        });
                    }, 1500);

                    return;
                }

                /*
                 * Handle cases where Supabase completes
                 * authentication through an auth event.
                 */
                const authListener =
                    supabase.auth.onAuthStateChange(
                        (event, session) => {
                            if (
                                event === "SIGNED_IN" &&
                                session?.user
                            ) {
                                setIsConfirmed(true);

                                setTimeout(() => {
                                    navigate("/signin", {
                                        replace: true,
                                    });
                                }, 1500);
                            }
                        }
                    );

                subscription =
                    authListener.data.subscription;
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

        return () => {
            subscription?.unsubscribe();
        };
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
                            : "Check Your Email"}
                </h1>

                <p className="text-gray-600 text-sm leading-6">
                    {error
                        ? error
                        : isConfirmed
                            ? "Your email has been confirmed. Redirecting you to sign in..."
                            : "Please check your email and click the confirmation link to verify your account."}
                </p>
            </div>
        </div>
    );
};

export default ConfirmEmail;