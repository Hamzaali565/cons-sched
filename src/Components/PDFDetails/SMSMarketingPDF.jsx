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

const SMSMarketingPDF = () => {
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
          <Text>SMS Marketing Form</Text>
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
          <View>
            <Text>
              Requesting By: __________________________________________
            </Text>
            <Text>{`(Name)`}</Text>
          </View>
          <Text>Employee Code: ____________</Text>
        </View>
        <Text style={{ marginTop: 15, fontSize: 12 }}>
          Father / Husband Name:
          _______________________________________________________
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
            fontSize: 12,
          }}
        >
          <Text>Department: _______________________________________</Text>
          <Text>Contact No. ____________________</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
            fontSize: 12,
          }}
        >
          <Text>SMS Purpose: _______________________________________</Text>
          <Text>Broad Cast Date: ____________________</Text>
        </View>

        <Text style={{ marginTop: 15, fontSize: 12 }}>
          Target Audience:
          _______________________________________________________
        </Text>
        <Text style={{ marginTop: 15, fontSize: 12 }}>
          Message Text : (Limit of 150 characters)
        </Text>
        <Text style={{ marginTop: 15, fontSize: 12, textAlign: "center" }}>
          ______________________________________________________________________________________
        </Text>
        <Text style={{ marginTop: 15, fontSize: 12, textAlign: "center" }}>
          ______________________________________________________________________________________
        </Text>
        <Text style={{ marginTop: 15, fontSize: 12, textAlign: "center" }}>
          ______________________________________________________________________________________
        </Text>
        <Text style={{ marginTop: 15, fontSize: 12, textAlign: "center" }}>
          ______________________________________________________________________________________
        </Text>
        <Text style={{ marginTop: 15, fontSize: 12, textAlign: "center" }}>
          ______________________________________________________________________________________
        </Text>
        <Text style={{ marginTop: 15, fontSize: 12, textAlign: "center" }}>
          ______________________________________________________________________________________
        </Text>
        <Text style={{ marginTop: 15, fontSize: 12, textAlign: "center" }}>
          ______________________________________________________________________________________
        </Text>
        <Text style={{ marginTop: 15, fontSize: 12, textAlign: "center" }}>
          ______________________________________________________________________________________
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
            <Text>Requested By: ________________________</Text>
            <Text>{`(Date & Sign)`}</Text>
          </View>

          <View>
            <Text>Approved By: ________________________</Text>
            <Text>{`(Admin / Medical Director)`}</Text>
          </View>
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
            <View>
              <Text>Recieved By: ________________________</Text>
              <Text>{`(I.T Dept. Date & Sign )`}</Text>
            </View>
            <View>
              <Text>Verified By: ________________________</Text>
              <Text>{`(Dept. In-charge)`}</Text>
            </View>
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
            <View>
              <Text>Processed By: ________________________</Text>
              <Text>{`(Name & Sign )`}</Text>
            </View>
            <Text>Processed Date: ________________________</Text>
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

export default SMSMarketingPDF;