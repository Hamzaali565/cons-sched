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
  fonts: [
    {
      src: require("../../Utils/Fonts/Roboto-Regular.ttf"),
      fontWeight: "normal",
      fontStyle: "normal",
    },
    {
      src: require("../../Utils/Fonts/Roboto-Bold.ttf"),
      fontWeight: "bold",
      fontStyle: "normal",
    },
    {
      src: require("../../Utils/Fonts/Roboto-Italic.ttf"),
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: require("../../Utils/Fonts/Roboto-BoldItalic.ttf"),
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

Font.register({
  family: "Matemasie",
  fonts: [
    {
      src: require("../../Utils/FontMatemasie/Matemasie-Regular.ttf"),
      fontWeight: "normal",
      fontStyle: "normal",
    },
  ],
});
Font.register({
  family: "Kalam",
  fonts: [
    {
      src: require("../../Utils/Kalam/Kalam-Bold.ttf"),
      fontWeight: "normal",
      fontStyle: "normal",
    },
  ],
});

const ConSchedulePDF = ({ consDetails }) => {
  console.log("ConstDetails", consDetails);
  const MyPage = ({ children }) => (
    <Page size={[205, "auto"]} style={styles.page}>
      <View style={styles.logoContainer}>
        <Image src={logo} style={styles.Image} />
      </View>
      <View style={styles.content}>{children}</View>
    </Page>
  );

  return (
    <Document>
      <MyPage>
        <View style={styles.headC1}>
          <Text>{consDetails[0].speciality}</Text>
        </View>

        <View style={styles.head}>
          {consDetails.length > 0 &&
            consDetails.map((items, key) => (
              <View key={key}>
                <Text
                  style={[
                    styles.text,
                    { fontFamily: "Roboto", fontWeight: "bold", fontSize: 10 },
                  ]}
                >
                  {items?.name}
                </Text>
                <Text style={styles.text}>{items?.qualification}</Text>
                <Text style={[styles.text, { fontSize: 8 }]}>
                  {items?.days} {items?.timing}
                </Text>
                {items?.timing1 && (
                  <Text style={[styles.text, { fontSize: 8 }]}>
                    {items?.days1} {items?.timing1}
                  </Text>
                )}
                {items?.timing2 && (
                  <Text style={[styles.text, { fontSize: 8 }]}>
                    {items?.days2} {items?.timing2}
                  </Text>
                )}
                <Text
                  style={[
                    styles.text,
                    { fontFamily: "Roboto", fontWeight: "bold", fontSize: 10 },
                  ]}
                >
                  Fees: {items?.appointmentFee}
                </Text>
                <Text style={styles.text}>{items?.roomNo}</Text>
                <Text
                  style={[
                    styles.text,
                    { fontFamily: "Roboto", fontWeight: "bold" },
                  ]}
                >
                  Status: {items?.onLeave === true ? "On-Leave" : "Available"}
                </Text>
                <Text style={styles.saperator}>
                  ____________________________________________________________
                </Text>
              </View>
            ))}
        </View>

        <View
          style={{
            height: "2",
            width: "100%",
            marginTop: "30",
            border: "1px solid black",
          }}
        />
        <Text
          style={{
            marginTop: "5",
            textAlign: "center",
            fontSize: "10",
            fontFamily: "Roboto",
            fontWeight: "bold",
          }}
        >
          24 HOURS OPEN
        </Text>
        <Text
          style={{
            marginTop: "3",
            textAlign: "center",
            fontSize: "10",
            fontFamily: "Roboto",
          }}
        >
          437/C Ghazi Salahuddin Road
        </Text>
        <Text
          style={{
            marginTop: "3",
            textAlign: "center",
            fontSize: "10",
            fontFamily: "Roboto",
          }}
        >
          C.P & Berar Society Cp & Berar Chs
        </Text>
        <Text
          style={{
            marginTop: "3",
            textAlign: "center",
            fontSize: "10",
            fontFamily: "Roboto",
          }}
        >
          Karachi City, Sindh
        </Text>
      </MyPage>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
    width: 288, // 4 inches in points
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  content: {
    flexGrow: 1,
  },
  head: {
    border: "1px solid black",
    padding: 2,
    display: "flex",
    paddingVertical: 4,
    marginTop: "2",
  },
  headC1: {
    border: "1px solid #858585",
    color: "white",
    backgroundColor: "#858585",
    textAlign: "center",
    padding: 2,
    marginTop: 4,
    fontSize: 14,
  },
  detailshead: {
    border: "1px solid black",
    color: "white",
    backgroundColor: "#454545",
    textAlign: "center",
    padding: 2,
    marginTop: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "4",
  },
  text: {
    fontSize: 11,
    marginTop: "4",
    marginLeft: 3,
    width: "100%",
    overflow: "hidden",
  },
  saperator: {
    fontSize: 11,
    marginVertical: "2",
    width: "100%",
    overflow: "hidden",
  },
  Image: {
    height: "50",
    marginTop: "3",
    width: "300",
  },
});

export default ConSchedulePDF;
