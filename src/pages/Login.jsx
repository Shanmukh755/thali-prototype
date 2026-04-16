import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #FFF5F5 0%, #FFFFFF 50%, #F8F8F8 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: "420px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "#CC3333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              boxShadow: "0 4px 20px rgba(204,51,51,0.3)",
            }}
          >
            <span style={{ color: "white", fontSize: "28px", fontWeight: 800 }}>
              T
            </span>
          </div>
          <div style={{ fontSize: "28px", fontWeight: 800, color: "#1A1A1A" }}>
            Thali
          </div>
          <div style={{ fontSize: "13px", color: "#888", marginTop: "4px" }}>
            The Restaurant OS that thinks for you
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            border: "1px solid #F0F0F0",
          }}
        >
          <div
            style={{ fontWeight: 700, fontSize: "20px", marginBottom: "4px" }}
          >
            Welcome back
          </div>
          <div
            style={{ fontSize: "13px", color: "#888", marginBottom: "24px" }}
          >
            Sign in to your restaurant dashboard
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "16px" }}>
              <label className="form-label">Phone / Email</label>
              <div style={{ position: "relative" }}>
                <Phone
                  size={16}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#999",
                  }}
                />
                <input
                  className="form-input"
                  style={{ paddingLeft: "38px" }}
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label className="form-label">Password</label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={16}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#999",
                  }}
                />
                <input
                  className="form-input"
                  style={{ paddingLeft: "38px", paddingRight: "38px" }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#999",
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "12px",
                fontSize: "14px",
                opacity: loading ? 0.7 : 1,
              }}
              disabled={loading}
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <span style={{ fontSize: "12px", color: "#888" }}>
              New restaurant?{" "}
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "#CC3333",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Get started free →
            </span>
          </div>
        </div>

        {/* Demo hint */}
        <div
          style={{
            textAlign: "center",
            marginTop: "16px",
            fontSize: "12px",
            color: "#888",
          }}
        >
          Demo: Click "Sign In" to enter the prototype
        </div>
      </div>
    </div>
  );
}
