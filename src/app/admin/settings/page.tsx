"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage(){
  const [director, setDirector] = useState("");
  const [msg, setMsg] = useState<string|null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwMsg, setPwMsg] = useState<string|null>(null);
  const [pwOk, setPwOk] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  async function load(){
    try{
      const r = await fetch("/api/settings");
      const j = await r.json();
      setDirector(j.director_name || "Dr. Grace Wanjiku, Director — AfyaDesk");
    } catch {}
    setLoading(false);
  }
  useEffect(()=>{load();},[]);

  async function save(){
    setMsg(null);
    const r = await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ director_name: director })});
    const j = await r.json();
    if(!r.ok) setMsg(j.error||"Failed");
    else setMsg("✅ Director name updated — certificates will use new name");
  }

  if(loading) return <div className="p-6 text-sm text-[#5B6B80]">Loading...</div>;

  async function changePassword(e: React.FormEvent){
    e.preventDefault();
    setPwMsg(null);
    setPwOk(false);
    if(newPassword !== confirmPassword){
      setPwMsg("New passwords do not match.");
      return;
    }
    if(newPassword.length < 8){
      setPwMsg("New password must be at least 8 characters.");
      return;
    }
    setPwLoading(true);
    try{
      const r = await fetch("/api/admin/password", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentPassword, newPassword })});
      const j = await r.json();
      if(!r.ok) setPwMsg(j.error||"Failed");
      else {
        setPwOk(true);
        setPwMsg("✅ Password changed — use your new password next login");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setPwMsg("Something went wrong");
    } finally {
      setPwLoading(false);
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-[#0B1F33]">Settings</h1>
      <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6 space-y-4">
        <h3 className="font-semibold text-[#0B1F33]">Certificate Director</h3>
        <p className="text-sm text-[#5B6B80]">This name appears on generated PDFs in the <span className="font-semibold">Director</span> area (right bottom, on top of gold line). Removed the small “Director — AfyaDesk” below — now only this editable name shows.</p>
        <div>
          <Label>Director Name *</Label>
          <Input value={director} onChange={e=>setDirector(e.target.value)} placeholder="Dr. Grace Wanjiku, Director — AfyaDesk" />
          <p className="text-xs text-[#8A9BB0] mt-1">Example: Dr. Grace Wanjiku, Director — AfyaDesk</p>
        </div>
        {msg && <p className="text-sm bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">{msg}</p>}
        <Button size="lg" onClick={save}>Save Director</Button>
      </div>

      <form onSubmit={changePassword} className="rounded-2xl bg-white border border-[#E6EEF6] p-6 space-y-4">
        <h3 className="font-semibold text-[#0B1F33]">Change Password</h3>
        <p className="text-sm text-[#5B6B80]">Update the password for your currently logged-in admin account.</p>
        <div>
          <Label>Current Password *</Label>
          <Input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} placeholder="••••••••" required autoComplete="current-password" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>New Password * (min 8 chars)</Label>
            <Input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder="••••••••" required minLength={8} autoComplete="new-password" />
          </div>
          <div>
            <Label>Confirm New Password *</Label>
            <Input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} placeholder="••••••••" required minLength={8} autoComplete="new-password" />
          </div>
        </div>
        {pwMsg && <p className={`text-sm rounded-xl px-3 py-2 border ${pwOk ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-red-50 border-red-200 text-red-600"}`}>{pwMsg}</p>}
        <Button size="lg" type="submit" disabled={pwLoading}>{pwLoading ? "Changing..." : "Change Password"}</Button>
      </form>

      <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6 grid gap-3 text-sm">
        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E6EEF6]"><div className="font-semibold">Contact</div><div className="text-xs text-[#5B6B80]">hello@afyadesk.com • +254 753 728 292 • Nairobi</div></div>
        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E6EEF6]"><div className="font-semibold">Logo</div><div className="text-xs flex items-center gap-2"><Image src="/logo.png" alt="logo" width={100} height={30} className="h-6 w-auto object-contain border rounded" /> /logo.png • /fav.jpg as favicon</div></div>
        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E6EEF6]"><div className="font-semibold">Portal</div><div className="text-xs text-[#5B6B80]">/portal • gated, requires PAID/VERIFIED/COMPLETED enrollment. /portal/login for students. Certificate PDF via /api/portal/certificate with name/date/director.</div></div>
      </div>
    </div>
  );
}
