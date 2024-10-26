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
const MealReportPdf = ({ resultData, category }) => {
  const pageHeightLimit = 2350; // Adjust this based on your requirements
  let currentHeight = 0;

  const renderContentWithBreaks = () => {
    const pages = [];
    let currentPageContent = [];
    console.log("Result Data", resultData);

    resultData.forEach((item, index) => {
      const itemHeight = 50; // Example height for item header

      // Check if adding this item would exceed the usable page height
      if (currentHeight + itemHeight > pageHeightLimit) {
        pages.push(
          <Page style={styles.page} key={`page-${pages.length}`}>
            <Header />
            <SubHeader category={category} />
            <TableHeader />
            <View style={styles.content}>{currentPageContent}</View>
            <Footer />
          </Page>
        );
        currentPageContent = [
          <View key={index} style={styles.itemContainer}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: "5%" }]}>
                {index + 1}
              </Text>
              <Text
                style={[styles.tableCell, { width: "40%", textAlign: "left" }]}
              >
                {item?.["Patient Name"]}
              </Text>
              <Text style={[styles.tableCell, { width: "20%" }]}>
                {item?.["Service Description"]}
              </Text>
              <Text style={[styles.tableCell, { width: "20%" }]}>
                {item?.["Ward Name"]}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  { width: "15%", borderRight: "1px solid black" },
                ]}
              >
                {item?.["Tagged Date & Time"]}
              </Text>
            </View>
          </View>,
        ];
        currentHeight = itemHeight;
      } else {
        // Add item content to current page
        currentPageContent.push(
          <View key={index} style={styles.itemContainer}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: "5%" }]}>
                {index + 1}
              </Text>
              <Text
                style={[styles.tableCell, { width: "40%", textAlign: "left" }]}
              >
                {item?.["Patient Name"]}
              </Text>
              <Text style={[styles.tableCell, { width: "20%" }]}>
                {item?.["Service Description"]}
              </Text>
              <Text style={[styles.tableCell, { width: "20%" }]}>
                {item?.["Ward Name"]}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  { width: "15%", borderRight: "1px solid black" },
                ]}
              >
                {item?.["Tagged Date & Time"]}
              </Text>
            </View>
          </View>
        );
        currentHeight += itemHeight;
      }

      // Update current height
    });

    // Add any remaining content to the last page
    if (currentPageContent.length > 0) {
      pages.push(
        <Page style={styles.page} key={`page-${pages.length}`}>
          <Header />
          <SubHeader category={category} />
          <TableHeader />
          <View style={styles.content}>{currentPageContent}</View>
          <Footer />
        </Page>
      );
    }

    return pages;
  };

  return <Document>{renderContentWithBreaks()}</Document>;
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
  </View>
);

const SubHeader = ({ category }) => {
  return (
    <Text
      style={{
        textDecoration: "underline",
        fontFamily: "Kalam",
        fontWeight: "bold", // Use "bold" instead of "ultrabold"
        fontSize: 15,
        textAlign: "center",
        color: "white",
        marginTop: "5",
        backgroundColor: "#858585",
      }}
    >
      {`Report Of ${category === "Break" ? "Breakfast" : category}`}
    </Text>
  );
};

const TableHeader = () => {
  return (
    <View style={[styles.itemContainer]}>
      <View
        style={[styles.tableRow, { fontFamily: "Roboto", fontWeight: "bold" }]}
      >
        <Text
          style={[
            styles.tableCell,
            { width: "5%", borderTop: "1px solid black" },
          ]}
        >
          S.No
        </Text>
        <Text
          style={[
            styles.tableCell,
            { width: "40%", borderTop: "1px solid black" },
          ]}
        >
          Patient Name
        </Text>

        <Text
          style={[
            styles.tableCell,
            { width: "20%", borderTop: "1px solid black" },
          ]}
        >
          Service Description
        </Text>
        <Text
          style={[
            styles.tableCell,
            { width: "20%", borderTop: "1px solid black" },
          ]}
        >
          Ward Name
        </Text>
        <Text
          style={[
            styles.tableCell,
            {
              width: "15%",
              borderTop: "1px solid black",
              borderRight: "1px solid black",
            },
          ]}
        >
          Tagged Date
        </Text>
      </View>
    </View>
  );
};

// const SubHeader = () => {
//   return (
//     <View
//       style={{
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "space-between",
//         backgroundColor: "#454545",
//         color: "white",
//         padding: "2",
//         marginTop: "8px",
//       }}
//     >
//       <Text style={{ fontSize: "10", width: "40%", textAlign: "left" }}>
//         Test Name
//       </Text>
//       <Text style={{ fontSize: "10", width: "20%", textAlign: "center" }}>
//         Result
//       </Text>
//       <Text style={{ fontSize: "10", width: "20%", textAlign: "center" }}>
//         Unit
//       </Text>
//       <Text style={{ fontSize: "10", width: "20%", textAlign: "center" }}>
//         Ranges
//       </Text>
//     </View>
//   );
// };

// Footer Component
const Footer = () => (
  <>
    <View style={styles.footer} />
    <View style={styles.pageNumber}>
      <Text
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
        fixed
      />
    </View>
  </>
);

const styles = StyleSheet.create({
  page: {
    padding: 10,
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
  content: {
    flex: 1,
  },
  itemContainer: {},
  Image: {
    height: "50",
    marginTop: "3",
    width: "300",
  },
  itemHeader: {
    textDecoration: "underline",
    fontFamily: "Kalam",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    color: "white",
    backgroundColor: "#858585",
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
    width: "15%", // Adjust the width accordingly
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
});

export default MealReportPdf;