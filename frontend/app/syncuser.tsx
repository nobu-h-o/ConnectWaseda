"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const SyncUser = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      // Prepare the data to sync
      const userData = {
        email: session.user.email,
        firstName: session.user.name ? session.user.name.split(" ")[0] : "",
        lastName: session.user.name ? session.user.name.split(" ").slice(1).join(" ") : "",
      };

      fetch("http://localhost:8000/api/users/google-sync/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("User sync response:", data);
        })
        .catch((error) => {
          console.error("Error syncing user data:", error);
        });
    }
  }, [session]);

  return null; // Or render UI feedback if needed.
};

export default SyncUser;