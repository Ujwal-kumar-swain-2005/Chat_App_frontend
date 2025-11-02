import React, { useState } from "react";

const JoinGroupModal = ({ open, onClose, onSuccess }) => {
  const [joinToken, setJoinToken] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleJoin = async () => {
    setLoading(true);
    try {
      const tokenPart = joinToken.includes("token=")
        ? new URL(joinToken).searchParams.get("token")
        : joinToken;
      const jwt = localStorage.getItem("token");
      const response = await fetch(`/api/chats/join?token=${tokenPart}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) throw new Error((await response.text()) || "Failed to join group");
      setJoinToken("");
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="modal-backdrop" style={{
      position: 'fixed', top:0, left:0, width: '100vw', height: '100vh', 
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 30,
      background: 'rgba(0,0,0,0.3)'
    }}>
      <div style={{
        background: '#fff', padding: 32, borderRadius: 12, width: 340,
        boxShadow: '0 2px 8px rgba(0,0,0,0.14)', textAlign: 'center'
      }}>
        <h2 style={{marginBottom:18}}>Join Group</h2>
        <input
          style={{width:'95%', padding:10, fontSize:16, borderRadius:6, border:'1px solid #ccc', marginBottom:18}}
          type="text"
          placeholder="Paste group join link or code"
          value={joinToken}
          onChange={e => setJoinToken(e.target.value)}
        />
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <button
            type="button"
            style={{padding: '8px 18px', color:'#fff', background:'#25D366', fontWeight:600, border:0, borderRadius:5}}
            onClick={handleJoin}
            disabled={loading}
          >{loading ? "Joining..." : "Join"}</button>
          <button
            type="button"
            style={{padding: '8px 16px', color:'#222', background:'#eee', fontWeight:600, border:0, borderRadius:5}}
            onClick={onClose}
            disabled={loading}
          >Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default JoinGroupModal;
