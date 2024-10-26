import React from "react";
import {
  Text,
  Page,
  Document,
  StyleSheet,
  View,
  Font,
  Image,
} from "@react-pdf/renderer";
import logo from "../../Images/ZMCLogo-.png";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf",
});
const PageBreak2PDF = ({ data }) => {
  const half = Math.ceil(data.length / 2);
  const firstColumn = data.slice(0, half);
  const secondColumn = data.slice(half);
  const renderList = (items) =>
    items.map((item, index) => (
      <View key={index} style={{ marginTop: 8 }} wrap={false}>
        <View
          style={{
            fontSize: "10",
            color: "white",
            backgroundColor: "#858585",
            padding: "2",
            textAlign: "center",
          }}
        >
          <Text>{item[0].speciality}</Text>
        </View>
        {item.map((consData, idx) => (
          <View key={idx} style={{ flexDirection: "row", fontSize: "6.5" }}>
            <View
              style={{
                flexDirection: "row",
                width: "50%",
                border: "1px solid black",
                borderTop: "0",
                padding: 1,
              }}
            >
              <Text style={{}}>{consData?.name} </Text>
              {consData?.onLeave === true && (
                <Text style={{ fontSize: "4", marginLeft: "1" }}>
                  (On-Leave)
                </Text>
              )}
            </View>
            <View style={{ width: "50%" }}>
              {/* day 1 */}
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    border: "1px solid black",
                    borderLeft: 0,
                    borderTop: 0,
                    width: "50%",
                    padding: 1,
                  }}
                >
                  {consData?.days}
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    borderLeft: 0,
                    borderTop: 0,
                    width: "50%",
                    padding: 1,
                  }}
                >
                  {consData?.timing}
                </Text>
              </View>
              {/* day 2 */}
              {consData?.days1 && (
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      border: "1px solid black",
                      borderLeft: 0,
                      borderTop: 0,
                      width: "50%",
                      padding: 1,
                    }}
                  >
                    {consData?.days1}
                  </Text>
                  <Text
                    style={{
                      border: "1px solid black",
                      borderLeft: 0,
                      borderTop: 0,
                      width: "50%",
                      padding: 1,
                    }}
                  >
                    {consData?.timing1}
                  </Text>
                </View>
              )}
              {/* day 3 */}
              {consData?.days2 && (
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      border: "1px solid black",
                      borderLeft: 0,
                      borderTop: 0,
                      width: "50%",
                      padding: 1,
                    }}
                  >
                    {consData?.days2}
                  </Text>
                  <Text
                    style={{
                      border: "1px solid black",
                      borderLeft: 0,
                      borderTop: 0,
                      width: "50%",
                      padding: 1,
                    }}
                  >
                    {consData?.timing2}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    ));
  const Header = () => (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Image src={logo} style={styles.Image} />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 10 }}>Consultant Weekly Schedule</Text>
        <Text style={{ fontSize: 10 }}>021 3878 4012-16</Text>
      </View>
    </View>
  );

  const MyPage = () => (
    <Page style={styles.page}>
      <View fixed>
        <Header />
        <Text>
          ________________________________________________________________________
        </Text>
      </View>
      <View style={styles.columns}>
        <View style={styles.column}>{renderList(firstColumn)}</View>
        <View style={styles.column}>{renderList(secondColumn)}</View>
      </View>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
        fixed
      />
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
    marginBottom: 30, // Ensure space for page number
  },
  column: {
    width: "50%",
    padding: 5,
  },
  text: {
    fontSize: 6,
  },
  pageNumber: {
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 15,
    textAlign: "right",
    fontSize: 6,
  },
  Image: {
    width: 300,
    height: 50,
  },
});

export default PageBreak2PDF;
