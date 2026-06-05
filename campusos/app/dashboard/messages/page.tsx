"use client";
import { useState } from "react";
import {
  MessageSquare, Search, Plus, Send, Paperclip,
  Smile, Users, Hash, Bell, Settings, Phone,
  Video, MoreHorizontal, Star, Clock, Check, CheckCheck
} from "lucide-react";

const CHANNELS = [
  { id: 1, name: "general", type: "channel", unread: 3, icon: Hash },
  { id: 2, name: "announcements", type: "channel", unread: 1, icon: Bell },
  { id: 3, name: "class-12-a", type: "channel", unread: 0, icon: Hash },
  { id: 4, name: "class-12-b", type: "channel", unread: 5, icon: Hash },
  { id: 5, name: "teachers-lounge", type: "channel", unread: 0, icon: Hash },
  { id: 6, name: "sports-team", type: "channel", unread: 2, icon: Hash },
];

const DMS = [
  { id: 7, name: "Priya Sharma", role: "Teacher", avatar: "PS", unread: 2, online: true, color: "linear-gradient(135deg,#9FA1FF,#B5BAFF)" },
  { id: 8, name: "Rahul Gupta", role: "Student", avatar: "RG", unread: 0, online: true, color: "linear-gradient(135deg,#AEE2FF,#9FA1FF)" },
  { id: 9, name: "Amit Kumar", role: "Parent", avatar: "AK", unread: 1, online: false, color: "linear-gradient(135deg,#D9F9DF,#AEE2FF)" },
  { id: 10, name: "Suresh Rao", role: "Staff", avatar: "SR", unread: 0, online: true, color: "linear-gradient(135deg,#B5BAFF,#9FA1FF)" },
];

const MESSAGES = [
  { id: 1, sender: "Priya Sharma", avatar: "PS", color: "linear-gradient(135deg,#9FA1FF,#B5BAFF)", text: "Good morning everyone! Just a reminder that the Science Fair submissions are due by Friday.", time: "09:14", isMe: false, read: true },
  { id: 2, sender: "Me", avatar: "RA", color: "linear-gradient(135deg,#9FA1FF,#AEE2FF)", text: "Thanks for the reminder! I'll send a class-wide notification right away.", time: "09:16", isMe: true, read: true },
  { id: 3, sender: "Priya Sharma", avatar: "PS", color: "linear-gradient(135deg,#9FA1FF,#B5BAFF)", text: "Also, 3 students from 10-B still haven't submitted their project proposals. Could you follow up?", time: "09:18", isMe: false, read: true },
  { id: 4, sender: "Me", avatar: "RA", color: "linear-gradient(135deg,#9FA1FF,#AEE2FF)", text: "On it! I'll reach out to them through the parent portal as well.", time: "09:20", isMe: true, read: true },
  { id: 5, sender: "Rahul Gupta", avatar: "RG", color: "linear-gradient(135deg,#AEE2FF,#9FA1FF)", text: "Sir, I've submitted my project proposal. Can you confirm receipt?", time: "09:35", isMe: false, read: false },
  { id: 6, sender: "Rahul Gupta", avatar: "RG", color: "linear-gradient(135deg,#AEE2FF,#9FA1FF)", text: "📎 Science_Project_Proposal_RahulGupta.pdf", time: "09:35", isMe: false, read: false, isFile: true },
];

