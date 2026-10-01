import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "../services/supabase";
import { FaCheckCircle, FaSpinner, FaEnvelope } from "react-icons/fa";
import { consumeRedirect } from "../utils/borrowRedirect";

const ConfirmEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const registeredEmail = location.state?.registeredEmail;

    // "inbox" = just signed up, waiting for the user to click the email link
    const [status, setStatus] = useState(registeredEmail ? "inbox" : "loading");

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

    const views = {
        loading: {
            icon: <FaSpinner className="text-4xl text-primary animate-spin" />,
            title: "Confirming Email...",
            text: "Please wait while we confirm your email.",
        },
        inbox: {
            icon: <FaEnvelope className="text-4xl text-primary" />,
            title: "Check your inbox",
            text: `We sent a confirmation link to ${registeredEmail}. Click it to activate your account.`,
        },
        confirmed: {
            icon: <FaCheckCircle className="text-5xl text-green-500" />,
            title: "Email Confirmed!",
            text: "Taking you back now...",
        },
        error: {
            icon: <div className="text-4xl text-red-500">!</div>,
            title: "Confirmation Failed",
            text: "This link is invalid, expired, or was opened in a different browser. Try signing in; if your email is already confirmed it will work.",
        },
    };

    const v = views[status];

    return (
        <div className="bg-[#F9F9FF] flex items-center justify-center px-4 font-sora">
            <div className="bg-white rounded-2xl shadow-sm border border-indigo-50 p-8 w-full max-w-md text-center">
                <div className="flex justify-center mb-5">{v.icon}</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">{v.title}</h1>
                <p className="text-gray-600 text-sm leading-6">{v.text}</p>
                {status === "error" && (
                    <Link to="/signin" className="inline-block mt-5 text-primary font-semibold text-sm">
                        Go to Sign In
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ConfirmEmail;