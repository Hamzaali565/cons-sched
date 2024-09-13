import React, { useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../Components/Button/ButtonDis";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Modal/Loader";
import { ErrorAlert, SuccessAlert } from "../../../Components/Alert/Alert";
import ConsultantModal from "../../../Components/Modal/ConsultantModal";
import SpecialityModal from "../../../Components/Modal/SpecialityModal";

const Consultant = () => {
  const [name, setName] = useState("");
  const [specialityData, setSpecialityData] = useState(null);
  const [pmdc, setPmdc] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const [speciality, setSpeciality] = useState("");
  const [specialityId, setSpecialityId] = useState("");
  const [updateSpeciality, setUpdateSpeciality] = useState(null);
  const [days, setDays] = useState("");
  const [days1, setDays1] = useState("");
  const [days2, setDays2] = useState("");
  const [timing, setTiming] = useState("");
  const [timing1, setTiming1] = useState("");
  const [timing2, setTiming2] = useState("");
  const [qualification, setQualification] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [onLeave, setOnLeave] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [appointmentFee, setAppointmentFee] = useState(0);
  const [welfareFee, setWelfareFee] = useState(0);
  const [consultantShare, setConsultantShare] = useState(0);

  const url = useSelector((item) => item.url);

  const resetFunction = () => {
    setName("");
    setSpeciality("");
    setPmdc("");
    setAddress("");
    setEmail("");
    setCnic("");
    setPhone("");
    setStatus(false);
    setDetails(null);
    setSpecialityData(null);
    setTiming("");
    setTiming1("");
    setTiming2("");
    setDays("");
    setDays1("");
    setDays2("");
    setRoomNo("");
    setQualification("");
    setOnLeave(false);
    setRemarks("");
    setAppointmentFee(0);
    setWelfareFee(0);
    setConsultantShare(0);
  };

  const updateDetails = (data) => {
    setDetails(data);
    setName(data?.name);
    setSpecialityData({ speciality: data?.speciality });
    setSpecialityId(data?.specialityId);
    setPmdc(data?.pmdc);
    setAddress(data?.address);
    setEmail(data?.email);
    setCnic(data?.cnic);
    setPhone(data?.phone);
    setStatus(data?.status);
    setDays(data?.days);
    setDays1(data?.days1);
    setDays2(data?.days2);
    setTiming(data?.timing);
    setTiming1(data?.timing1);
    setTiming2(data?.timing2);
    setQualification(data?.qualification);
    setRoomNo(data?.roomNo);
    setOnLeave(data?.onLeave);
    setRemarks(data?.remarks);
    setAppointmentFee(data?.appointmentFee);
    setWelfareFee(data?.welfareFee);
    setConsultantShare(data?.consultantShare);
  };

  const submitData = async () => {
    try {
      setOpen(true);
      const response = await axios.post(
        `${url}/adddoctor`,
        {
          name,
          speciality:
            (specialityData && specialityData?.speciality) || speciality,
          specialityId: (specialityData && specialityData?._id) || specialityId,
          pmdc,
          address,
          email,
          cnic,
          phone,
          status,
          timing,
          timing1,
          days,
          days1,
          days2,
          timing2,
          qualification,
          roomNo,
          onLeave,
          remarks,
          consultantShare,
          appointmentFee,
          welfareFee,

          _id: (details && details?._id) || "",
        },
        { withCredentials: true }
      );
      setOpen(false);
      if (response?.data?.message === "created") {
        SuccessAlert({ text: "DOCTOR CREATED SUCCESSFULLY !!!", timer: 2000 });
      }
      if (response?.data?.message === "update") {
        SuccessAlert({ text: "DOCTOR UPDATED SUCCESSFULLY !!!", timer: 2000 });
      }
      resetFunction();
    } catch (error) {
      console.log("Error of submit data", error);
      setOpen(false);
      ErrorAlert({ text: "DOCTOR CREATION FAILED !!!" });
    }
  };

  const submitSpeciality = async () => {
    try {
      setOpen(true);
      const response = await axios.post(
        `${url}/specialty`,
        {
          speciality:
            (updateSpeciality && updateSpeciality?.speciality) || speciality,
          _id: (updateSpeciality && updateSpeciality?._id) || "",
        },
        { withCredentials: true }
      );

      setSpeciality("");
      setUpdateSpeciality(null);
      setOpen(false);
      SuccessAlert({
        text: "SPECIALITY CREATED / UPDATED SUCCESSFULLY !!!",
        timer: 2000,
      });
    } catch (error) {
      console.log("Error of submitSpeciality", error);
      setOpen(false);
    }
  };

  const handleSpeciality = (name) => {
    if (updateSpeciality) {
      setUpdateSpeciality({
        ...updateSpeciality,
        speciality: name.toUpperCase(),
      });
      return;
    }
    setSpeciality(name.toUpperCase());
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Consultant"} />
      <div className="flex justify-center my-4 space-x-2">
        <ConsultantModal
          title={"Select Consultant"}
          onClick={(e) => {
            updateDetails(e);
          }}
          All="Ok"
        />
        <SpecialityModal
          title={"Select Speciality"}
          onClick={(data) => setSpecialityData(data)}
        />
      </div>
      <div className="flex flex-col items-center space-y-2 mt-3 md:grid md:grid-cols-2 md:justify-items-center md:gap-y-2">
        <LabeledInput
          label={"Name"}
          placeholder={"Please Enter Name"}
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase())}
        />
        <LabeledInput
          label={"Speciality"}
          placeholder={"Speciality"}
          value={(specialityData && specialityData?.speciality) || ""}
          disabled={true}
          onChange={(e) => setSpeciality(e.target.value.toUpperCase())}
        />
        <LabeledInput
          label={"PMDC"}
          placeholder={"PMDC"}
          value={pmdc}
          onChange={(e) => setPmdc(e.target.value.toUpperCase())}
        />

        <LabeledInput
          label={"Address"}
          placeholder={"Address"}
          value={address}
          onChange={(e) => setAddress(e.target.value.toUpperCase())}
        />
        <LabeledInput
          label={"Email"}
          placeholder={"Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />
        <LabeledInput
          label={"CNIC"}
          placeholder={"CNIC"}
          value={cnic}
          type={"Number"}
          onChange={(e) => setCnic(e.target.value.toUpperCase())}
        />
        <LabeledInput
          label={"Phone"}
          placeholder={"Phone"}
          value={phone}
          type={"Number"}
          onChange={(e) => setPhone(e.target.value.toUpperCase())}
        />
        <LabeledInput
          label={"Status"}
          type={"checkbox"}
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
        />
        <LabeledInput
          label={"Day 1 "}
          placeholder={"MON - TUES - WED"}
          value={days ? days : ""}
          onChange={(e) => setDays(e.target.value.toUpperCase())}
        />
        <LabeledInput
          label={"Day 2"}
          placeholder={"MON - TUES - WED"}
          value={days1 ? days1 : ""}
          onChange={(e) => setDays1(e.target.value.toUpperCase())}
        />
        <LabeledInput
          label={"Day 3"}
          placeholder={"MON - TUES - WED"}
          value={days2 ? days2 : ""}
          onChange={(e) => setDays2(e.target.value.toUpperCase())}
        />
        <LabeledInput
          label={"Timing of Day 1"}
          onChange={(e) => setTiming(e.target.value.toUpperCase())}
          value={timing ? timing : ""}
          placeholder={"12pm - 2pm"}
        />
        <LabeledInput
          label={"Timing of Day 2"}
          onChange={(e) => setTiming1(e.target.value.toUpperCase())}
          value={timing1 ? timing1 : ""}
          placeholder={"4pm - 6pm"}
        />
        <LabeledInput
          label={"Timing of Day 3 "}
          onChange={(e) => setTiming2(e.target.value.toUpperCase())}
          value={timing2 ? timing2 : ""}
          placeholder={"8pm - 10pm"}
        />
        <LabeledInput
          label={"Qualification"}
          onChange={(e) => setQualification(e.target.value.toUpperCase())}
          value={qualification ? qualification : ""}
          placeholder={"MBBS, DTCD (UK)"}
        />
        <LabeledInput
          label={"Room No"}
          onChange={(e) => setRoomNo(e.target.value.toUpperCase())}
          value={roomNo ? roomNo : ""}
          placeholder={"OPD 6-A FIRST FLOOR"}
        />
        <LabeledInput
          label={"Remarks"}
          onChange={(e) => setRemarks(e.target.value.toUpperCase())}
          value={remarks ? remarks : ""}
          placeholder={"Remarks"}
        />
        <LabeledInput
          label={"OnLeave"}
          type={"checkbox"}
          checked={onLeave}
          onChange={(e) => setOnLeave(e.target.checked)}
        />
        <LabeledInput
          label={"Appointment Fee"}
          onChange={(e) => setAppointmentFee(e.target.value)}
          value={appointmentFee ? appointmentFee : ""}
          type={"Number"}
          placeholder={"1200"}
        />
        <LabeledInput
          label={"Welfare Fee"}
          onChange={(e) => setWelfareFee(e.target.value)}
          value={welfareFee ? welfareFee : ""}
          placeholder={"700"}
        />
        <LabeledInput
          label={"Consultant Share"}
          onChange={(e) => setConsultantShare(e.target.value)}
          value={consultantShare ? consultantShare : ""}
          placeholder={"70"}
        />
      </div>
      <div className="flex flex-col mt-4 items-center space-y-2 md:flex-row md:justify-center md:space-y-0 md:space-x-2">
        <ButtonDis title={"Save"} onClick={submitData} />
        <ButtonDis title={"Refresh"} onClick={resetFunction} />
      </div>
      <Loader onClick={open} title={"DATA SUBMITTING ..."} />
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Create Consultant Speciality"} />
        <div className="flex justify-center mt-3">
          <SpecialityModal
            title={"Update Speciality"}
            onClick={(data) => setUpdateSpeciality(data)}
          />
        </div>
        <div className="flex items-center flex-col space-y-3 mt-4">
          <LabeledInput
            label={"Enter Speciality"}
            placeholder={"Enter Speciality"}
            onChange={(e) => handleSpeciality(e.target.value)}
            value={
              (updateSpeciality && updateSpeciality?.speciality) || speciality
            }
          />
          <div className="flex space-x-3">
            <ButtonDis title={"Save"} onClick={submitSpeciality} />
            <ButtonDis
              title={"Refresh"}
              onClick={() => {
                setSpeciality("");
                setUpdateSpeciality(null);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultant;
