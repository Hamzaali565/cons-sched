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

const PanelFormPDF = () => {
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
          <Text>Panel Account Entry Form</Text>
        </View>
        <Text style={{ textAlign: "right", fontSize: 12, marginTop: "15" }}>
          Panel Code: __________________
        </Text>
        <View
          style={{ marginTop: 20, flexDirection: "row", alignItems: "center" }}
        >
          <View
            style={{ width: "60%", flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={{
                height: 15,
                width: 15,
                border: "1px solid black",
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: 4 }}>Addition</Text>
            <Text style={{ fontSize: 20, marginLeft: 4 }}>/</Text>
            <Text
              style={{
                height: 15,
                width: 15,
                border: "1px solid black",
                marginLeft: 4,
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: 4 }}>Deletion</Text>
            <Text style={{ fontSize: 20, marginLeft: 4 }}>/</Text>
            <Text
              style={{
                height: 15,
                width: 15,
                border: "1px solid black",
                marginLeft: 4,
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: 4 }}>Active</Text>
            <Text style={{ fontSize: 20, marginLeft: 4 }}>/</Text>
            <Text
              style={{
                height: 15,
                width: 15,
                border: "1px solid black",
                marginLeft: 4,
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: 4 }}>In-Active</Text>
          </View>
          <Text style={{ textAlign: "right", fontSize: 12, width: "60%" }}>
            Dated: __________________
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
            fontSize: 12,
          }}
        >
          <Text>
            Panel Name: ____________________________________________________
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
            fontSize: 12,
          }}
        >
          <Text>Contact Person: ________________________</Text>
          <Text>Designation: ________________________</Text>
        </View>

        <Text style={{ marginTop: 15, fontSize: 12 }}>
          Address: _______________________________________________________
        </Text>
        <Text style={{ marginTop: 15, fontSize: 12 }}>
          Contact No: ________________________________________
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            fontSize: 12,
          }}
        >
          <Text>Panel Type:</Text>
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
              <Text>WELFARE</Text>
            </View>
            <View
              style={{
                border: "1px solid black",

                padding: 5,
                fontSize: 12,
                marginLeft: 10,
              }}
            >
              <Text>CORPORATE</Text>
            </View>
            <View
              style={{
                border: "1px solid black",

                padding: 5,
                fontSize: 12,
                marginLeft: 10,
              }}
            >
              <Text>INDIVIDUAL</Text>
            </View>
            <View
              style={{
                border: "1px solid black",

                padding: 5,
                fontSize: 12,
                marginLeft: 10,
              }}
            >
              <Text>DISCOUNT</Text>
            </View>
          </View>
        </View>

        {/* myTable */}
        <View>
          <Text style={{ marginTop: 15, fontSize: 12 }}>Panel Sharing:</Text>

          {/* Header Row */}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={[styles.tableCell, styles.tableHeader]}>
              <Text>Open Sharing</Text>
            </View>
            <View style={[styles.tableCell, styles.tableHeader]}>
              <Text>OPD %</Text>
            </View>
            <View style={[styles.tableCell, styles.tableHeader]}>
              <Text>IPD %</Text>
            </View>
            <View
              style={[
                styles.tableCell,
                styles.tableHeader,
                { borderRight: "1px solid black" },
              ]}
            >
              <Text>Pharmacy</Text>
            </View>
          </View>

          {/* Data Row 1 */}
          <View style={{ flexDirection: "row" }}>
            <View style={styles.tableCell}>
              <Text>Panel</Text>
            </View>
            <View style={styles.tableCell}>
              <Text></Text>
            </View>
            <View style={styles.tableCell}>
              <Text></Text>
            </View>
            <View
              style={[styles.tableCell, { borderRight: "1px solid black" }]}
            >
              <Text></Text>
            </View>
          </View>

          {/* Data Row 2 */}
          <View style={{ flexDirection: "row" }}>
            <View
              style={[styles.tableCell, { borderBottom: "1px solid black" }]}
            >
              <Text>ZMC</Text>
            </View>
            <View
              style={[styles.tableCell, { borderBottom: "1px solid black" }]}
            >
              <Text></Text>
            </View>
            <View
              style={[styles.tableCell, { borderBottom: "1px solid black" }]}
            >
              <Text></Text>
            </View>
            <View
              style={[
                styles.tableCell,
                {
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                },
              ]}
            >
              <Text></Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
            fontSize: 12,
          }}
        >
          <View>
            <Text>Requested By: ________________________</Text>
            <Text>{`(Name & Sign)`}</Text>
          </View>

          <View>
            <Text>Approved By: ________________________</Text>
            <Text>{`(Admin / Medical Director)`}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
            fontSize: 12,
          }}
        >
          <View>
            <Text>Verified By: ________________________</Text>
            <Text>{`(Audit Dept.)`}</Text>
          </View>

          <View>
            <Text>Verified By: ________________________</Text>
            <Text>{`(I.T. Dept. In-Charge)`}</Text>
          </View>
        </View>

        {/* <View
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
            <Text>Entry Made by: ________________________</Text>
            <Text>Entry Date: ________________________</Text>
          </View>

          <View style={{ marginTop: 30, fontSize: 12, paddingHorizontal: 5 }}>
            <Text>Verified By: ________________________</Text>
            <Text>{`(Dept. In-Charge)`}</Text>
          </View>
        </View>
        <Text
          style={{
            marginTop: 30,
            fontSize: 12,
            fontFamily: "Roboto",
            textAlign: "center",
          }}
        >
          Note: All the above detail must be filled in Capital
        </Text> */}
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

export default PanelFormPDF;
