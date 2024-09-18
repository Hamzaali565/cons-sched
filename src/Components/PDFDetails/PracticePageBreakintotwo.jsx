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

const PracticePageBreakintotwo = ({ data }) => {
  const half = Math.ceil(data.length / 2);
  const firstColumn = data.slice(0, half);
  const secondColumn = data.slice(half);

  const renderList = (items) =>
    items.map((item, index) => (
      <View
        key={index}
        style={{ border: "1px solid black", marginTop: 8 }}
        wrap={false}
      >
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
          <Text style={[styles.text, { fontSize: 10 }]}>
            {item[0].speciality}
          </Text>
        </View>
        {item.map((consData, idx) => (
          <View key={idx}>
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
                  fontSize: 6,
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
                    fontSize: 6,
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
                    fontSize: 6,
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
    marginBottom: 20, // Ensure space for page number
  },
  column: {
    width: "48%",
    padding: 5,
  },
  text: {
    fontSize: 6,
  },
  pageNumber: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
  },
  Image: {
    width: 300,
    height: 60,
  },
});

export default PracticePageBreakintotwo;
