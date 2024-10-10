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


// Reusable Page Component with Page Break Functionality
const GRNReportPDF = ({ resultData, category }) => {
  const pageHeightLimit = 1100; // Set the maximum height for a page.
  let currentHeight = 0; // Keeps track of the current content height.

  // Function to render content with page breaks

  const renderContentWithBreaks = () => {
    const pages = [];
    let currentPageContent = [];

    resultData.forEach((item, index) => {
      // Dynamically calculate item height based on actual content
      const itemHeight = 80; // Height of the item header block
      const rowsHeight = item.length * 25; // Row height adjusted slightly for better layout
      const totalItemHeight = itemHeight + rowsHeight;

      // Check if current item can fit in the remaining space
      if (currentHeight + totalItemHeight > pageHeightLimit) {
        // Push the current page and reset the content for the new page
        pages.push(
          <Page style={styles.page} key={`page-${pages.length}`}>
            <Header />
            <SubHeader category={category} />
            <View style={styles.content}>{currentPageContent}</View>
            <Footer />
          </Page>
        );
        currentPageContent = [
          
        ];
        currentHeight = 0; // Reset height for new page
      }

      // Add item content to current page
      currentPageContent.push(
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemHeader}>{item[0]?.["Item Name"]}</Text>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: "20%" }]}>Item Name</Text>
            <Text style={[styles.tableCell, { width: "20%" }]}>Supplier</Text>
            <Text style={styles.tableCell}>GRN No.</Text>
            <Text style={styles.tableCell}>GRN Date</Text>
            <Text style={[styles.tableCell, { width: "7.5%" }]}>Qty.</Text>
            <Text style={[styles.tableCell, { width: "10%" }]}>Amount</Text>
            <Text
              style={[
                styles.tableCell,
                { borderRight: "1px solid black", width: "12.5%" },
              ]}
            >
              Total
            </Text>
          </View>
          {item.map((nestedItem, nestedIndex) => (
            <View style={styles.tableRow} key={nestedIndex}>
              <Text style={[styles.tableCell, { width: "20%" }]}>
                {nestedItem?.["Item Name"]}
              </Text>
              <Text style={[styles.tableCell, { width: "20%" }]}>
                {nestedItem?.["Supplier Name"]}
              </Text>
              <Text style={styles.tableCell}>{nestedItem?.["GRN No."]}</Text>
              <Text style={styles.tableCell}>
                {moment(nestedItem?.["GRN Date"]).format("DD/MM/YYYY")}
              </Text>
              <Text style={[styles.tableCell, { width: "7.5%" }]}>
                {nestedItem?.["Quantity"]}
              </Text>
              <Text style={[styles.tableCell, { width: "10%" }]}>
                {nestedItem?.["Net Amount"] && nestedItem?.["Quantity"]
                  ? (nestedItem["Net Amount"] / nestedItem["Quantity"]).toFixed(
                      3
                    )
                  : ""}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  { borderRight: "1px solid black", width: "12.5%" },
                ]}
              >
                {nestedItem?.["Net Amount"]}
              </Text>
            </View>
          ))}
        </View>
      );
      currentHeight += totalItemHeight; // Update height after adding this block
    });

    // Add remaining content as the last page
    if (currentPageContent.length > 0) {
      pages.push(
        <Page style={styles.page} key={`page-${pages.length}`}>
          <Header />
          <SubHeader category={category} />
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
        backgroundColor: "#858585",
      }}
    >
      {`ITEM REPORT OF AUG (${category})`}
    </Text>
  );
};

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
  itemContainer: {
    marginTop: 4,
    paddingBottom: 2,
  },
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

export default GRNReportPDF;
