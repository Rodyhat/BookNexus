import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "../services/supabase";
import { FaCheckCircle, FaSpinner, FaEnvelope } from "react-icons/fa";
import { consumeRedirect } from "../utils/borrowRedirect";

const ConfirmEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const registeredEmail = location.state?.registeredEmail;

    const [status, setStatus] = useState(registeredEmail ? "inbox" : "loading");
    const [isResending, setIsResending] = useState(false);
    const [resendMessage, setResendMessage] = useState("");

    useEffect(() => {
        if (registeredEmail) return;

        let timer;
        let cancelled = false;

        const finish = async () => {
            // supabase-js already processes the code/hash in the URL;
            // getSession() waits for that to finish.
            const { data, error } = await supabase.auth.getSession();
            if (cancelled) return;

            if (error || !data.session) {
                setStatus("error");
                return;
            }

            window.history.replaceState({}, document.title, "/confirm-email");
            setStatus("confirmed");

            timer = setTimeout(() => {
                const redirectTarget = consumeRedirect();

                console.log("Borrow redirect:", redirectTarget);

                navigate(redirectTarget || "/user/dashboard", {
                    replace: true,
                });
            }, 1200);
        };

        finish();
        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [navigate, registeredEmail]);

    const handleResend = async () => {
        setIsResending(true);
        setResendMessage("");

        try {
            const { error } = await supabase.auth.resend({
                type: "signup",
                email: registeredEmail,
                options: {
                    emailRedirectTo: `${window.location.origin}/confirm-email`,
                },
            });

            if (error) throw error;

            setResendMessage("A new confirmation link was requested. Check your inbox and spam folder.");
        } catch (error) {
            setResendMessage(error.message || "Could not resend the confirmation email. Please try again.");
        } finally {
            setIsResending(false);
        }
    };

    const views = {
        loading: {
            icon: <FaSpinner className="text-2xl text-primary animate-spin" />,
            title: "Confirming Email...",
            text: "Please wait while we confirm your email.",
        },
        inbox: {
            icon: <FaEnvelope className="text-2xl text-primary" />,
            title: "One last step",
            text: "Confirm your email address to activate your BookNexus account.",
        },
        confirmed: {
            icon: <FaCheckCircle className="text-2xl text-emerald-600" />,
            title: "Email Confirmed!",
            text: "Taking you back now...",
        },
        error: {
            icon: <div className="text-2xl font-bold text-red-600">!</div>,
            title: "Confirmation Failed",
            text: "This link is invalid, expired, or was opened in a different browser. Try signing in; if your email is already confirmed it will work.",
        },
    };

    const v = views[status];

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sora text-slate-800">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-5 py-4 sm:px-8">
                    <img src="/logo.png" alt="" className="h-10 w-10 object-contain" />
                    <span className="text-lg font-bold text-primary-container">BookNexus</span>
                </div>
            </header>

            <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
                <div className="grid w-full max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">
                    <section className="flex flex-col justify-center bg-[#F1F3FF] p-8 sm:p-12">
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-indigo-100 bg-white">
                            {v.icon}
                        </div>
                        <h1 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">{v.title}</h1>
                        <p className="max-w-md text-sm leading-6 text-slate-600">{v.text}</p>
                    </section>

                    <section className="flex flex-col justify-center p-8 sm:p-12">
                        {status === "inbox" && (
                            <>
                                <p className="mb-2 text-sm font-semibold text-slate-800">Confirmation email requested for</p>
                                <p className="mb-5 break-all text-base text-primary-container">{registeredEmail}</p>
                                <p className="mb-6 text-sm leading-6 text-slate-600">
                                    It may take a few minutes. Check your spam or junk folder too.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={isResending}
                                    className="w-full rounded-md bg-primary-container px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
                                >
                                    {isResending ? "Sending..." : "Resend confirmation email"}
                                </button>
                                {resendMessage && (
                                    <p role="status" className="mt-4 text-sm leading-6 text-slate-600">
                                        {resendMessage}
                                    </p>
                                )}
                            </>
                        )}

                        {status === "error" && (
                            <Link to="/signin" className="text-sm font-semibold text-primary-container underline underline-offset-4">
                                Go to Sign In
                            </Link>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default ConfirmEmail;