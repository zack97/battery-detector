import React, { useEffect, useState } from "react";

const BatteryDetector = () => {
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [charging, setCharging] = useState(false);
  const [batteryStatus, setBatteryStatus] = useState("");

  useEffect(() => {
    const updateBatteryStatus = (battery) => {
      setBatteryLevel(Math.floor(battery.level * 100));
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

    navigator.getBattery().then((battery) => {
      updateBatteryStatus(battery);
      battery.addEventListener("chargingchange", () =>
        updateBatteryStatus(battery)
      );
      battery.addEventListener("levelchange", () =>
        updateBatteryStatus(battery)
      );
    });
  }, []);

  return (
    <section className="battery">
      <div className="Bcard">
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
            {charging && <i className="ri-flashlight-line animated-green"></i>}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BatteryDetector;
