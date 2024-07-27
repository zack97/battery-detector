import React, { useEffect, useState } from "react";

const BatteryDetector = () => {
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [charging, setCharging] = useState(false);
  const [batteryStatus, setBatteryStatus] = useState(
    "Battery information not available"
  );

  useEffect(() => {
    const updateBatteryStatus = (battery) => {
      const level = Math.floor(battery.level * 100);
      setBatteryLevel(level);
      setCharging(battery.charging);
      if (battery.level === 1) {
        setBatteryStatus("Battery Full");
      } else if (battery.level <= 0.2 && !battery.charging) {
        setBatteryStatus("Low Charge");
      } else if (battery.charging) {
        setBatteryStatus("Charging ...");
      } else {
        setBatteryStatus("");
      }
    };

    if ("getBattery" in navigator) {
      navigator
        .getBattery()
        .then((battery) => {
          updateBatteryStatus(battery);
          battery.addEventListener("chargingchange", () =>
            updateBatteryStatus(battery)
          );
          battery.addEventListener("levelchange", () =>
            updateBatteryStatus(battery)
          );
        })
        .catch((error) => {
          console.error("Battery API error:", error);
          setBatteryStatus("Battery information not available");
        });
    } else {
      console.warn("Battery Status API not supported");
      setBatteryStatus("Battery Status API not supported");
    }
  }, []);

  return (
    <section className="battery">
      <div className="Bcard">
        {batteryLevel !== null ? (
          <>
            <div className="Bpill">
              <div className="Blevel">
                <div
                  className="Bliquid"
                  style={{ height: `${batteryLevel}%` }}
                ></div>
              </div>
            </div>
            <div className="Bdata">
              <p className="Btext">Battery:</p>
              <h1 className="Bpercentage">{batteryLevel}%</h1>
              <p className="Bstatus">
                {batteryStatus}
                {charging && (
                  <i className="ri-flashlight-line animated-green"></i>
                )}
              </p>
            </div>
          </>
        ) : (
          <p className="Bstatus">{batteryStatus}</p>
        )}
      </div>
    </section>
  );
};

export default BatteryDetector;
