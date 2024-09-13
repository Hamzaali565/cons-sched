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

// Font.register({
//   family: "Roboto",
//   src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf",
// });

// Reusable Page Component with Page Break Functionality
const ConsScheduleDetailPdf = ({ resultData, itemsPerRow = 2 }) => {
  const itemWidth = `${100 / itemsPerRow}%`;
  const content = [{ text: "hello" }];

  const TableCell = ({
    consName,
    day1,
    time1,
    day2,
    time2,
    day3,
    time3,
    speciality,
    data,
  }) => (
    <View style={{ padding: 2 }}>
      <View
        style={{
          border: "1px solid gray",
          marginTop: 6,
          paddingBottom: 2,
        }}
      >
        <Text
          style={{
            textDecoration: "underline",
            fontFamily: "Kalam",
            fontWeight: "bold", // Use "bold" instead of "ultrabold"
            fontSize: 15,
            textAlign: "center",
            color: "white",
            backgroundColor: "#454545",
          }}
        >
          {speciality}
        </Text>
        {data?.map((itemes) => (
          <View style={{ border: "1px solid black", fontSize: 10, padding: 2 }}>
            <Text
              style={{
                border: "1px solid black",
                textAlign: "center",
                padding: 1,
                fontSize: 8,
                color: "white",
                backgroundColor: "#454545",
              }}
            >
              {itemes?.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.tableDataSt}>MON - FRI 10pm - 10pm</Text>
              <Text style={styles.tableDataSt}>
                MON - FRI - SAT 10pm - 10pm
              </Text>
              <Text style={styles.tableDataSt}>MON - FRI 10pm - 10pm</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const pageHeightLimit = 600; // Adjust this based on your requirements
  let currentHeight = 0;

  const renderContentWithBreaks = (content) => {
    const pages = [];
    let currentPageContent = [];
    console.log("Result Data", resultData);

    resultData.forEach((item, index) => {
      const itemHeight = 100; // Example height of each content block, adjust as needed

      if (currentHeight + itemHeight > pageHeightLimit) {
        // Add current page's content to pages array
        pages.push(
          <Page style={styles.page} key={`page-${pages.length}`}>
            <Header />

            <View>{currentPageContent}</View>
          </Page>
        );

        // Start a new page
        currentPageContent = [
          <TableCell data={item} speciality={item[0].speciality} />,
        ];
        currentHeight = itemHeight;
      } else {
        currentPageContent.push(
          <TableCell data={item} speciality={item[0].speciality} />
        );
        currentHeight += itemHeight;
      }
    });

    // Add the last page's content
    if (currentPageContent.length > 0) {
      pages.push(
        <Page style={styles.page} key={`page-${pages.length}`}>
          <Header />

          <View style={{}}>{currentPageContent}</View>
        </Page>
      );
    }

    return pages;
  };

  return <Document>{renderContentWithBreaks(resultData)}</Document>;
};

// Header Component
const Header = () => (
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
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 10 }}>Consultant Weekly Scehdule</Text>
      <Text style={{ fontSize: 10 }}>021 3878 4012-16</Text>
    </View>
  </View>
);

// Patient's Detail

// Footer Component

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  Image: {
    height: "40",
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
    border: "1px solid black",
    color: "white",
    backgroundColor: "#454545",
    textAlign: "center",
    padding: "2",
    marginTop: "1",
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
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  table: {
    display: "flex",
    width: "100%",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
  },
  tableCell: {
    border: "1px solid black",
    padding: 5,
    flex: 1,
  },
  tableDataSt: {
    border: "1px solid black",
    padding: 2,
    fontSize: 7,
    marginRight: 0,
    textAlign: "center",
    marginLeft: 0,
    flex: 1,
  },
});
export default ConsScheduleDetailPdf;
