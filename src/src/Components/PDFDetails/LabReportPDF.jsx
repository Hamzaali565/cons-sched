import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import logo from "../../Images/ZMCLogo-.png";
import moment from "moment/moment";

const LabReportPDf = ({ resultData, category, todaysDate }) => {
  let date = resultData[0][0]["Result Date & Time"];
  date = moment(date, "DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY");
  // console.log("monthName", date);
  let monthName = date;

  return (
    <Document>
      <Page style={styles.page} wrap>
        {/* Header should be placed in a fixed position so it appears on every page */}
        <Header />

        {/* Subheader for the category */}
        <SubHeader category={category} month={monthName} />

        {/* Dynamic content */}
        <View style={styles.content}>
          {resultData.map((item, index) => (
            <View key={index} style={styles.itemContainer} wrap={false}>
              {/* Item Header */}
              <Text style={styles.itemHeader}>{item[0]?.["Patient Name"]}</Text>

              {/* Table Header */}
              <View style={styles.tableRow}>
                {/* <Text
                  style={[
                    styles.tableCell,
                    { width: "20%", },
                  ]}
                >
                  Patient Name
                </Text> */}
                <Text style={[styles.tableCell, { width: "40%" }]}>
                  Test Name
                </Text>
                <Text style={[styles.tableCell]}>Lab No.</Text>

                <Text style={styles.tableCell}>Mr No.</Text>
                <Text style={styles.tableCell}>Result Time</Text>
                <Text
                  style={[styles.tableCell, { borderRight: "1px solid black" }]}
                >
                  Result User
                </Text>
              </View>

              {/* Nested Items */}
              {item.map((nestedItem, nestedIndex) => (
                <View style={styles.tableRow} key={nestedIndex}>
                  {/* <Text
                    style={[
                      styles.tableCell,
                      { width: "20%", textAlign: "left", fontSize: 8 },
                    ]}
                  >
                    {nestedItem?.["Patient Name"]}
                  </Text> */}
                  <Text style={[styles.tableCell, { width: "40%" }]}>
                    {nestedItem?.["Test/Group Name"]}
                  </Text>
                  <Text style={styles.tableCell}>
                    {nestedItem?.["Laboratory No."]}
                  </Text>

                  <Text style={[styles.tableCell]}>{nestedItem?.["mrNo"]}</Text>
                  <Text style={[styles.tableCell]}>
                    {nestedItem?.["Result Date & Time"]}
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { borderRight: "1px solid black" },
                    ]}
                  >
                    {nestedItem?.["Result Input User"]}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Footer that repeats on every page */}
        <Footer />
      </Page>
    </Document>
  );
};

// Header Component
const Header = () => (
  <View style={styles.header} fixed>
    <View style={styles.logoContainer}>
      <Image src={logo} style={styles.Image} />
    </View>
  </View>
);

// SubHeader Component
const SubHeader = ({ category, month }) => (
  <Text
    style={[styles.itemHeader, { marginBottom: "10" }]}
    fixed
  >{`LAB REPORT OF IPD PATIENT, Date ${month}`}</Text>
);

// Footer Component
const Footer = () => (
  <View style={styles.footer} fixed>
    <View style={styles.footerLine} />
    <View style={styles.pageNumber}>
      <Text
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
        fixed
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  page: {
    padding: 10,
    flexDirection: "column",
  },
  header: {
    marginBottom: 10,
  },
  content: {
    flex: 1,
  },
  itemHeader: {
    textDecoration: "underline",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 15,
    padding: 2,
    textAlign: "center",
    color: "white",
    backgroundColor: "#858585",
    // marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    fontFamily: "Roboto",
    fontSize: 8,
    borderBottom: "1px solid black",
  },
  tableCell: {
    textAlign: "center",
    borderLeft: "1px solid black",
    padding: 2,
    width: "15%",
  },
  footerLine: {
    width: "100%",
    height: 2,
    backgroundColor: "black",
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
  pageNumber: {
    left: 0,
    right: 0,
    bottom: -15,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    fontSize: "10",
  },
  Image: {
    height: "50",
    marginTop: "3",
    width: "300",
  },
  itemContainer: {
    marginBottom: 20, // Add spacing between items
  },
});

export default LabReportPDf;
