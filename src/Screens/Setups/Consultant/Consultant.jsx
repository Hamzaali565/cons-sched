import React, { useRef, useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../Components/Button/ButtonDis";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Modal/Loader";
import { ErrorAlert, SuccessAlert } from "../../../Components/Alert/Alert";
import ConsultantModal from "../../../Components/Modal/ConsultantModal";
import SpecialityModal from "../../../Components/Modal/SpecialityModal";
import Header from "../../../Components/Header/Header";
import moment from "moment";
import VideoModal from "../../../Components/Modal/VideoModal";
import LabelledDropDown from "../../../Components/LabelledDropDown/LabelledDropDown";

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
  const [leaveDate, setLeaveDate] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [onLeave, setOnLeave] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [appointmentFee, setAppointmentFee] = useState(0);
  const [welfareFee, setWelfareFee] = useState(0);
  const [consultantShare, setConsultantShare] = useState(0);
  const [specificType, setSpecificType] = useState(false);
  const [specificCharges, setSpecificCharges] = useState(0);
  const [specificRoom, setSpecificRoom] = useState("");
  const [specificDay, setSpecificDay] = useState("");
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    _id: "",
    type: "",
  });
  const [vidMetaData, setVidMetaData] = useState({
    videoTitle: "",
    playAt: "",
    specific: false,
    status: false,
  });
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
    setLeaveDate("");
    setSpecificType(false);
    setSpecificCharges(0);
    setSpecificRoom("");
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
    setLeaveDate(data?.leaveDate || "");
    setSpecificType(data?.specificType);
    setSpecificCharges(data?.specificCharges);
    setSpecificRoom(data?.specificRoom);
    setSpecificDay(
      !data?.specificDay || data?.specificDay === ""
        ? "MONDAY"
        : data?.specificDay
    );
  };

  const submitData = async () => {
    try {
      setOpen(true);
      const response = await axios.post(`${url}/adddoctor`, {
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
        leaveDate,
        specificType,
        specificCharges,
        specificDay,
        specificRoom,
        _id: (details && details?._id) || "",
      });
      setOpen(false);
      console.log("specificDay", specificDay);

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
      const response = await axios.post(`${url}/specialty`, {
        speciality:
          (updateSpeciality && updateSpeciality?.speciality) || speciality,
        _id: (updateSpeciality && updateSpeciality?._id) || "",
      });

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

  const updateProfileData = (value, key) => {
    setFormData((prev) => ({
      ...prev,
      name: key === "speciality" ? value?.speciality : value?.name,
      _id: value?._id,
      type: key === "speciality" ? "speciality" : "consultant",
    }));
  };

  const handleFileChange = (event) => {
    console.log(event.target.files);
    setFile(event.target.files[0]);
  };

  const handleSubmitUrl = async (urlData) => {
    try {
      const response = await axios.put(`${url}/profile`, {
        _id: formData?._id,
        imageUrl: urlData,
      });
      console.log(response);
      SuccessAlert({ text: "Image uploaded successfully !!!", timer: 2000 });
      resetProfile();
    } catch (error) {
      console.error("Error uploading file:", error);
      ErrorAlert({ text: "Image uploading failed !!!", timer: 2000 });
    }
  };

  const handleSubmitTo3003 = async (event) => {
    if (!file) {
      ErrorAlert({ text: "Please select file !!!", timer: 2000 });
      return;
    } else if (formData?.name === "") {
      ErrorAlert({ text: "Please select consultant !!!" });
      return;
    }

    const data = new FormData();
    data.append("image", file); // Add the image

    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await axios.post(
        `http://localserver:3003/upload`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      handleSubmitUrl(response?.data?.url);
    } catch (error) {
      console.error("Error uploading file:", error);
      ErrorAlert({ text: "Image uploading failed !!!", timer: 2000 });
    }
  };

  const handleSubmitVidTo3003 = async (event) => {
    if (!file) {
      ErrorAlert({ text: "Please select file !!!", timer: 2000 });
      return;
    } else if (!vidMetaData?.videoTitle) {
      ErrorAlert({ text: "Please Enter Video Title !!!", timer: 2000 });
      return;
    } else if (vidMetaData?.specific === true) {
      if (!vidMetaData?.playAt) {
        ErrorAlert({ text: "Please Enter Ply Time !!!", timer: 2000 });
        return;
      }
    }
    const data = new FormData();
    data.append("video", file); // Add the image

    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      const response = await axios.post(
        `http://localserver:3003/upload-video`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      submitVideoData(response?.data?.url);
    } catch (error) {
      console.log("Error uploading file:", error);
      ErrorAlert({
        text: "Video uploading Failed !!!",
        timer: 2000,
      });
    }
  };

  const submitVideoData = async (VidUrl) => {
    try {
      const response = await fetch(`${url}/video`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoUrl: VidUrl,
          videoTitle: vidMetaData?.videoTitle,
          specific: vidMetaData?.specific,
          playAt: vidMetaData?.playAt,
          status: vidMetaData?.status,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      SuccessAlert({
        text: "Video uploaded successfully !!!",
        timer: 2000,
      });
      resetVideoMetaDeta();
    } catch (error) {
      console.log(error);
    }
  };
  const updateVideoData = async () => {
    try {
      const response = await fetch(`${url}/video`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoTitle: vidMetaData?.videoTitle,
          specific: vidMetaData?.specific,
          playAt: vidMetaData?.playAt,
          status: vidMetaData?.status,
          _id: vidMetaData?._id,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      SuccessAlert({
        text: "Video Data Updated successfully !!!",
        timer: 2000,
      });
      resetVideoMetaDeta();
    } catch (error) {
      console.log(error);
      ErrorAlert({ text: "Video update failed !!!", timer: 2000 });
    }
  };
  const fileInputRef = useRef(null);

  const UpdateMetaDeta = (value, key) => {
    setVidMetaData((prev) => ({ ...prev, [key]: value }));
    console.log(vidMetaData);
    return;
  };

  const resetProfile = () => {
    setFormData({ name: "", _id: "", type: "" });
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the input field
    }
  };
  const resetVideoMetaDeta = () => {
    setVidMetaData({
      videoTitle: "",
      specific: false,
      playAt: "",
      status: false,
    });
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the input field
    }
  };
  return (
    <div>
      <Header inpShow={false} />
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Consultant"} />
        <div className="flex justify-center my-4 space-x-2">
          <ConsultantModal
            title={"Select Consultant"}
            onClick={(e) => {
              updateDetails(e);
              console.log(e);
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
            label={"Name*"}
            placeholder={"Please Enter Name"}
            value={name}
            onChange={(e) => setName(e.target.value.toUpperCase())}
          />
          <LabeledInput
            label={"Speciality*"}
            placeholder={"Speciality"}
            value={(specialityData && specialityData?.speciality) || ""}
            disabled={true}
            onChange={(e) => setSpeciality(e.target.value.toUpperCase())}
          />
          <LabeledInput
            label={"PMDC*"}
            placeholder={"PMDC"}
            value={pmdc}
            onChange={(e) => setPmdc(e.target.value.toUpperCase())}
          />

          <LabeledInput
            label={"Address*"}
            placeholder={"Address"}
            value={address}
            onChange={(e) => setAddress(e.target.value.toUpperCase())}
          />
          <LabeledInput
            label={"Email*"}
            placeholder={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
          <LabeledInput
            label={"CNIC*"}
            placeholder={"CNIC"}
            value={cnic}
            type={"Number"}
            onChange={(e) => setCnic(e.target.value.toUpperCase())}
          />
          <LabeledInput
            label={"Phone*"}
            placeholder={"Phone"}
            value={phone}
            type={"Number"}
            onChange={(e) => setPhone(e.target.value.toUpperCase())}
          />
          <LabeledInput
            label={"Status*"}
            type={"checkbox"}
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
          <LabeledInput
            label={"Day 1*"}
            placeholder={"MON - TUES - WED"}
            value={days ? days : ""}
            onChange={(e) => setDays(e.target.value.toUpperCase())}
          />
          <LabeledInput
            label={"Timing of Day 1*"}
            onChange={(e) => setTiming(e.target.value.toUpperCase())}
            value={timing ? timing : ""}
            placeholder={"12pm - 2pm"}
          />
          <LabeledInput
            label={"Day 2"}
            placeholder={"MON - TUES - WED"}
            value={days1 ? days1 : ""}
            onChange={(e) => setDays1(e.target.value.toUpperCase())}
          />
          <LabeledInput
            label={"Timing of Day 2"}
            onChange={(e) => setTiming1(e.target.value.toUpperCase())}
            value={timing1 ? timing1 : ""}
            placeholder={"4pm - 6pm"}
          />
          <LabeledInput
            label={"Day 3"}
            placeholder={"MON - TUES - WED"}
            value={days2 ? days2 : ""}
            onChange={(e) => setDays2(e.target.value.toUpperCase())}
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
            label={"Room No*"}
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
            label={"Appointment Fee*"}
            onChange={(e) => setAppointmentFee(e.target.value)}
            value={appointmentFee ? appointmentFee : ""}
            type={"Number"}
            placeholder={"1200"}
          />
          <LabeledInput
            label={"Ext. No*"}
            onChange={(e) => setWelfareFee(e.target.value)}
            value={welfareFee ? welfareFee : ""}
            placeholder={"151"}
          />
          <LabeledInput
            label={"Consultant Share"}
            onChange={(e) => setConsultantShare(e.target.value)}
            value={consultantShare ? consultantShare : ""}
            placeholder={"70"}
          />
          <LabeledInput
            label={"Leave Date"}
            onChange={(e) => setLeaveDate(e.target.value)}
            type={"date"}
            value={leaveDate ? moment(leaveDate).format("YYYY-MM-DD") : ""}
          />
          <LabeledInput
            label={"Specific Type"}
            onChange={(e) => setSpecificType(e.target.checked)}
            type={"checkbox"}
            checked={specificType}
          />
          <LabeledInput
            label={"Specific Charges"}
            onChange={(e) => setSpecificCharges(e.target.value)}
            type={"number"}
            value={specificCharges ? specificCharges : ""}
            placeholder={"2000"}
          />

          <LabelledDropDown
            data={[
              { name: "MONDAY" },
              { name: "TUESDAY" },
              { name: "WEDNESDAY" },
              { name: "THURSDAY" },
              { name: "FRIDAY" },
              { name: "SATURDAY" },
              { name: "SUNDAY" },
            ]}
            label={"SPECIFIC DAY"}
            onChange={(e) => setSpecificDay(e)}
          />
          <LabeledInput
            label={"Specific Room"}
            onChange={(e) => setSpecificRoom(e.target.value.toUpperCase())}
            value={specificRoom ? specificRoom : ""}
            placeholder={"E.X.T"}
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

        <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"Consultant Profile"} />
          <div className="flex justify-center items-center flex-col space-y-5 mt-3">
            <ConsultantModal
              title={"Select Consultant"}
              onClick={(e) => {
                updateProfileData(e, "Cons");
              }}
            />

            <LabeledInput
              disabled={true}
              label={"Consultant Name"}
              placeholder={"Consultant Name"}
              value={formData.type === "consultant" ? formData?.name : "" || ""}
            />

            <LabeledInput
              label={"Consultant Profile"}
              type={"file"}
              accept={"image/*"}
              onChange={(e) => handleFileChange(e)}
              ref={fileInputRef}
            />
            <div className="flex space-x-4">
              <ButtonDis title={"Save"} onClick={handleSubmitTo3003} />
              <ButtonDis title={"Reset"} onClick={resetProfile} />
            </div>
          </div>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"Upload Video"} />
          <div className="flex justify-center items-center flex-col space-y-5 mt-3">
            <VideoModal
              title={"Update Video"}
              onClick={(e) => setVidMetaData(e)}
            />
            <LabeledInput
              label={"Consultant Profile"}
              type={"file"}
              accept={"video/*"}
              onChange={(e) => handleFileChange(e)}
              ref={fileInputRef}
            />
            <LabeledInput
              label={"Video Name"}
              placeholder={"Video Name"}
              onChange={(e) =>
                UpdateMetaDeta(e.target.value.toUpperCase(), "videoTitle")
              }
              value={vidMetaData?.videoTitle || ""}
            />
            <LabeledInput
              label={"Specific"}
              type={"Checkbox"}
              onChange={(e) => UpdateMetaDeta(e.target.checked, "specific")}
              checked={vidMetaData?.specific}
            />
            <LabeledInput
              label={"Specific Time"}
              type={"time"}
              // onChange={(e) => UpdateMetaDeta(e.target.value, "playAt")}
              value={vidMetaData?.playAt || ""}
              onChange={(e) =>
                setVidMetaData((prev) => ({
                  ...prev,
                  playAt: e.target.value,
                }))
              }
            />
            <LabeledInput
              label={"Status"}
              type={"Checkbox"}
              onChange={(e) => UpdateMetaDeta(e.target.checked, "status")}
              checked={vidMetaData?.status}
            />
            <div className="flex space-x-4">
              <ButtonDis
                title={"Save"}
                onClick={
                  !vidMetaData?._id || vidMetaData?._id === ""
                    ? handleSubmitVidTo3003
                    : updateVideoData
                }
              />
              <ButtonDis title={"Reset"} onClick={resetVideoMetaDeta} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultant;
