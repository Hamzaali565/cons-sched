import React from "react";
import {
  Text,
  Page,
  Document,
  StyleSheet,
  View,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf",
});

const PracticePageBreakintotwo = ({ data }) => {
  console.log("data ", data);

  let billData = [
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    { name: "Hamza" },
    // ...(rest of your data)
  ];

  const half = Math.ceil(data.length / 2);
  const firstColumn = data.slice(0, half);
  const secondColumn = data.slice(half);

  const renderList = (items) =>
    items.map((item, index) => (
      <View style={{ border: "1px solid black", marginTop: 10 }}>
        <View
          style={{
            border: "1px solid black",
            backgroundColor: "#454545",
            color: "white",
            fontFamily: "Roboto",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <Text key={index} style={[styles.text, { fontSize: 12 }]}>
            {item[0].speciality}
          </Text>
        </View>
        {/* doctor Name */}

        {item.map((consData, index) => (
          <View>
            <View
              style={{
                border: "1px solid black",
                backgroundColor: "#454545",
                color: "white",
                textAlign: "center",
              }}
            >
              <Text style={styles.text}>
                {consData?.name}{" "}
                {consData?.onLeave === true ? "( On-Leave )" : ""}
              </Text>
            </View>
            <View
              style={{
                border: "1px solid black",
                textAlign: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  border: "1px solid black",
                  fontSize: 7,
                  padding: 2,
                  flex: 1,
                }}
              >
                {consData?.days} {consData?.timing}
              </Text>
              {consData?.days1 && (
                <Text
                  style={{
                    border: "1px solid black",
                    fontSize: 7,
                    padding: 2,
                    flex: 1,
                  }}
                >
                  {consData?.days1} {consData?.timing1}
                </Text>
              )}
              {consData?.days2 && (
                <Text
                  style={{
                    border: "1px solid black",
                    fontSize: 7,
                    padding: 2,
                    flex: 1,
                  }}
                >
                  {consData?.days2} {consData?.timing2}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>
    ));

  // Header Component for the Logo and Admission Text
  const Header = () => (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      }}
      fixed
    >
      <Text>Your Company Logo</Text>
      <Text style={{ fontSize: 12, fontFamily: "Roboto" }}>Admission Form</Text>
    </View>
  );

  const MyPage = () => (
    <Page style={styles.page}>
      {/* Render the Header */}
      <Header />

      <View style={styles.columns}>
        <View style={styles.column}>{renderList(firstColumn)}</View>
        <View style={styles.column}>{renderList(secondColumn)}</View>
      </View>

      {/* <View style={styles.pageNumber}>
        <Text
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
      <MyPage />
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontFamily: "Roboto",
  },
  columns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
    padding: 5,
  },
  text: {
    marginBottom: 5,
    fontSize: 10,
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 30,
    position: "absolute",
    width: "100%",
    height: "2",
    backgroundColor: "black",
  },
  pageNumber: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
  },
});

export default PracticePageBreakintotwo;
