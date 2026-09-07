"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { bundledModuleMaterials } from "@/lib/course-materials";
import Image from "next/image";

export default function AdminCoursePage() {
  const [courseInfo,setCourseInfo]=useState<any>(null);
  const [coursePrice,setCoursePrice]=useState("");
  const [courseMsg,setCourseMsg]=useState<string|null>(null);
  const [materials,setMaterials]=useState<any[]>([]);
  const [matForm,setMatForm]=useState({ moduleNumber:"01", title:"", type:"PDF" as any, url:"" });
  const [matMsg,setMatMsg]=useState<string|null>(null);

  async function load(){
    const c=await fetch("/api/course").then(r=>r.json());
    setCourseInfo(c); setCoursePrice(String(c.price??""));
    const m=await fetch("/api/course-materials").then(r=>r.json());
    if(Array.isArray(m)) setMaterials(m);
  }
  useEffect(()=>{load();},[]);

  async function createMaterial(e:React.FormEvent){
    e.preventDefault();
    setMatMsg(null);
    const res=await fetch("/api/course-materials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(matForm)});
    const j=await res.json();
    if(!res.ok) setMatMsg(j.error||"Failed");
    else { setMatMsg("✅ Material added"); setMatForm({moduleNumber:"01",title:"",type:"PDF",url:""}); load(); }
  }
  async function deleteMaterial(id:string){
    if(!confirm("Delete material?")) return;
    await fetch(`/api/course-materials/${id}`,{method:"DELETE"});
    load();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#0B1F33]">Course</h1>
      <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
        <h3 className="font-bold text-[#0B1F33]">Price & Details</h3>
        <p className="text-sm text-[#5B6B80]">Price shown only on /course and /course/enroll — not in footer.</p>
        {courseInfo ? (
          <div className="mt-4 space-y-4">
            <div className="rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] p-4 text-sm"><span className="font-semibold">{courseInfo.title}</span> — KSh {courseInfo.price?.toLocaleString()} • {courseInfo.duration||""}</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label>Price (KSh) *</Label><Input type="number" min={0} value={coursePrice} onChange={(e)=>setCoursePrice(e.target.value)} /></div>
              <div className="flex items-end"><Button size="lg" onClick={async()=>{setCourseMsg(null); const res=await fetch("/api/course",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({price:parseInt(coursePrice,10)})}); const j=await res.json(); if(!res.ok) setCourseMsg(j.error||"Failed"); else {setCourseMsg(`✅ Price updated to KSh ${j.price.toLocaleString()}`); setCourseInfo(j);}}}>Update Price</Button></div>
            </div>
            {courseMsg && <p className="text-sm bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-3 py-2">{courseMsg}</p>}
          </div>
        ) : <p className="text-sm text-[#5B6B80] mt-3">Loading…</p>}
      </div>

      <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
        <h3 className="font-bold text-[#0B1F33]">Module Materials — bundled PDFs (Modules 1–20)</h3>
        <p className="text-sm text-[#5B6B80]">Students are served <span className="font-mono text-xs bg-[#F8FAFC] border border-[#E6EEF6] px-1.5 py-0.5 rounded">public/modules/module1.pdf … module20.pdf</span> automatically. To update a module, replace its PDF file — no upload needed.</p>
        <div className="mt-4 grid sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
          {bundledModuleMaterials.map((m) => (
            <a key={m.id} href={m.url} target="_blank" className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] text-sm hover:bg-white">
              <span className="font-medium text-[#0B1F33]">Module {m.moduleNumber} • PDF</span>
              <span className="text-xs font-semibold text-[#0F8B8D]">Open →</span>
            </a>
          ))}
        </div>
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-[#0B1F33]">Extra DB materials (optional overrides)</h4>
          <p className="text-xs text-[#8A9BB0] mt-0.5">Previously uploaded files take precedence per module. Delete to fall back to bundled PDFs.</p>
        </div>
        <div className="mt-3 space-y-2 max-h-[400px] overflow-y-auto">
          {materials.length===0? <p className="text-sm text-[#5B6B80]">No extra DB materials — students get the bundled PDFs.</p> : materials.map((m:any)=><div key={m.id} className="flex justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] text-sm"><div><div className="font-medium">Module {m.moduleNumber} • {m.title} <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-white border">{m.type}</span></div><a href={m.url} target="_blank" className="text-xs text-[#0F8B8D] break-all">{m.url}</a></div><button onClick={()=>deleteMaterial(m.id)} className="text-xs text-red-600 font-semibold">Delete</button></div>)}
        </div>
      </div>
    </div>
  );
}
