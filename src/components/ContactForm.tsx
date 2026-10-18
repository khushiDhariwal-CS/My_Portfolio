"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, Send, AlertCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email address"),
  subject: z.string().trim().optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
  hp_field: z.string().max(0).optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      hp_field: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to send message. Please try again.");
      }

      setIsSuccess(true);
      reset();
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || "Failed to deliver message. Please reach out directly via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        className="bg-white rounded-[24px] border border-[#E7DFD2] p-8 sm:p-10 shadow-warm flex flex-col items-start gap-5 animate-fade-in"
        role="status"
        aria-live="polite"
      >
        <div className="w-12 h-12 rounded-full bg-[#EDF3F1] border border-[#8FA9A3]/40 flex items-center justify-center text-[#2A4D45]">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-medium tracking-tight text-[#2B2823] mb-2">
            Message received
          </h3>
          <p className="text-base text-[#6E675D] leading-relaxed">
            Thank you for reaching out. A confirmation has been sent to your email, and I will review your note and reply within 24 to 48 hours.
          </p>
        </div>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-2 text-sm font-medium text-[#2B2823] hover:text-[#B89B7A] transition-colors underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-[24px] border border-[#E7DFD2] p-8 sm:p-10 shadow-warm flex flex-col gap-6"
      noValidate
      aria-label="Contact Khushi Dhariwal"
    >
      {/* Honeypot field (hidden from genuine users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hp_field">Do not fill this field</label>
        <input
          id="hp_field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("hp_field")}
        />
      </div>

      {/* Error alert if sending failed */}
      {errorMessage && (
        <div
          className="p-4 rounded-[14px] bg-[#FAF3F0] border border-[#E8D4CC] flex items-start gap-3 text-sm text-[#8A3A34]"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium">Could not send message</p>
            <p className="text-xs text-[#8A3A34]/90 mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Row: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-name"
            className="text-xs font-semibold uppercase tracking-wider text-[#6E675D]"
          >
            Your Name <span className="text-[#B89B7A]">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="e.g. Alex Morgan"
            disabled={isSubmitting}
            {...register("name")}
            className={`w-full px-4 py-3 rounded-[14px] bg-[#FAF7F2] border text-[#2B2823] placeholder-[#A59D92] text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B89B7A]/40 ${
              errors.name ? "border-red-400 focus:border-red-400" : "border-[#E7DFD2] focus:border-[#B89B7A]"
            }`}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <span id="name-error" className="text-xs text-red-600">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-email"
            className="text-xs font-semibold uppercase tracking-wider text-[#6E675D]"
          >
            Email Address <span className="text-[#B89B7A]">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="alex@example.com"
            disabled={isSubmitting}
            {...register("email")}
            className={`w-full px-4 py-3 rounded-[14px] bg-[#FAF7F2] border text-[#2B2823] placeholder-[#A59D92] text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B89B7A]/40 ${
              errors.email ? "border-red-400 focus:border-red-400" : "border-[#E7DFD2] focus:border-[#B89B7A]"
            }`}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span id="email-error" className="text-xs text-red-600">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      {/* Subject (Optional) */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-subject"
          className="text-xs font-semibold uppercase tracking-wider text-[#6E675D]"
        >
          Subject <span className="text-[#A59D92] text-[11px] font-normal lowercase">(optional)</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          placeholder="e.g. SDE Role / Project Collaboration"
          disabled={isSubmitting}
          {...register("subject")}
          className="w-full px-4 py-3 rounded-[14px] bg-[#FAF7F2] border border-[#E7DFD2] text-[#2B2823] placeholder-[#A59D92] text-sm transition-all focus:bg-white focus:border-[#B89B7A] focus:outline-none focus:ring-2 focus:ring-[#B89B7A]/40"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="text-xs font-semibold uppercase tracking-wider text-[#6E675D]"
        >
          Message <span className="text-[#B89B7A]">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="Tell me about the role, project, or what you'd like to collaborate on..."
          disabled={isSubmitting}
          {...register("message")}
          className={`w-full px-4 py-3 rounded-[14px] bg-[#FAF7F2] border text-[#2B2823] placeholder-[#A59D92] text-sm leading-relaxed transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B89B7A]/40 resize-y ${
            errors.message ? "border-red-400 focus:border-red-400" : "border-[#E7DFD2] focus:border-[#B89B7A]"
          }`}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <span id="message-error" className="text-xs text-red-600">
            {errors.message.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium bg-[#2B2823] text-[#FAF7F2] hover:bg-[#3E3A33] transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#B89B7A]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#B89B7A]" />
              <span>Sending message...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="w-4 h-4 text-[#B89B7A]" />
            </>
          )}
        </button>

        <span className="text-xs text-[#6E675D]">
          Delivered directly to Khushi&apos;s personal inbox
        </span>
      </div>
    </form>
  );
}
