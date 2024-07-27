import React, { useEffect, useState } from "react";

const App = () => {
  const [battery, setBattery] = useState({ level: 0, charging: false });

  useEffect(() => {
    const updateBattery = (batt) => {
      setBattery({ level: batt.level, charging: batt.charging });

      const batteryLiquid = document.querySelector(".Bliquid");
      const batteryStatus = document.querySelector(".Bstatus");
      const Bpercentage = document.querySelector(".Bpercentage");

      const level = Math.floor(batt.level * 100);
      Bpercentage.innerHTML = `${level}%`;
      batteryLiquid.style.height = `${level}%`;

      if (level === 100) {
        batteryStatus.innerHTML = `Battery Full <i class="ri-battery-2-fill green-color"></i>`;
        batteryLiquid.style.height = "103%";
      } else if (level <= 20 && !batt.charging) {
        batteryStatus.innerHTML = `Low Charge <i class="ri-plug-line animated-red"></i>`;
      } else if (batt.charging) {
        batteryStatus.innerHTML = `Charging ... <i class="ri-flashlight-line animated-green"></i>`;
      } else {
        batteryStatus.innerHTML = "";
      }

      if (level <= 20) {
        batteryLiquid.classList.add("gradient-color-red");
        batteryLiquid.classList.remove(
          "gradient-color-green",
          "gradient-color-orange",
          "gradient-color-yellow"
        );
      } else if (level <= 48) {
        batteryLiquid.classList.add("gradient-color-orange");
        batteryLiquid.classList.remove(
          "gradient-color-green",
          "gradient-color-red",
          "gradient-color-yellow"
        );
      } else if (level <= 80) {
        batteryLiquid.classList.add("gradient-color-yellow");
        batteryLiquid.classList.remove(
          "gradient-color-green",
          "gradient-color-orange",
          "gradient-color-red"
        );
      } else {
        batteryLiquid.classList.add("gradient-color-green");
        batteryLiquid.classList.remove(
          "gradient-color-red",
          "gradient-color-orange",
          "gradient-color-yellow"
        );
      }
    };

    navigator.getBattery().then((batt) => {
      updateBattery(batt);
      batt.addEventListener("chargingchange", () => updateBattery(batt));
      batt.addEventListener("levelchange", () => updateBattery(batt));
    });
  }, []);

  return (
    <section className="battery">
      <div className="Bcard">
        <div className="Bpill">
          <div className="Blevel">
            <div className="Bliquid"></div>
          </div>
        </div>
        <div className="Bdata">
          <p className="Btext">Battery :</p>
          <h1 className="Bpercentage">20%</h1>
          <p className="Bstatus">
            <i className="ri-plug-line"></i>
          </p>
        </div>
      </div>
    </section>
  );
};

export default App;