export default function MessagesPage() {
  const [activeChannel, setActiveChannel] = useState(DMS[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(MESSAGES);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, {
      id: prev.length + 1, sender: "Me", avatar: "RA",
      color: "linear-gradient(135deg,#9FA1FF,#AEE2FF)",
      text: message, time: "Now", isMe: true, read: false
    }]);
    setMessage("");
  };

  return (
    <div style={{ height: "calc(100vh - 64px)", display: "flex", overflow: "hidden" }}>
      {/* Left sidebar - channels */}
      <div style={{
        width: "260px", borderRight: "1px solid var(--border)",
        background: "var(--bg-sidebar)", display: "flex",
        flexDirection: "column", flexShrink: 0
      }}>
        {/* Header */}
        <div style={{ padding: "16px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)" }}>Messages</span>
            <div style={{ display: "flex", gap: "4px" }}>
              <button className="btn-ghost" style={{ padding: "5px" }}><Plus size={15} /></button>
              <button className="btn-ghost" style={{ padding: "5px" }}><Settings size={15} /></button>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: "9px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input className="input-field" placeholder="Search..." style={{ paddingLeft: "28px", fontSize: "12.5px", padding: "7px 10px 7px 28px" }} />
          </div>
        </div>

        {/* Channels */}
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 8px" }}>
          <div style={{ fontSize: "10px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "4px 8px", marginBottom: "4px" }}>
            Channels
          </div>
          {CHANNELS.map(ch => (
            <div key={ch.id} onClick={() => setActiveChannel(ch as any)}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "7px 8px", borderRadius: "7px", cursor: "pointer",
                background: activeChannel.id === ch.id ? "rgba(159,161,255,0.1)" : "transparent",
                marginBottom: "1px", transition: "all 0.15s"
              }}>
              <ch.icon size={14} color={activeChannel.id === ch.id ? "#9FA1FF" : "var(--text-muted)"} />
              <span style={{ flex: 1, fontSize: "13px", color: activeChannel.id === ch.id ? "#9FA1FF" : "var(--text-secondary)" }}>
                {ch.name}
              </span>
              {ch.unread > 0 && (
                <span style={{
                  background: "#9FA1FF", color: "#0a0b0f", borderRadius: "999px",
                  fontSize: "10px", fontWeight: "700", padding: "0px 5px", minWidth: "16px", textAlign: "center"
                }}>{ch.unread}</span>
              )}
            </div>
          ))}

          <div style={{ fontSize: "10px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "12px 8px 4px", marginBottom: "4px" }}>
            Direct Messages
          </div>
          {DMS.map(dm => (
            <div key={dm.id} onClick={() => setActiveChannel(dm as any)}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "7px 8px", borderRadius: "7px", cursor: "pointer",
                background: activeChannel.id === dm.id ? "rgba(159,161,255,0.1)" : "transparent",
                marginBottom: "1px", transition: "all 0.15s"
              }}>
              <div style={{ position: "relative" }}>
                <div className="avatar avatar-sm" style={{ background: dm.color, color: "#0a0b0f" }}>{dm.avatar}</div>
                {dm.online && (
                  <div style={{ position: "absolute", bottom: 0, right: 0, width: "7px", height: "7px", borderRadius: "50%", background: "#D9F9DF", border: "1.5px solid var(--bg-sidebar)" }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "13px", fontWeight: "500", color: activeChannel.id === dm.id ? "#9FA1FF" : "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {dm.name}
                </div>
                <div style={{ fontSize: "10.5px", color: "var(--text-muted)" }}>{dm.role}</div>
              </div>
              {dm.unread > 0 && (
                <span style={{
                  background: "#9FA1FF", color: "#0a0b0f", borderRadius: "999px",
                  fontSize: "10px", fontWeight: "700", padding: "0px 5px"
                }}>{dm.unread}</span>
              )}
            </div>
          ))}
        </div>

        {/* Note */}
        <div style={{ padding: "12px 14px", borderTop: "1px solid var(--border)" }}>
          <div style={{
            background: "rgba(159,161,255,0.07)", border: "1px solid rgba(159,161,255,0.15)",
            borderRadius: "8px", padding: "10px 12px", fontSize: "11.5px", color: "var(--text-muted)", lineHeight: "1.5"
          }}>
            🔒 <strong style={{ color: "#9FA1FF" }}>Private & Secure</strong><br />
            No phone numbers shared. All communication stays inside CampusOS.
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--bg-primary)" }}>
        {/* Chat header */}
        <div style={{
          padding: "14px 20px", borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(10,11,15,0.8)", backdropFilter: "blur(20px)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {"avatar" in activeChannel ? (
              <div style={{ position: "relative" }}>
                <div className="avatar" style={{ background: (activeChannel as any).color, color: "#0a0b0f" }}>
                  {(activeChannel as any).avatar}
                </div>
                {(activeChannel as any).online && (
                  <div style={{ position: "absolute", bottom: 1, right: 1, width: "9px", height: "9px", borderRadius: "50%", background: "#D9F9DF", border: "2px solid var(--bg-primary)" }} />
                )}
              </div>
            ) : (
              <div className="module-icon" style={{ background: "rgba(159,161,255,0.12)" }}>
                <Hash size={16} color="#9FA1FF" />
              </div>
            )}
            <div>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>
                {"avatar" in activeChannel ? (activeChannel as any).name : `#${(activeChannel as any).name}`}
              </div>
              <div style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>
                {"avatar" in activeChannel ? (activeChannel as any).role : "Channel · 48 members"}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            <button className="btn-ghost" style={{ padding: "8px" }}><Phone size={16} /></button>
            <button className="btn-ghost" style={{ padding: "8px" }}><Video size={16} /></button>
            <button className="btn-ghost" style={{ padding: "8px" }}><MoreHorizontal size={16} /></button>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          {/* Date separator */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600" }}>Today</span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          </div>

          {messages.map((msg, i) => (
            <div key={msg.id} style={{
              display: "flex", gap: "10px", marginBottom: "16px",
              flexDirection: msg.isMe ? "row-reverse" : "row"
            }}>
              {!msg.isMe && (
                <div className="avatar avatar-sm" style={{ background: msg.color, color: "#0a0b0f", flexShrink: 0, alignSelf: "flex-end" }}>
                  {msg.avatar}
                </div>
              )}
              <div style={{ maxWidth: "60%", display: "flex", flexDirection: "column", alignItems: msg.isMe ? "flex-end" : "flex-start" }}>
                {!msg.isMe && (
                  <span style={{ fontSize: "11.5px", color: "#9FA1FF", fontWeight: "600", marginBottom: "4px" }}>{msg.sender}</span>
                )}
                <div style={{
                  padding: "10px 14px",
                  borderRadius: msg.isMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  background: msg.isMe ? "linear-gradient(135deg, #9FA1FF, #B5BAFF)" : "var(--bg-card)",
                  border: msg.isMe ? "none" : "1px solid var(--border)",
                  color: msg.isMe ? "#0a0b0f" : "var(--text-primary)",
                  fontSize: "13.5px",
                  lineHeight: "1.5",
                }}>
                  {(msg as any).isFile ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "7px", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Paperclip size={14} />
                      </div>
                      <div>
                        <div style={{ fontSize: "12.5px", fontWeight: "600" }}>{msg.text}</div>
                        <div style={{ fontSize: "11px", opacity: 0.7 }}>PDF Document</div>
                      </div>
                    </div>
                  ) : msg.text}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                  <span style={{ fontSize: "10.5px", color: "var(--text-muted)" }}>{msg.time}</span>
                  {msg.isMe && (
                    msg.read ? <CheckCheck size={12} color="#9FA1FF" /> : <Check size={12} color="var(--text-muted)" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)" }}>
          <div style={{
            display: "flex", alignItems: "flex-end", gap: "10px",
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "14px", padding: "10px 14px"
          }}>
            <button className="btn-ghost" style={{ padding: "4px" }}><Paperclip size={17} /></button>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder={`Message ${"avatar" in activeChannel ? (activeChannel as any).name : `#${(activeChannel as any).name}`}...`}
              rows={1}
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                color: "var(--text-primary)", fontSize: "13.5px", resize: "none",
                fontFamily: "inherit", lineHeight: "1.5"
              }}
            />
            <button className="btn-ghost" style={{ padding: "4px" }}><Smile size={17} /></button>
            <button
              onClick={sendMessage}
              style={{
                width: "32px", height: "32px", borderRadius: "8px", border: "none",
                background: message.trim() ? "linear-gradient(135deg,#9FA1FF,#AEE2FF)" : "rgba(159,161,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: message.trim() ? "pointer" : "not-allowed", transition: "all 0.2s", flexShrink: 0
              }}
            >
              <Send size={14} color={message.trim() ? "#0a0b0f" : "#9FA1FF"} />
            </button>
          </div>
          <div style={{ marginTop: "8px", fontSize: "11px", color: "var(--text-muted)", textAlign: "center" }}>
            🔒 End-to-end encrypted. No phone numbers shared.
          </div>
        </div>
      </div>
    </div>
  );
}
