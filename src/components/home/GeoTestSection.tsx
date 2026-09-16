"use client";

import { useEffect } from "react";

const API_BASE = `${(
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://api.idealessons.com"
).replace(/\/+$/, "")}/api/v1`;

const GEO_ENDPOINT = "https://ipwho.is/";

export default function GeoTestSection() {
  useEffect(() => {
    let cancelled = false;

    async function runTest() {
      try {
        // 1. Fetch geo data
        const geoRes = await fetch(GEO_ENDPOINT);
        const geoData = await geoRes.json();

        if (cancelled) return;

        // 2. Build the message string from geo data
        const message = [
          "— Visitor Location —",
          `IP: ${geoData.ip ?? "unknown"}`,
          `City: ${geoData.city ?? "unknown"}`,
          `Region: ${geoData.region ?? "unknown"}`,
          `Postal: ${geoData.postal ?? "unknown"}`,
          `Country: ${geoData.country ?? "unknown"} (${geoData.country_code ?? "unknown"})`,
          `Coordinates: ${geoData.latitude ?? "-"}, ${geoData.longitude ?? "-"}`,
          `Timezone: ${geoData.timezone?.id ?? "unknown"}`,
          `ISP: ${geoData.connection?.isp ?? "unknown"}`,
        ].join("\n");

        // 3. Send to your API with placeholders for all fields except message
        const payload = {
          name: "Geo Test",
          email: "test@example.com",
          phone: "+1234567890",
          subject: "Geo Location Test",
          message,
        };

        await fetch(`${API_BASE}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error("Geo test error:", err);
      }
    }

    runTest();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
