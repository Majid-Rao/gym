import React, { useState, useEffect } from "react";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import { useAuth } from "../../../contexts/AuthContext";
import {
  Trash2,
  Calendar,
  Target,
  Dumbbell,
  Utensils,
  User,
} from "lucide-react";

const ViewSuggestion = () => {
  const { UserData } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= FETCH PLAN ================= */
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/fetchOnePlan/${UserData?._id}`
        );

        if (!res.ok) {
          if (res.status === 404) {
            setPlans([]);
            return;
          }
          throw new Error("Failed to fetch plan");
        }

        const data = await res.json();
        setPlans(data.user ? [data.user] : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (UserData?._id) fetchPlans();
  }, [UserData?._id]);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/deleteUserPlan/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Delete failed");

      setPlans((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete plan");
    }
  };

  /* ================= CARD UI ================= */
  const PlanCard = ({ plan }) => (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 flex justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Your Fitness Plan
          </h2>

          <div className="flex flex-wrap gap-4 text-blue-100 text-sm">
            <span className="flex items-center gap-1">
              <User size={15} /> {plan.gender || "N/A"}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={15} /> {plan.timeperiod || "N/A"}
            </span>
            <span className="flex items-center gap-1">
              <Target size={15} /> {plan.goal || "N/A"}
            </span>
          </div>
        </div>

        <button
          onClick={() => handleDelete(plan._id)}
          className="bg-red-500 hover:bg-red-600 p-3 rounded-lg"
        >
          <Trash2 />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 text-center p-6 border-b border-gray-700">
        <Stat label="Height" value={plan.height} unit="cm" />
        <Stat label="Weight" value={plan.weight} unit="kg" bordered />
        <Stat label="Age" value={plan.age} unit="yrs" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        <Section
          icon={<Utensils className="text-green-400" />}
          title="Current Meal Routine"
          text={plan.meal_routine}
        />

        <Section
          icon={<Dumbbell className="text-blue-400" />}
          title="Current Workout Routine"
          text={plan.workout_routine}
        />

        {plan.diet_plan && (
          <Section
            gradient
            icon={<Utensils className="text-green-400" />}
            title="AI Diet Plan"
            text={plan.diet_plan}
          />
        )}

        {plan.workout_plan && (
          <Section
            gradient
            icon={<Dumbbell className="text-blue-400" />}
            title="AI Workout Plan"
            text={plan.workout_plan}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <Header title="View Suggestions" />

        <main className="max-w-6xl mx-auto px-4 py-6">
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorBox msg={error} />
          ) : plans.length === 0 ? (
            <EmptyState />
          ) : (
            plans.map((plan) => <PlanCard key={plan._id} plan={plan} />)
          )}
        </main>
      </div>
    </div>
  );
};

/* ================= SMALL COMPONENTS ================= */

const Stat = ({ label, value, unit, bordered }) => (
  <div className={`${bordered ? "border-x border-gray-700" : ""}`}>
    <p className="text-gray-400 text-sm">{label}</p>
    <p className="text-2xl font-bold">{value || "N/A"}</p>
    <p className="text-xs text-gray-500">{unit}</p>
  </div>
);

const Section = ({ icon, title, text, gradient }) => (
  <div
    className={`p-5 rounded-lg border border-gray-700 ${
      gradient ? "bg-gray-900/60" : "bg-gray-900"
    }`}
  >
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <h3 className="font-semibold">{title}</h3>
    </div>
    <p className="text-gray-300 whitespace-pre-wrap">
      {text || "Not provided"}
    </p>
  </div>
);

const Loader = () => (
  <div className="flex justify-center py-20">
    <div className="animate-spin h-14 w-14 border-b-2 border-blue-500 rounded-full"></div>
  </div>
);

const ErrorBox = ({ msg }) => (
  <div className="bg-red-900/30 border border-red-500 p-6 rounded-lg text-center">
    {msg}
  </div>
);

const EmptyState = () => (
  <div className="text-center py-20">
    <Dumbbell className="mx-auto mb-4 text-gray-600" size={60} />
    <p className="text-xl text-gray-400">No plans found</p>
  </div>
);

export default ViewSuggestion;
