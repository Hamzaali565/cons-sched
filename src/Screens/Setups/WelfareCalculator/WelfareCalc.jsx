import React, { useState } from "react";
import Header from "../../../Components/Header/Header";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../Components/Button/ButtonDis";
import { ErrorAlert } from "../../../Components/Alert/Alert";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";

const WelfareCalc = () => {
  const [medicine, setMedicine] = useState(0);
  const [CT, setCT] = useState(0);
  const [total, setTotal] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [zAcc, setZAcc] = useState(0);
  const [other, setOther] = useState(0);
  const [cash, setCash] = useState(0);
  const [recievable, setRecievable] = useState(0);
  const [zAmount, setZAmount] = useState(0);
  const [otherAmount, setOtherAmount] = useState(0);

  let reset = () => {
    setMedicine(0);
    setCT(0);
    setTotal(0);
    setDeposit(0);
    setZAcc(0);
    setOther(0);
    setCash(0);
    setRecievable(0);
    setZAmount(0);
    setOtherAmount(0);
  };

  const ZAccountOnly = () => {
    if (zAcc === 0) {
      ErrorAlert({ text: "Please Enter z Account details", timer: 2000 });
      return;
    }
    let billWithoutMedAndCt = total - CT - medicine; // bill without medicine
    setCash(100 - zAcc);
    setZAmount(Number(billWithoutMedAndCt * (zAcc / 100)));
    setRecievable(total - billWithoutMedAndCt * (zAcc / 100) - deposit);
    console.log(zAmount);
    setOtherAmount(0);
  };

  const singlePanel = () => {
    let cashPer = 100 - other;
    setCash(cashPer);
    setZAmount(0);
    setOtherAmount(Number(total - total * (cashPer / 100)));
    setRecievable(total * (cashPer / 100) - deposit);
    console.log(otherAmount);
  };

  const dualPartyComp = (value) => {
    let z_Amm;
    let panelAdjustment;
    if (!value) {
      let billWithoutMedAndCt = total - CT - medicine; // bill without medicine
      z_Amm = Number(billWithoutMedAndCt * (zAcc / 100));
      setZAmount(z_Amm);
      let CalAmm = 100 - other - zAcc;
      setCash(CalAmm);
      let recieved = Number(total * (CalAmm / 100) - deposit);
      setRecievable(recieved);
      panelAdjustment = total - recieved - z_Amm;
      setOtherAmount(+panelAdjustment);
    } else {
      let CalAmm = 100 - other - zAcc;
      setCash(CalAmm);
      z_Amm = Number(total * (zAcc / 100));
      let recieved = Number(total * (CalAmm / 100) - deposit);
      setRecievable(recieved);
      setZAmount(z_Amm);
      panelAdjustment = +total - +z_Amm;
      setOtherAmount(panelAdjustment);
    }
  };

  const dualPartyPartition = () => {
    let billWithoutMedAndCt = total - CT - medicine; // bill without medicine
    let z_Amm = Number(billWithoutMedAndCt * (zAcc / 100));
    setZAmount(z_Amm);
    console.log("Adjust on zakat ", zAmount);

    let CalAmm = 100 - other - zAcc;
    setCash(CalAmm);
    let recieving = Number(total * (CalAmm / 100) - deposit);
    let recievingShow = Number(total * (CalAmm / 100));
    setRecievable(recieving);
    let panelAdjustment = total - recievingShow - z_Amm;
    setOtherAmount(+panelAdjustment);
    console.log("Adjusted On Panel 1 ", panelAdjustment);
  };

  const parentFunc = () => {
    console.log({ zAcc: +zAcc, other: +other });

    if (+zAcc > 0 && +other === 0) {
      console.log("Z only");
      ZAccountOnly();
      return;
    }
    if (+zAcc === 0 && +other > 0) {
      console.log("Single Panel");
      singlePanel();
      return;
    }
    if (+other !== 0 && +zAcc !== 0) {
      if (100 - +other - +zAcc === 0) {
        dualPartyComp();
        console.log("Dual party comp");
        return;
      } else {
        console.log("Dual party partition");
        dualPartyPartition();
        return;
      }
    }
  };

  return (
    <div>
      <Header inpShow={false} />

      <div className="flex flex-col items-center mt-4 space-y-4">
        <LabeledInput
          label={"Medicine Charges"}
          placeholder={"Medicine Charges"}
          onChange={(e) => setMedicine(e.target.value)}
          value={medicine}
          type="Number"
        />
        <LabeledInput
          label={"CT-Scan / MRI"}
          placeholder={"CT-Scan / MRI"}
          onChange={(e) => setCT(e.target.value)}
          value={CT}
          type="Number"
        />
        <LabeledInput
          label={"Total Charges"}
          placeholder={"Total Charges"}
          onChange={(e) => setTotal(e.target.value)}
          value={total}
          type="Number"
        />
        <LabeledInput
          label={"Deposited Amount"}
          placeholder={"Deposited Amount"}
          onChange={(e) => setDeposit(e.target.value)}
          value={deposit}
          type="Number"
        />
        <LabeledInput
          label={"Z Account %"}
          placeholder={"Z Account %"}
          onChange={(e) => setZAcc(e.target.value)}
          value={zAcc}
          type="Number"
        />
        <LabeledInput
          label={"Other Panel %"}
          placeholder={"Other Panel %"}
          onChange={(e) => setOther(e.target.value)}
          value={other}
          type="Number"
        />
        <LabeledInput
          label={"Cash %"}
          disabled={true}
          placeholder={"Cash %"}
          onChange={(e) => setCash(e.target.value)}
          value={cash}
        />
        <LabeledInput
          label={"Recievable"}
          disabled={true}
          placeholder={"Recievable"}
          value={recievable}
        />
      </div>

      <div className="flex justify-center space-x-3 mt-6">
        <ButtonDis onClick={parentFunc} title={"Calculate"} />
        <ButtonDis
          onClick={() => dualPartyComp("Sayl")}
          title={"Saylani"}
          disabled={+other + +zAcc === 100 ? false : true}
        />
        <ButtonDis title={"Refresh"} onClick={reset} />
      </div>
      <div className="flex justify-center mt-11">
        <div
          className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4 p-3 rounded-3xl flex flex-col items-center space-y-3"
          style={{ width: "600px" }}
        >
          <CenterHeading title={"Amount Breakup"} />
          <LabeledInput
            label={"Amount On Z-Account"}
            disabled={true}
            value={zAmount}
          />
          <LabeledInput
            label={"Amount On Penal"}
            disabled={true}
            value={otherAmount}
          />
          <LabeledInput
            label={"Amount Recievable"}
            disabled={true}
            value={recievable}
          />
        </div>
      </div>
    </div>
  );
};

export default WelfareCalc;
