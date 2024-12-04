"use client";
import { VscSend } from "react-icons/vsc";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [notification, setNotification] = useState({ success: "", error: "" });

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

        if (values.name === "" || values.email === "" || values.message === "") {
            setNotification({ ...notification, error: "Failed to send message. Please try again later." });
            setTimeout(() => {
                setNotification({ ...notification, error: "" });
            }, 5000);
            return;
        }

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
                setNotification({ ...notification, success: "Message sent successfully!" });
                setTimeout(() => {
                    setNotification({ ...notification, success: "" });
                }, 5000);
                setValues({
                    name: "",
                    email: "",
                    message: "",
                });
            }
        } catch (error) {
            console.log(error);
            setNotification({ ...notification, error: "Failed to send message. Please try again later." });
            setTimeout(() => {
                setNotification({ ...notification, error: "" });
            }, 5000);
        }
    };
    return (
        <section className="w-full">
            <div className="container">
                <div className="max-w-full space-y-6">
                    <div className="space-y-1">
                        <h2 className="title text-2xl sm:text-2xl">Contact Me</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4 text-left">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1">
                                <Label htmlFor="name" className="ml-0.5">
                                    Name
                                </Label>
                                <Input
                                    name="name"
                                    id="name"
                                    placeholder="Your name"
                                    value={values.name}
                                    onChange={handleChange}
                                    className="shadow"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email" className="ml-0.5">
                                    Email
                                </Label>
                                <Input
                                    name="email"
                                    id="email"
                                    type="email"
                                    placeholder="Your email"
                                    value={values.email}
                                    onChange={handleChange}
                                    className="shadow"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="message" className="ml-0.5">
                                Message
                            </Label>
                            <Textarea
                                name="message"
                                id="message"
                                placeholder="Have a project in mind? Let's discuss how I can help."
                                rows={4}
                                value={values.message}
                                onChange={handleChange}
                                className="shadow"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <Button type="submit" className="w-full sm:w-auto">
                                Send Message
                                <VscSend />
                            </Button>
                            <p className={`mx-auto my-auto text-green-700 ${notification.success ? "" : "hidden"}`}>
                                <FaRegCheckCircle className="mr-2 mx-auto my-auto" />
                                {notification.success}
                            </p>
                            <p className={`flex mx-auto my-auto text-red-700 ${notification.error ? "" : "hidden"}`}>
                                <MdErrorOutline className="mr-2 mx-auto my-auto" />
                                {notification.error}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
