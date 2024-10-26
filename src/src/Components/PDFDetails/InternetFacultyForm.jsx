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

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf",
});

const InternetFacultyForm = () => {
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
        {/* <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 10 }}>Consultant Weekly Schedule</Text>
          <Text style={{ fontSize: 10 }}>021 3878 4012-16</Text>
        </View> */}
      </View>
      <View style={styles.content}>{children}</View>
      <View style={styles.footer} />
      <View style={styles.pageNumber}>
        <Text
          style={{ textDecoration: "underline" }}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </View>
    </Page>
  );

  return (
    <Document>
      <MyPage>
        <View style={styles.headC1}>
          <Text>{`(Internet / Email) User Form`}</Text>
        </View>
        <Text style={{ textAlign: "right", marginTop: 20, fontSize: 12 }}>
          Dated: __________________
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
            fontSize: 12,
          }}
        >
          <Text>Employee Name: __________________________________________</Text>
          <Text>Employee Code: ____________</Text>
        </View>
        <Text style={{ marginTop: 15, fontSize: 12 }}>
          Father / Husband Name:
          _______________________________________________________
        </Text>
        <Text style={{ marginTop: 15, fontSize: 12 }}>
          Contact No. _________________________________________
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
            fontSize: 12,
          }}
        >
          <Text>Department: ________________________</Text>
          <Text>Designation: ________________________</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            fontSize: 12,
          }}
        >
          <Text>Internet Facility:</Text>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 20,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                border: "1px solid black",
                padding: 5,
                fontSize: 12,
                marginLeft: 10,
              }}
            >
              <Text>Not Required</Text>
            </View>
            <View
              style={{
                border: "1px solid black",

                padding: 5,
                fontSize: 12,
                marginLeft: 10,
              }}
            >
              <Text>Open</Text>
            </View>
            <View
              style={{
                border: "1px solid black",

                padding: 5,
                fontSize: 12,
                marginLeft: 10,
              }}
            >
              <Text>Restricted</Text>
            </View>
            <View
              style={{
                border: "1px solid black",

                padding: 5,
                fontSize: 12,
                marginLeft: 10,
              }}
            >
              <Text>Only For Email</Text>
            </View>
          </View>
        </View>

        <Text style={{ marginTop: 15, fontSize: 12 }}>
          Email-ID: _______________________________________________________
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
            fontSize: 12,
          }}
        >
          <View>
            <Text>Signature: ________________________</Text>
            <Text>{`(Employee)`}</Text>
          </View>

          <View>
            <Text>Requesting By: ________________________</Text>
            <Text>{`(Dept. Incharge)`}</Text>
          </View>
        </View>

        <View style={{ marginTop: 30, fontSize: 12 }}>
          <Text>Received By: ________________________</Text>
          <Text>{`(IT Dept.)`}</Text>
        </View>

        <View
          style={{
            border: "1px solid black",
            marginTop: 30,
            paddingBottom: 10,
          }}
        >
          <View style={[styles.headC1, { marginTop: 0 }]}>
            <Text>For Office Use Only</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 30,
              fontSize: 12,
              paddingHorizontal: 5,
            }}
          >
            <Text>Processed by: ________________________</Text>
            <Text>Processed Date: ________________________</Text>
          </View>

          <View style={{ marginTop: 30, fontSize: 12, paddingHorizontal: 5 }}>
            <Text>Verified By: ________________________</Text>
            <Text>{`(Dept. In-Charge)`}</Text>
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
    color: "white",
    backgroundColor: "#858585",
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
});

export default InternetFacultyForm;
