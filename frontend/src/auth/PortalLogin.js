import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PortalAuthContext } from "../contexts/PortalAuthContext";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { cn } from "../lib/utils";

// Import shadcn components
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";

const PortalLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "STUDENT",
    accessCode: "",
    firstName: "",
    lastName: "",
  });

  const [signupStep, setSignupStep] = useState(1);
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { portalLogin, portalSignup } = useContext(PortalAuthContext);
  const navigate = useNavigate();

  const validateForm = () => {
    if (isSignup) {
      if (signupStep === 1) {
        if (
          !formData.firstName?.trim() ||
          !formData.lastName?.trim() ||
          !formData.email?.trim()
        ) {
          setError("Please fill in all fields");
          return false;
        }
        // Basic email validation
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          setError("Please enter a valid email address");
          return false;
        }
      } else {
        if (!formData.accessCode?.trim()) {
          setError("Please enter your access code");
          return false;
        }
        if (formData.password.length < 8) {
          setError("Password must be at least 8 characters long");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return false;
        }
      }
    } else {
      if (!formData.email?.trim() || !formData.password?.trim()) {
        setError("Please fill in all fields");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!validateForm()) return;

    if (isSignup && signupStep === 1) {
      setSignupStep(2);
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        await portalSignup({
          email: formData.email,
          password: formData.password,
          user_type: formData.userType,
          access_code: formData.accessCode,
          first_name: formData.firstName,
          last_name: formData.lastName,
        });
      } else {
        await portalLogin(formData.email, formData.password, formData.userType);
      }
      navigate(
        formData.userType === "PARENT" ? "/familyportal" : "/studentportal"
      );
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  /**
   * Toggles the signup mode between login and signup.
   * Resets the signup step to 1, clears any existing error messages,
   * and resets specific fields in the form data such as password,
   * confirmPassword, accessCode, firstName, and lastName.
   */
  const toggleMode = () => {
    setIsSignup(!isSignup);
    setSignupStep(1);
    setError(null);
    setFormData({
      ...formData,
      password: "",
      confirmPassword: "",
      accessCode: "",
      firstName: "",
      lastName: "",
    });
  };

  const renderSignupStep1 = () => (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={cn(
                "w-full px-3 py-2 rounded-md",
                "border border-input bg-background",
                "focus:outline-none focus:ring-2 focus:ring-ring"
              )}
              placeholder="Enter first name"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={cn(
                "w-full px-3 py-2 rounded-md",
                "border border-input bg-background",
                "focus:outline-none focus:ring-2 focus:ring-ring"
              )}
              placeholder="Enter last name"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Email address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={cn(
              "w-full px-3 py-2 rounded-md",
              "border border-input bg-background",
              "focus:outline-none focus:ring-2 focus:ring-ring"
            )}
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full mt-6">
        Continue
      </Button>
    </>
  );

  const renderSignupStep2 = () => (
    <>
      <Button
        type="button"
        variant="ghost"
        className="mb-4"
        onClick={() => setSignupStep(1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Access Code</label>
          <input
            type="text"
            name="accessCode"
            value={formData.accessCode}
            onChange={handleChange}
            className={cn(
              "w-full px-3 py-2 rounded-md",
              "border border-input bg-background",
              "focus:outline-none focus:ring-2 focus:ring-ring"
            )}
            placeholder="Enter access code"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter the access code provided by the school
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={cn(
                "w-full px-3 py-2 rounded-md",
                "border border-input bg-background",
                "focus:outline-none focus:ring-2 focus:ring-ring"
              )}
              placeholder="Create password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={cn(
              "w-full px-3 py-2 rounded-md",
              "border border-input bg-background",
              "focus:outline-none focus:ring-2 focus:ring-ring"
            )}
            placeholder="Confirm password"
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full mt-6" disabled={loading}>
        {loading ? "Creating Account..." : "Create Account"}
      </Button>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {isSignup
              ? signupStep === 1
                ? "Create Account"
                : "Complete Registration"
              : "Welcome Back"}
          </CardTitle>
          <CardDescription>
            {isSignup
              ? "Sign up for your student/parent portal account"
              : "Sign in to your student/parent portal"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div className="flex space-x-2 mb-6">
              {["STUDENT", "PARENT"].map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={formData.userType === type ? "secondary" : "outline"}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, userType: type }))
                  }
                  className="flex-1"
                >
                  {type.charAt(0) + type.slice(1).toLowerCase()}
                </Button>
              ))}
            </div>

            {isSignup ? (
              signupStep === 1 ? (
                renderSignupStep1()
              ) : (
                renderSignupStep2()
              )
            ) : (
              <>
                {/* Login Form */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Email address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={cn(
                        "w-full px-3 py-2 rounded-md",
                        "border border-input bg-background",
                        "focus:outline-none focus:ring-2 focus:ring-ring"
                      )}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-3 py-2 rounded-md",
                          "border border-input bg-background",
                          "focus:outline-none focus:ring-2 focus:ring-ring"
                        )}
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </>
            )}
          </form>

          <div className="mt-6 text-center">
            <Button
              type="button"
              variant="link"
              onClick={toggleMode}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {isSignup
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalLogin;
