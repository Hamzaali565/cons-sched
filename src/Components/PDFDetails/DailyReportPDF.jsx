import React from "react";
import {
  Text,
  Page,
  Document,
  StyleSheet,
  View,
  Image,
  Font,
} from "@react-pdf/renderer";
import logo from "../../Images/ZMCLogo-.png";
import moment from "moment";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf",
});

const DailyReportPDF = ({ data }) => {
  const totalBeds =
    data?.execAll +
    data?.pvtAll +
    data?.sPvtAll +
    data?.mgwAll +
    data?.fgwAll +
    data?.gynaeAll +
    data?.pgwAll +
    data?.picuAll +
    data?.pgwIsoAll +
    data?.picuIsoAll +
    data?.nicuAll +
    data?.icuAll +
    data?.isoWardAll +
    data?.icuIsoAll;

  const OccBeds =
    (data?.["Executive Room"] ?? 0) +
    (data?.["Private Ward"] ?? 0) +
    (data?.["Semi Private"] ?? 0) +
    (data?.["Male General Ward"] ?? 0) +
    (data?.["Female General Ward"] ?? 0) +
    (data?.["Gynae Ward (L.R)"] ?? 0) +
    (data?.["Peads Gereral Ward"] ?? 0) +
    (data?.["Peads I.C.U"] ?? 0) +
    (data?.["Peads Gereral Ward ISO"] ?? 0) +
    (data?.["Peads I.C.U ISO"] ?? 0) +
    (data?.["NICU Ward"] ?? 0) +
    (data?.["ICU"] ?? 0) +
    (data?.["Isolation Ward"] ?? 0) +
    (data?.["ICU ISO"] ?? 0);

  let vacantBeds =
    (data?.execAll ?? 0) -
    (data?.["Executive Room"] ?? 0) +
    (data?.pvtAll ?? 0) -
    (data?.["Private Ward"] ?? 0) +
    (data?.sPvtAll ?? 0) -
    (data?.["Semi Private"] ?? 0) +
    (data?.mgwAll ?? 0) -
    (data?.["Male General Ward"] ?? 0) +
    (data?.fgwAll ?? 0) -
    (data?.["Female General Ward"] ?? 0) +
    (data?.gynaeAll ?? 0) -
    (data?.["Gynae Ward (L.R)"] ?? 0) +
    (data?.pgwAll ?? 0) -
    (data?.["Peads Gereral Ward"] ?? 0) +
    (data?.picuAll ?? 0) -
    (data?.["Peads I.C.U"] ?? 0) +
    (data?.pgwIsoAll ?? 0) -
    (data?.["Peads Gereral Ward ISO"] ?? 0) +
    (data?.picuIsoAll ?? 0) -
    (data?.["Peads I.C.U ISO"] ?? 0) +
    (data?.nicuAll ?? 0) -
    (data?.["NICU Ward"] ?? 0) +
    (data?.icuAll ?? 0) -
    (data?.["ICU"] ?? 0) +
    (data?.isoWardAll ?? 0) -
    (data?.["Isolation Ward"] ?? 0) +
    (data?.icuIsoAll ?? 0) -
    (data?.["ICU ISO"] ?? 0);

  console.log(vacantBeds);

  let opdDay =
    data?.opdRevenueDay +
    data?.ErMedicineDay +
    data?.ErServiceDay +
    data?.DsSaleDay +
    data?.dvagoSaleDay +
    data?.RadioRevenueDay +
    data?.LabRevDay +
    data?.OTDay;

  let opdMonth =
    data?.opdRevenueMonth +
    data?.ErMedicineMonth +
    data?.ErServiceMonth +
    data?.dsSaleMonth +
    data?.dvagoSaleMonth +
    data?.RadioRevenueMonth +
    data?.LabRevMonth +
    data?.OTMonth;

  const MyPage = ({ children }) => (
    <Page style={styles.page}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.logoContainer}>
          <Image src={logo} style={styles.Image} />
        </View>
      </View>
      <View style={styles.content}>{children}</View>
      {/* <View style={styles.footer} />
      <View style={styles.pageNumber}>
        <Text
          style={{ textDecoration: "underline" }}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </View> */}
    </Page>
  );

  return (
    <Document>
      <MyPage>
        <View style={styles.headC1}>
          <Text>
            Daily Report {moment().subtract(1, "days").format("DD-MM-YYYY")}
          </Text>
        </View>
        {/* Present Patient Summary */}
        <View
          style={{
            flexDirection: "row",
            // justifyContent: "space-around",
            fontSize: 10,
            border: "1px solid black",
            marginTop: 5,
            width: "80%",
            marginHorizontal: "auto",
            backgroundColor: "#B8CCE4",
          }}
        >
          <Text
            style={{
              borderRight: "1px solid black",
              textAlign: "center",
              width: "20%",
            }}
          >
            {moment().subtract(2, "days").format("DD-MM-YYYY")}
          </Text>
          <Text
            style={{
              borderRight: "1px solid black",
              textAlign: "center",
              width: "20%",
            }}
          >
            Admission
          </Text>
          <Text
            style={{
              borderRight: "1px solid black",
              textAlign: "center",
              width: "20%",
            }}
          >
            Discharge
          </Text>
          <Text
            style={{
              borderRight: "1px solid black",
              textAlign: "center",
              width: "20%",
            }}
          >
            Present
          </Text>
          <Text style={{ width: "20%", textAlign: "center" }}>Death/Lama</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            fontSize: 10,
            border: "1px solid black",
            borderTop: 0,
            width: "80%",
            marginHorizontal: "auto",
            backgroundColor: "#D99795",
          }}
        >
          <Text
            style={{
              borderRight: "1px solid black",
              textAlign: "center",
              width: "20%",
            }}
          >
            {data?.prevAdmission}
          </Text>
          <Text
            style={{
              borderRight: "1px solid black",
              textAlign: "center",
              width: "20%",
            }}
          >
            {data?.curAdmission}
          </Text>
          <Text
            style={{
              borderRight: "1px solid black",
              textAlign: "center",
              width: "20%",
            }}
          >
            {data?.discharge}
          </Text>
          <Text
            style={{
              borderRight: "1px solid black",
              textAlign: "center",
              width: "20%",
            }}
          >
            {data?.presentPatients}
          </Text>
          <Text style={{ width: "20%", textAlign: "center" }}>
            {data?.death} / {data?.lama}
          </Text>
        </View>
        {/* Ward wise patient */}
        <View
          style={{
            width: "80%",
            marginHorizontal: "auto",
          }}
        >
          <Text
            style={{
              fontSize: 10,
              color: "black",
              textAlign: "center",
              border: "1px solid black",
              marginTop: 4,
              padding: 2,
              backgroundColor: "#B8CCE4",
            }}
          >
            WARD OCCUPANCY STATUS
          </Text>
          <View
            style={{
              flexDirection: "row",
              fontSize: 10,
              border: "1px solid black",
              borderTop: 0,
              backgroundColor: "#B8CCE4",
            }}
          >
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "40%",
              }}
            >
              Ward Name
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              Available beds
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              Vacant Beds
            </Text>
            <Text
              style={{
                textAlign: "center",
                width: "20%",
              }}
            >
              Occupied Beds
            </Text>
          </View>
          {/* Exec Ward */}
          <View
            style={{
              flexDirection: "row",
              fontSize: 10,
              border: "1px solid black",
              borderTop: 0,
            }}
          >
            <Text
              style={{
                borderRight: "1px solid black",

                width: "40%",
              }}
            >
              Executive Rooms
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.execAll}
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.["Executive Room"]
                ? data?.execAll - data["Executive Room"]
                : data?.execAll}
            </Text>
            <Text
              style={{
                textAlign: "center",
                width: "20%",
                backgroundColor: "#D99795",
              }}
            >
              {data?.["Executive Room"] ? data["Executive Room"] : 0}
            </Text>
          </View>

          {/* PVT Room */}
          <View
            style={{
              flexDirection: "row",
              fontSize: 10,
              border: "1px solid black",
              borderTop: 0,
            }}
          >
            <Text
              style={{
                borderRight: "1px solid black",

                width: "40%",
              }}
            >
              Private Rooms
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.pvtAll}
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.["Private Ward"]
                ? data?.pvtAll - data["Private Ward"]
                : data?.pvtAll}
            </Text>
            <Text
              style={{
                textAlign: "center",
                width: "20%",
                backgroundColor: "#D99795",
              }}
            >
              {data?.["Private Ward"] ? data["Private Ward"] : 0}
            </Text>
          </View>

          {/* Semi PVT  */}
          <View
            style={{
              flexDirection: "row",
              fontSize: 10,
              border: "1px solid black",
              borderTop: 0,
            }}
          >
            <Text
              style={{
                borderRight: "1px solid black",

                width: "40%",
              }}
            >
              Semi Private Rooms
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.sPvtAll}{" "}
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.["Semi Private"]
                ? data?.sPvtAll - data["Semi Private"]
                : data?.sPvtAll}
            </Text>
            <Text
              style={{
                textAlign: "center",
                width: "20%",
                backgroundColor: "#D99795",
              }}
            >
              {data?.["Semi Private"] ? data["Semi Private"] : 0}
            </Text>
          </View>

          {/* Male Ward */}
          <View
            style={{
              flexDirection: "row",
              fontSize: 10,
              border: "1px solid black",
              borderTop: 0,
            }}
          >
            <Text
              style={{
                borderRight: "1px solid black",

                width: "40%",
              }}
            >
              Male General Ward
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.mgwAll}
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.["Male General Ward"]
                ? data?.mgwAll - data["Male General Ward"]
                : data?.mgwAll}
            </Text>
            <Text
              style={{
                textAlign: "center",
                width: "20%",
                backgroundColor: "#D99795",
              }}
            >
              {data?.["Male General Ward"] ? data["Male General Ward"] : 0}
            </Text>
          </View>

          {/* Female General ward */}
          <View
            style={{
              flexDirection: "row",
              fontSize: 10,
              border: "1px solid black",
              borderTop: 0,
            }}
          >
            <Text
              style={{
                borderRight: "1px solid black",

                width: "40%",
              }}
            >
              Female General Ward
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.fgwAll}
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.["Female General Ward"]
                ? data?.fgwAll - data["Female General Ward"]
                : data?.fgwAll}
            </Text>
            <Text
              style={{
                textAlign: "center",
                width: "20%",
                backgroundColor: "#D99795",
              }}
            >
              {data?.["Female General Ward"] ? data["Female General Ward"] : 0}
            </Text>
          </View>

          {/* Gynae Ward */}
          <View
            style={{
              flexDirection: "row",
              fontSize: 10,
              border: "1px solid black",
              borderTop: 0,
            }}
          >
            <Text
              style={{
                borderRight: "1px solid black",

                width: "40%",
              }}
            >
              Gynae Ward (L.R)
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.gynaeAll}
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.["Gynae Ward (L.R)"]
                ? data?.gynaeAll - data["Gynae Ward (L.R)"]
                : data?.gynaeAll}
            </Text>
            <Text
              style={{
                textAlign: "center",
                width: "20%",
                backgroundColor: "#D99795",
              }}
            >
              {data?.["Gynae Ward (L.R)"] ? data["Gynae Ward (L.R)"] : 0}
            </Text>
          </View>

          {/* Peads General Ward */}
          <View
            style={{
              flexDirection: "row",
              fontSize: 10,
              border: "1px solid black",
              borderTop: 0,
            }}
          >
            <Text
              style={{
                borderRight: "1px solid black",

                width: "40%",
              }}
            >
              Peads General Ward
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.pgwAll}
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.["Peads Gereral Ward"]
                ? data?.pgwAll - data["Peads Gereral Ward"]
                : data?.pgwAll}
            </Text>
            <Text
              style={{
                textAlign: "center",
                width: "20%",
                backgroundColor: "#D99795",
              }}
            >
              {data?.["Peads Gereral Ward"] ? data["Peads Gereral Ward"] : 0}
            </Text>
          </View>

          {/* Peads ICU */}
          <View
            style={{
              flexDirection: "row",
              fontSize: 10,
              border: "1px solid black",
              borderTop: 0,
            }}
          >
            <Text
              style={{
                borderRight: "1px solid black",

                width: "40%",
              }}
            >
              Peads ICU
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.picuAll}
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.["Peads I.C.U"]
                ? data?.picuAll - data["Peads I.C.U"]
                : data?.picuAll}
            </Text>
            <Text
              style={{
                textAlign: "center",
                width: "20%",
                backgroundColor: "#D99795",
              }}
            >
              {data?.["Peads I.C.U"] ? data["Peads I.C.U"] : 0}
            </Text>
          </View>

          {/* Peads General Ward / Isolation bed */}
          <View
            style={{
              flexDirection: "row",
              fontSize: 10,
              border: "1px solid black",
              borderTop: 0,
            }}
          >
            <Text
              style={{
                borderRight: "1px solid black",

                width: "40%",
              }}
            >
              Peads General Ward / Isolation Bed
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.pgwIsoAll}
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.["Peads Gereral Ward ISO"]
                ? data?.pgwIsoAll - data["Peads Gereral Ward ISO"]
                : data?.pgwIsoAll}
            </Text>
            <Text
              style={{
                textAlign: "center",
                width: "20%",
                backgroundColor: "#D99795",
              }}
            >
              {data?.["Peads Gereral Ward ISO"]
                ? data["Peads Gereral Ward ISO"]
                : 0}
            </Text>
          </View>

          {/* Peads ICU / Isolation Bed */}
          <View
            style={{
              flexDirection: "row",
              fontSize: 10,
              border: "1px solid black",
              borderTop: 0,
            }}
          >
            <Text
              style={{
                borderRight: "1px solid black",

                width: "40%",
              }}
            >
              Peads ICU / Isolation Bed
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.picuIsoAll}
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.["Peads I.C.U ISO"]
                ? data?.picuIsoAll - data["Peads I.C.U ISO"]
                : data?.picuIsoAll}
            </Text>
            <Text
              style={{
                textAlign: "center",
                width: "20%",
                backgroundColor: "#D99795",
              }}
            >
              {data?.["Peads I.C.U ISO"] ? data["Peads I.C.U ISO"] : 0}
            </Text>
          </View>

          {/* Nursery Intensive Care Unit (NICU)*/}
          <View
            style={{
              flexDirection: "row",
              fontSize: 10,
              border: "1px solid black",
              borderTop: 0,
            }}
          >
            <Text
              style={{
                borderRight: "1px solid black",

                width: "40%",
              }}
            >
              Nursery Intensive Care Unit (NICU)
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.nicuAll}
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.["NICU Ward"]
                ? data?.nicuAll - data["NICU Ward"]
                : data?.nicuAll}
            </Text>
            <Text
              style={{
                textAlign: "center",
                width: "20%",
                backgroundColor: "#D99795",
              }}
            >
              {data?.["NICU Ward"] ? data["NICU Ward"] : 0}
            </Text>
          </View>

          {/* Intensive Care Unit (ICU) */}
          <View
            style={{
              flexDirection: "row",
              fontSize: 10,
              border: "1px solid black",
              borderTop: 0,
            }}
          >
            <Text
              style={{
                borderRight: "1px solid black",

                width: "40%",
              }}
            >
              Intensive Care Unit (ICU)
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.icuAll}
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.["ICU"] ? data?.icuAll - data["ICU"] : data?.icuAll}
            </Text>
            <Text
              style={{
                textAlign: "center",
                width: "20%",
                backgroundColor: "#D99795",
              }}
            >
              {data?.["ICU"] ? data["ICU"] : 0}
            </Text>
          </View>

          {/* Intensive Care Unit (ICU) */}
          <View
            style={{
              flexDirection: "row",
              fontSize: 10,
              border: "1px solid black",
              borderTop: 0,
            }}
          >
            <Text
              style={{
                borderRight: "1px solid black",

                width: "40%",
              }}
            >
              Intensive Care Unit (ICU) / Isolation
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.icuIsoAll}
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.["ICU ISO"]
                ? data?.icuIsoAll - data["ICU ISO"]
                : data?.icuIsoAll}
            </Text>
            <Text
              style={{
                textAlign: "center",
                width: "20%",
                backgroundColor: "#D99795",
              }}
            >
              {data?.["ICU ISO"] ? data["ICU ISO"] : 0}
            </Text>
          </View>

          {/* Isolation Ward */}
          <View
            style={{
              flexDirection: "row",
              fontSize: 10,
              border: "1px solid black",
              borderTop: 0,
            }}
          >
            <Text
              style={{
                borderRight: "1px solid black",

                width: "40%",
              }}
            >
              Isolation Ward
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.isoWardAll}
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
              }}
            >
              {data?.["Isolation Ward"]
                ? data?.isoWardAll - data["Isolation Ward"]
                : data?.isoWardAll}
            </Text>
            <Text
              style={{
                textAlign: "center",
                width: "20%",
                backgroundColor: "#D99795",
              }}
            >
              {data?.["Isolation Ward"] ? data["Isolation Ward"] : 0}
            </Text>
          </View>
          {/* Total Beds */}
          <View
            style={{
              flexDirection: "row",
              fontSize: 10,
              border: "1px solid black",
              borderTop: 0,
              backgroundColor: "#FBFF88",
            }}
          >
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "40%",
                fontWeight: "bold",
                padding: 2,
              }}
            >
              TOTAL
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
                // backgroundColor: "#B8CCE4",
                padding: 2,
              }}
            >
              {totalBeds}
            </Text>
            <Text
              style={{
                borderRight: "1px solid black",
                textAlign: "center",
                width: "20%",
                // backgroundColor: "#B8CCE4",
                padding: 2,
              }}
            >
              {vacantBeds}
            </Text>
            <Text
              style={{
                textAlign: "center",
                width: "20%",
                // backgroundColor: "#B8CCE4",
                padding: 2,
              }}
            >
              {OccBeds}
            </Text>
          </View>
          {/* Party Wise BreakUp And Bed occpancy status */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginTop: 3,
              gap: 4,
            }}
          >
            {/* Party Wise Breakup */}
            <View
              style={{
                flexDirection: "row",
                fontSize: 10,
                border: "1px solid black",
                // borderTop: 0,
                backgroundColor: "#B8CCE4",
                width: "45%",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  width: "35%",
                  borderRight: "1px solid black",
                  fontWeight: "bold",
                  padding: 2,
                }}
              >
                Welfare
              </Text>
              <Text
                style={{
                  padding: 2,
                  borderRight: "1px solid black",
                  textAlign: "center",
                  width: "35%",
                }}
              >
                Corporate
              </Text>
              <Text
                style={{
                  padding: 2,
                  textAlign: "center",
                  width: "30%",
                }}
              >
                Private
              </Text>
            </View>
            {/* Occupancy */}
            <View
              style={{
                flexDirection: "row",
                fontSize: 10,
                border: "1px solid black",
                // borderTop: 0,
                backgroundColor: "#B8CCE4",
                width: "55%",
                padding: 4,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Beds Occupancy
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              gap: 4,
            }}
          >
            {/* Party Wise Breakup */}
            <View
              style={{
                flexDirection: "row",
                fontSize: 10,
                border: "1px solid black",
                borderTop: 0,
                backgroundColor: "#D99795",
                width: "45%",
              }}
            >
              <Text
                style={{
                  borderRight: "1px solid black",
                  textAlign: "center",
                  width: "35%",
                  fontWeight: "bold",
                }}
              >
                {data?.welfPatient}
              </Text>
              <Text
                style={{
                  borderRight: "1px solid black",
                  textAlign: "center",
                  width: "35%",
                }}
              >
                {data?.corpPatient}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  width: "30%",
                }}
              >
                {data?.privatePatient}
              </Text>
            </View>
            {/* Occupancy */}
            <View
              style={{
                flexDirection: "row",
                fontSize: 10,
                border: "1px solid black",
                borderTop: 0,
                backgroundColor: "#D99795",
                width: "55%",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  width: "100%",
                }}
              >
                {((OccBeds * 100) / totalBeds).toFixed(2)}%
              </Text>
            </View>
          </View>
          {/* Revenue Breakup and pharmacy sale */}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              gap: 2,
              marginTop: 8,
            }}
          >
            {/* Revenue Breakup */}
            <View style={{ fontSize: 10, width: "50%" }}>
              <View
                style={{
                  border: "1px solid black",
                  backgroundColor: "#B8CCE4",
                }}
              >
                <Text style={{ textAlign: "center" }}>Revenue Breakup</Text>
              </View>
              <View
                style={{
                  border: "1px solid black",
                  flexDirection: "row",
                  borderTop: 0,
                  // width: "100%",
                }}
              >
                <Text
                  style={{
                    width: "30%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  Type
                </Text>
                <Text
                  style={{
                    width: "30%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  Today
                </Text>
                <Text
                  style={{
                    width: "40%",
                    textAlign: "center",
                  }}
                >
                  This Month
                </Text>
              </View>
              <View
                style={{
                  border: "1px solid black",
                  flexDirection: "row",
                  borderTop: 0,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    width: "30%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  OPD
                </Text>
                <Text
                  style={{
                    width: "30%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  {opdDay}
                </Text>
                <Text
                  style={{
                    width: "40%",
                    textAlign: "center",
                  }}
                >
                  {opdMonth}
                </Text>
              </View>
              <View
                style={{
                  border: "1px solid black",
                  flexDirection: "row",
                  borderTop: 0,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    width: "30%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  IPD
                </Text>
                <Text
                  style={{
                    width: "30%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  {data?.IPDDay}
                </Text>
                <Text
                  style={{
                    width: "40%",
                    textAlign: "center",
                  }}
                >
                  {data?.IPDMonth}
                </Text>
              </View>
              <View
                style={{
                  border: "1px solid black",
                  flexDirection: "row",
                  borderTop: 0,
                  width: "100%",
                  backgroundColor: "#D99795",
                }}
              >
                <Text
                  style={{
                    width: "30%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  Total
                </Text>
                <Text
                  style={{
                    width: "30%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  {data?.IPDDay + opdDay}
                </Text>
                <Text
                  style={{
                    width: "40%",
                    textAlign: "center",
                  }}
                >
                  {data?.IPDMonth + opdMonth}
                </Text>
              </View>
            </View>

            {/* Pharmacy Sale */}
            <View style={{ fontSize: 10, width: "50%" }}>
              <View
                style={{
                  border: "1px solid black",
                  backgroundColor: "#B8CCE4",
                }}
              >
                <Text style={{ textAlign: "center" }}>Pharmacy Sale</Text>
              </View>
              <View
                style={{
                  border: "1px solid black",
                  flexDirection: "row",
                  borderTop: 0,
                  // width: "100%",
                }}
              >
                <Text
                  style={{
                    width: "70%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  ER Sale
                </Text>
                <Text
                  style={{
                    width: "30%",
                    backgroundColor: "#D99795",
                    textAlign: "center",
                  }}
                >
                  {data?.ErMedicineDay}
                </Text>
              </View>

              <View
                style={{
                  border: "1px solid black",
                  flexDirection: "row",
                  borderTop: 0,
                  // width: "100%",
                }}
              >
                <Text
                  style={{
                    width: "70%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  Panel Sale
                </Text>
                <Text
                  style={{
                    width: "30%",
                    textAlign: "center",
                    backgroundColor: "#D99795",
                  }}
                >
                  {data?.dvagoSaleDay}
                </Text>
              </View>

              <View
                style={{
                  border: "1px solid black",
                  flexDirection: "row",
                  borderTop: 0,
                  // width: "100%",
                }}
              >
                <Text
                  style={{
                    width: "70%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  In Patient Sale
                </Text>
                <Text
                  style={{
                    width: "30%",
                    textAlign: "center",
                    backgroundColor: "#D99795",
                  }}
                >
                  {data?.ipdSaleDay}
                </Text>
              </View>

              <View
                style={{
                  border: "1px solid black",
                  flexDirection: "row",
                  borderTop: 0,
                  // width: "100%",
                }}
              >
                <Text
                  style={{
                    width: "70%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  Total Sale
                </Text>
                <Text
                  style={{
                    width: "30%",
                    backgroundColor: "#D99795",
                    textAlign: "center",
                  }}
                >
                  {data?.ErMedicineDay + data?.dvagoSaleDay + data?.ipdSaleDay}
                </Text>
              </View>

              <View
                style={{
                  border: "1px solid black",
                  flexDirection: "row",
                  borderTop: 0,

                  // width: "100%",
                }}
              >
                <Text
                  style={{
                    width: "70%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                    padding: 2,
                  }}
                >
                  Local Purchase
                </Text>
                <Text
                  style={{
                    width: "30%",
                    padding: 2,
                    textAlign: "center",
                    backgroundColor: "#D99795",
                  }}
                >
                  --
                </Text>
              </View>
            </View>
          </View>
          {/* Consultant Opd And Emergency */}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              gap: 5,
              marginTop: 8,
            }}
          >
            {/*Consultant Clinic */}
            <View style={{ fontSize: 10, width: "30%" }}>
              <View
                style={{
                  border: "1px solid black",
                  backgroundColor: "#B8CCE4",
                }}
              >
                <Text style={{ textAlign: "center" }}>Consultant Clinics</Text>
              </View>
              <View
                style={{
                  border: "1px solid black",
                  flexDirection: "row",
                  borderTop: 0,
                  // width: "100%",
                }}
              >
                <Text
                  style={{
                    width: "50%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  No. of Private Patients
                </Text>

                <Text
                  style={{
                    width: "50%",
                    textAlign: "center",
                  }}
                >
                  No. of Panel Patients
                </Text>
              </View>
              <View
                style={{
                  border: "1px solid black",
                  flexDirection: "row",
                  borderTop: 0,
                  width: "100%",
                  backgroundColor: "#D99795",
                }}
              >
                <Text
                  style={{
                    width: "50%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  {data?.opdCountPvt}
                </Text>

                <Text
                  style={{
                    width: "50%",
                    textAlign: "center",
                  }}
                >
                  {data?.opdCountPanel}
                </Text>
              </View>
            </View>

            {/* Emergency Services */}
            <View style={{ fontSize: 10, width: "70%" }}>
              <View
                style={{
                  border: "1px solid black",
                  backgroundColor: "#B8CCE4",
                }}
              >
                <Text style={{ textAlign: "center" }}>Emergency Status</Text>
              </View>

              <View
                style={{
                  border: "1px solid black",
                  flexDirection: "row",
                  borderTop: 0,
                  // width: "100%",
                }}
              >
                <Text
                  style={{
                    width: "35%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  No. of ER Services
                </Text>
                <Text
                  style={{
                    width: "35%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                    padding: 2,
                  }}
                >
                  No. of other ER Services
                </Text>
                <Text
                  style={{
                    width: "30%",

                    textAlign: "center",
                  }}
                >
                  Admission
                </Text>
              </View>

              <View
                style={{
                  border: "1px solid black",
                  flexDirection: "row",
                  borderTop: 0,
                  // width: "100%",
                  backgroundColor: "#D99795",
                }}
              >
                <Text
                  style={{
                    width: "35%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  E/R={data?.E_R} ECG={data?.ECG}
                </Text>
                <Text
                  style={{
                    width: "35%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  {data?.otherErService}
                </Text>
                <Text
                  style={{
                    width: "30%",

                    textAlign: "center",
                  }}
                >
                  {data?.Admission}
                </Text>
              </View>
            </View>
          </View>

          {/* Physiotherapy And Operation Theatre */}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              gap: 5,
              marginTop: 8,
            }}
          >
            {/*Physiotherapy */}
            <View style={{ fontSize: 10, width: "30%" }}>
              <View
                style={{
                  border: "1px solid black",
                  backgroundColor: "#B8CCE4",
                }}
              >
                <Text style={{ textAlign: "center" }}>Physiotherapy</Text>
              </View>
              <View
                style={{
                  border: "1px solid black",
                  flexDirection: "row",
                  borderTop: 0,
                  // width: "100%",
                }}
              >
                <Text
                  style={{
                    width: "50%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  I.P.D
                </Text>

                <Text
                  style={{
                    width: "50%",
                    textAlign: "center",
                  }}
                >
                  O.P.D
                </Text>
              </View>
              <View
                style={{
                  border: "1px solid black",
                  flexDirection: "row",
                  borderTop: 0,
                  width: "100%",
                  backgroundColor: "#D99795",
                }}
              >
                <Text
                  style={{
                    width: "50%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  {data?.physioIPD}
                </Text>

                <Text
                  style={{
                    width: "50%",
                    textAlign: "center",
                  }}
                >
                  {data?.physioOPD}
                </Text>
              </View>
            </View>

            {/* Operation Theatre */}
            <View style={{ fontSize: 10, width: "70%" }}>
              <View
                style={{
                  border: "1px solid black",
                  backgroundColor: "#B8CCE4",
                }}
              >
                <Text style={{ textAlign: "center" }}>Operation Theatre</Text>
              </View>

              <View
                style={{
                  border: "1px solid black",
                  flexDirection: "row",
                  borderTop: 0,
                  // width: "100%",
                }}
              >
                <Text
                  style={{
                    width: "35%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  Dressing
                </Text>
                <Text
                  style={{
                    width: "35%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  GA
                </Text>
                <Text
                  style={{
                    width: "35%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  SA
                </Text>
                <Text
                  style={{
                    width: "30%",

                    textAlign: "center",
                  }}
                >
                  LA
                </Text>
              </View>

              <View
                style={{
                  border: "1px solid black",
                  flexDirection: "row",
                  borderTop: 0,
                  backgroundColor: "#D99795",
                }}
              >
                <Text
                  style={{
                    width: "35%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  {data?.Dressing}
                </Text>
                <Text
                  style={{
                    width: "35%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  {data?.GA}
                </Text>
                <Text
                  style={{
                    width: "35%",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  {data?.SA}
                </Text>
                <Text
                  style={{
                    width: "30%",

                    textAlign: "center",
                  }}
                >
                  {data?.LA}
                </Text>
              </View>
            </View>
          </View>

          {/* Laboratory */}
          <View
            style={{
              fontSize: 10,
              marginTop: 8,
              width: "100%",
              borderRight: "1px solid black",
            }}
          >
            <Text
              style={{
                border: "1px solid black",
                textAlign: "center",
                borderRight: 0,
                backgroundColor: "#B8CCE4",
              }}
            >
              Laboratory
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  borderBottom: 0,
                }}
              >
                Total Patient Test
              </Text>
              <Text
                style={{
                  width: "45%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#B8CCE4",
                }}
              >
                OPD (Test Sources)
              </Text>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#B8CCE4",
                }}
              >
                OPD Panel
              </Text>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#B8CCE4",
                }}
              >
                IPD
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                }}
              ></Text>
              <Text
                style={{
                  width: "15%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                }}
              >
                In-House Consultant
              </Text>
              <Text
                style={{
                  width: "15%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  padding: 2,
                }}
              >
                External (Test)
              </Text>
              <Text
                style={{
                  width: "15%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                }}
              >
                Emergency (Test)
              </Text>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                }}
              >
                Panel (Test)
              </Text>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                }}
              >
                I.P.D (Test)
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#D99795",
                }}
              >
                {data?.labTotal}
              </Text>
              <Text
                style={{
                  width: "15%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#D99795",
                }}
              >
                {data?.labOPD}
              </Text>
              <Text
                style={{
                  width: "15%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#D99795",
                }}
              >
                {data?.labOut}
              </Text>
              <Text
                style={{
                  width: "15%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#D99795",
                }}
              >
                {data?.labER}
              </Text>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#D99795",
                }}
              >
                0
              </Text>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#D99795",
                }}
              >
                {data?.labIPD}
              </Text>
            </View>
          </View>

          {/* Radiology */}
          <View
            style={{
              fontSize: 10,
              marginTop: 8,
              width: "100%",
              borderRight: "1px solid black",
            }}
          >
            <Text
              style={{
                border: "1px solid black",
                textAlign: "center",
                borderRight: 0,
                backgroundColor: "#B8CCE4",
              }}
            >
              Radiology
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  borderBottom: 0,
                }}
              >
                Total Patient Test
              </Text>
              <Text
                style={{
                  width: "45%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#B8CCE4",
                }}
              >
                OPD (Test Sources)
              </Text>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#B8CCE4",
                }}
              >
                OPD Panel
              </Text>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#B8CCE4",
                }}
              >
                IPD
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                }}
              ></Text>
              <Text
                style={{
                  width: "15%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                }}
              >
                In-House Consultant
              </Text>
              <Text
                style={{
                  width: "15%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  padding: 2,
                }}
              >
                External (Test)
              </Text>
              <Text
                style={{
                  width: "15%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                }}
              >
                Emergency (Test)
              </Text>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                }}
              >
                Panel (Test)
              </Text>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                }}
              >
                I.P.D (Test)
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#D99795",
                }}
              >
                {data?.radioTotal}
              </Text>
              <Text
                style={{
                  width: "15%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#D99795",
                }}
              >
                {data?.radioOPD}
              </Text>
              <Text
                style={{
                  width: "15%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#D99795",
                }}
              >
                {data?.radioOut}
              </Text>
              <Text
                style={{
                  width: "15%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#D99795",
                }}
              >
                {data?.radioER}
              </Text>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#D99795",
                }}
              >
                0
              </Text>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#D99795",
                }}
              >
                {data?.radioIPD}
              </Text>
            </View>
          </View>

          {/* Ultrasound */}
          <View
            style={{
              fontSize: 10,
              marginTop: 8,
              width: "100%",
              borderRight: "1px solid black",
            }}
          >
            <Text
              style={{
                border: "1px solid black",
                textAlign: "center",
                borderRight: 0,
                backgroundColor: "#B8CCE4",
              }}
            >
              Ultrasound
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  borderBottom: 0,
                }}
              >
                Total Patient Test
              </Text>
              <Text
                style={{
                  width: "45%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#B8CCE4",
                }}
              >
                OPD (Test Sources)
              </Text>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#B8CCE4",
                }}
              >
                OPD Panel
              </Text>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#B8CCE4",
                }}
              >
                IPD
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                }}
              ></Text>
              <Text
                style={{
                  width: "15%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                }}
              >
                In-House Consultant
              </Text>
              <Text
                style={{
                  width: "15%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  padding: 2,
                }}
              >
                External (Test)
              </Text>
              <Text
                style={{
                  width: "15%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                }}
              >
                Emergency (Test)
              </Text>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                }}
              >
                Panel (Test)
              </Text>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                }}
              >
                I.P.D (Test)
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#D99795",
                }}
              >
                {data?.ultraTotal}
              </Text>
              <Text
                style={{
                  width: "15%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#D99795",
                }}
              >
                {data?.ultraOPD}
              </Text>
              <Text
                style={{
                  width: "15%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#D99795",
                }}
              >
                {data?.ultraOut}
              </Text>
              <Text
                style={{
                  width: "15%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#D99795",
                }}
              >
                {data?.ultraER}
              </Text>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#D99795",
                }}
              >
                0
              </Text>
              <Text
                style={{
                  width: "20%",
                  border: "1px solid black",
                  textAlign: "center",
                  borderTop: 0,
                  borderRight: 0,
                  backgroundColor: "#D99795",
                }}
              >
                {data?.ultraIPD}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 15, color: "gray", fontSize: 10 }}>
            <Text>
              * Note: Data requirment has been forwarded to software
              implementation department.
            </Text>
          </View>
        </View>
      </MyPage>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  Image: {
    height: "50",
    marginTop: "3",
    width: "300",
  },
  pageNumber: {
    left: 0,
    right: 0,
    bottom: 10,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    fontSize: "10",
  },
  pageNumber2: {
    left: 0,
    right: 0,
    bottom: 80,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    fontSize: "10",
  },
  pageNumber3: {
    left: 0,
    right: 0,
    bottom: 60,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    fontSize: "10",
  },
  footer: {
    left: 8,
    right: 0,
    bottom: 30,
    position: "absolute",
    width: "100%",
    height: "2",
    backgroundColor: "black",
  },
  head: {
    border: "1px solid black",
    marginTop: "2",
    padding: "2",
  },
  headC1: {
    border: "1px solid #858585",
    backgroundColor: "#B8CCE4",
    textAlign: "center",
    padding: "2",
    marginTop: "10",
  },
  headC2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "3",
    marginTop: "3",
    textAlign: "left",
  },
  headCNew: {
    marginVertical: "2",
  },
  font: {
    fontSize: 10,
  },

  depHead: {
    border: "1px solid black",
    padding: "2",
    textAlign: "center",
    marginTop: "5",
    color: "white",
    backgroundColor: "#454545",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#454545",
    color: "white",
    marginTop: "5",
    padding: "4",
    fontSize: "12",
    alignItems: "center",
  },
  test: {
    width: "30%",
    textAlign: "center",
  },
  test2: {
    width: "10%",
    textAlign: "center",
  },
  testHeading: {
    fontSize: "15",
    textDecoration: "underline",
    fontWeight: "bold",
    marginVertical: "4",
    paddingLeft: "3",
  },
  tableData: {
    display: "flex",
    flexDirection: "row",
    marginTop: "5",
    padding: "4",
    fontSize: "12",
    alignItems: "center",
  },
  wid: {
    width: "60%",
  },
  wid1: {
    width: "40%",
  },
  tableCell: {
    width: "25%",
    borderLeft: "1px solid black",
    borderTop: "1px solid black",
    // borderBottom: "1px solid black",
    padding: 5,
    textAlign: "center",
    fontSize: 12,
  },
  tableHeader: {
    backgroundColor: "#f0f0f0", // Optional to differentiate the header
    borderBottom: 0, // Remove bottom border from header row to avoid duplication
  },
});

export default DailyReportPDF;
