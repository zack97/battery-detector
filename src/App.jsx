import React, { useState, useEffect } from "react";

const BatteryDetector = () => {
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);
  const [batteryStatus, setBatteryStatus] = useState("");

  useEffect(() => {
    const updateBattery = (batt) => {
      const level = Math.floor(batt.level * 100);
      setBatteryLevel(level);
      setIsCharging(batt.charging);

      if (level === 100) {
        setBatteryStatus(
          `Battery Full <i class="ri-battery-2-fill green-color"></i>`
        );
      } else if (level <= 20 && !batt.charging) {
        setBatteryStatus(
          `Low Charge <i class="ri-plug-line animated-red"></i>`
        );
      } else if (batt.charging) {
        setBatteryStatus(
          `Charging ... <i class="ri-flashlight-line animated-green"></i>`
        );
      } else {
        setBatteryStatus("");
      }
    };

    navigator
      .getBattery()
      .then((batt) => {
        updateBattery(batt);
        batt.addEventListener("chargingchange", () => updateBattery(batt));
        batt.addEventListener("levelchange", () => updateBattery(batt));
      })
      .catch((error) => {
        console.error("Battery API error:", error);
      });
  }, []);

  return (
    <section className="battery">
      <div className="Bcard">
        <div className="Bpill">
          <div className="Blevel">
            <div
              className={`Bliquid ${
                batteryLevel <= 20
                  ? "gradient-color-red"
                  : "gradient-color-green"
              }`}
              style={{ height: `${batteryLevel}%` }}
            ></div>
          </div>
        </div>
        <div className="Bdata">
          <p className="Btext">Battery:</p>
          <h1 className="Bpercentage">{batteryLevel}%</h1>
          <p
            className="Bstatus"
            dangerouslySetInnerHTML={{ __html: batteryStatus }}
          ></p>
        </div>
      </div>
    </section>
  );
};

export default BatteryDetector;
