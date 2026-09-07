"use client";
import { useState } from "react";
import { Input, Textarea, Label, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data";

export function HireForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    // fold hire-specific fields into message so /api/leads schema stays unchanged
    const { engagement, timeline, ...rest } = raw;
    const payload = {
      ...rest,
      message: `Engagement: ${engagement || "Not specified"} | Start: ${timeline || "Not specified"}\n\n${raw.message || ""}`.trim(),
    };
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setSuccess(true);
      form.reset();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center">
        <div className="text-2xl">🎉</div>
        <h3 className="mt-2 font-bold text-[#0B1F33]">Hire request received!</h3>
        <p className="mt-1 text-sm text-[#5B6B80]">Our team will review your hiring needs and contact you within 1 business day with matched talent options.</p>
        <Button variant="secondary" className="mt-4" onClick={() => setSuccess(false)}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Full Name *</Label>
          <Input name="fullName" required placeholder="Dr. Jane Doe" />
        </div>
        <div>
          <Label>Organization</Label>
          <Input name="organization" placeholder="Nairobi Medical Centre" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Work Email *</Label>
          <Input name="email" type="email" required placeholder="jane@clinic.com" />
        </div>
        <div>
          <Label>Phone / WhatsApp</Label>
          <Input name="phone" placeholder="+1 555 000 1234" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Country</Label>
          <Select name="country" defaultValue="">
            <option value="">Select country</option>
            <option>Kenya</option>
            <option>Uganda</option>
            <option>Tanzania</option>
            <option>Rwanda</option>
            <option>United Kingdom</option>
            <option>United States</option>
            <option>Australia</option>
            <option>Other</option>
          </Select>
        </div>
        <div>
          <Label>Healthcare Organization Type</Label>
          <Select name="orgType" defaultValue="">
            <option value="">Select type</option>
            <option>Private Hospital</option>
            <option>Clinic / Medical Centre</option>
            <option>Dental Clinic</option>
            <option>Pharmacy</option>
            <option>Laboratory</option>
            <option>Telehealth / Startup</option>
            <option>Other</option>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Roles to Hire</Label>
          <Select name="servicesRequired" defaultValue="">
            <option value="">Select role</option>
            {services.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
            <option>Multiple / Custom team</option>
          </Select>
        </div>
        <div>
          <Label>Number of Staff Needed</Label>
          <Select name="numberOfStaff" defaultValue="">
            <option value="">Select</option>
            <option>1 (part-time)</option>
            <option>1 (full-time)</option>
            <option>2-3</option>
            <option>4-10</option>
            <option>10+</option>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Engagement Model</Label>
          <Select name="engagement" defaultValue="">
            <option value="">Select</option>
            <option>Part-time (≤20h/wk)</option>
            <option>Full-time (40h/wk)</option>
            <option>Custom team</option>
            <option>Not sure — advise me</option>
          </Select>
        </div>
        <div>
          <Label>When to Start?</Label>
          <Select name="timeline" defaultValue="">
            <option value="">Select</option>
            <option>Immediately</option>
            <option>Within 2 weeks</option>
            <option>Within a month</option>
            <option>Exploring options</option>
          </Select>
        </div>
      </div>

      <div>
        <Label>Hiring Needs</Label>
        <Textarea name="message" placeholder="Tell us about your workflow, tools (EMR, phone, calendar), coverage hours and what support you need..." rows={4} />
      </div>

      <p className="text-xs text-[#8A9BB0]">By submitting, you agree to be contacted about AfyaDesk hiring. We respect your privacy.</p>

      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">{error}</p>}

      <Button type="submit" size="xl" disabled={loading} className="w-full">
        {loading ? "Submitting..." : "Hire Talent"}
      </Button>
      <p className="text-center text-xs text-[#8A9BB0]">Avg response within 1 business day • Matched in 5–7 days • No obligation</p>
    </form>
  );
}
