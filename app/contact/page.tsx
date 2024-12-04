"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

export default function Contact() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e: React.FormEvent<EventTarget>) => {
        const { name, value } = e.target as HTMLInputElement;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
        const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
        const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

        try {
            const res = await emailjs.send(
                serviceID,
                templateID,
                {
                    from_name: values.name,
                    reply_to: values.email,
                    message: values.message,
                },
                userID,
            );

            if (res.status === 200) {
                toast.success("Message sent successfully!");
                setValues({
                    name: "",
                    email: "",
                    message: "",
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to send message. Please try again later.");
        }
    };

    return (
        <div>
            <h1 className="text-3xl">Contact Me</h1>

            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex flex-row">
                    <label>Your Name:</label>
                    <input type="text" name="name" value={values.name} onChange={handleChange} required />
                    <label>Your Email:</label>
                    <input type="email" name="email" value={values.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Your Message:</label>
                    <textarea name="message" value={values.message} onChange={handleChange} required />
                </div>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}
