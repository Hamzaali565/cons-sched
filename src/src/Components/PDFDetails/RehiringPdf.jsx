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

// BulletPoint component
const BulletPoint = ({ text, myStyle }) => (
  <View style={[styles.bulletPoint, myStyle]}>
    <Text style={styles.bullet}></Text>
    <Text>{text}</Text>
  </View>
);
const Heading = ({ text }) => (
  <Text
    style={{
      fontSize: 12,
      marginTop: 15,
      fontFamily: "Roboto",
      textDecoration: "underline",
      fontWeight: "bold",
    }}
  >
    {text}
  </Text>
);

const RehiringPdf = () => {
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
    </Page>
  );

  return (
    <Document>
      <MyPage>
        <View style={styles.headC1}>
          <Text>EMPLOYEE REHIRE FORM</Text>
        </View>
        {/* <Heading text={"Last Employement Information:"} /> */}
        <View
          style={{
            border: "1px solid black",
            marginTop: 10,
            paddingBottom: 10,
          }}
        >
          <View style={[styles.headC1, { marginTop: 0, fontSize: 12 }]}>
            <Text>Last Employement Information:</Text>
          </View>

          {/* Bullet points section */}
          <View
            style={[
              styles.bulletPointsContainer,
              {
                padding: "6",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              },
            ]}
          >
            <BulletPoint text="Full Name: ______________________________" />
            <BulletPoint text="Previous Employee ID: ___________________________" />
          </View>
          <View
            style={[
              styles.bulletPointsContainer,
              {
                padding: "4",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <BulletPoint text="Department (Previous): _____________________" />
            <BulletPoint text="Job Title (Previous): _____________________________" />
          </View>
          <View
            style={[
              styles.bulletPointsContainer,
              {
                padding: "4",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <BulletPoint text="Original Hire Date: _________________________" />
            <BulletPoint text="Separation Date: _______________________________" />
          </View>
          <View
            style={[
              styles.bulletPointsContainer,
              {
                padding: "4",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <BulletPoint text="Reason of Separation: ______________________" />
            <BulletPoint text="Last Salary Drawn: _____________________________" />
          </View>
        </View>

        {/* New Emp Detail */}
        <View
          style={{
            border: "1px solid black",
            marginTop: 10,
            paddingBottom: 10,
          }}
        >
          <View style={[styles.headC1, { marginTop: 0, fontSize: 12 }]}>
            <Text>New Employment Details:</Text>
          </View>

          {/* Bullet points section */}
          <View
            style={[
              styles.bulletPointsContainer,
              {
                padding: "4",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <BulletPoint text="Rehire Date: ______________________________" />
            <BulletPoint text="New Job Title: ____________________________" />
          </View>
          <View
            style={[
              styles.bulletPointsContainer,
              {
                padding: "4",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <BulletPoint text="New Department: __________________________" />
            <BulletPoint text="Supervisor: _______________________________" />
          </View>
          <View
            style={[
              styles.bulletPointsContainer,
              {
                padding: "4",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <BulletPoint text="Work Location: ____________________________" />
            <View style={{ flexDirection: "row", width: "50%" }}>
              <BulletPoint text="Employement Status: " />
              <View
                style={{
                  //   width: "",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    height: 15,
                    width: 15,
                    border: "1px solid black",
                  }}
                />
                <Text style={{ fontSize: 10, marginLeft: 4 }}>Full Time</Text>
                <Text style={{ fontSize: 15, marginLeft: 4 }}>/</Text>
                <Text
                  style={{
                    height: 15,
                    width: 15,
                    border: "1px solid black",
                    marginLeft: 4,
                  }}
                />
                <Text style={{ fontSize: 10, marginLeft: 4 }}>Part Time</Text>
              </View>
            </View>
          </View>
        </View>
        {/* Contact */}
        <View
          style={{
            border: "1px solid black",
            marginTop: 10,
            paddingBottom: 10,
          }}
        >
          <View style={[styles.headC1, { marginTop: 0, fontSize: 12 }]}>
            <Text>Contact Information:</Text>
          </View>

          {/* Bullet points section */}
          <View
            style={[
              styles.bulletPointsContainer,
              {
                padding: "4",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <BulletPoint
              myStyle={{ width: "60%" }}
              text="Current Address: ______________________________________"
            />
            <BulletPoint text="Phone Number: ___________________________" />
          </View>
          <View
            style={[
              styles.bulletPointsContainer,
              {
                padding: "4",
                flexDirection: "row",
                justifyContent: "center",
              },
            ]}
          >
            <BulletPoint text="Email Address: ______________________________" />
          </View>
        </View>
        {/* {payrol info} */}
        <View
          style={{
            border: "1px solid black",
            marginTop: 10,
            paddingBottom: 10,
          }}
        >
          <View style={[styles.headC1, { marginTop: 0, fontSize: 12 }]}>
            <Text>Payroll Information:</Text>
          </View>

          {/* Bullet points section */}
          <View
            style={[
              styles.bulletPointsContainer,
              {
                padding: "4",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <BulletPoint text="Pay Rate: _______________________________" />
            <BulletPoint text="Pay Schedule (Weekly, Bi-Weekly, Monthly): _____________" />
          </View>
        </View>
        {/* Reason */}
        <View
          style={{
            border: "1px solid black",
            marginTop: 10,
            paddingBottom: 10,
          }}
        >
          <View style={[styles.headC1, { marginTop: 0, fontSize: 12 }]}>
            <Text>Reason For Hiring:</Text>
          </View>

          {/* Bullet points section */}
          <View
            style={[
              styles.bulletPointsContainer,
              {
                padding: "4",
                flexDirection: "row",
                justifyContent: "center",
              },
            ]}
          >
            <BulletPoint
              myStyle={{ width: "60%" }}
              text="Reason for Rehire: _____________________________________"
            />
          </View>
        </View>
        {/* Recommed from prev HOD */}
        <View
          style={{
            border: "1px solid black",
            marginTop: 10,
            paddingBottom: 5,
          }}
        >
          <View style={[styles.headC1, { marginTop: 0, fontSize: 12 }]}>
            <Text>Recommendation from Previous HOD/Incharge:</Text>
          </View>

          {/* Bullet points section */}
          <View
            style={{
              //   marginTop: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                height: 15,
                width: 15,
                border: "1px solid black",
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: 10 }}>YES</Text>
            <Text style={{ fontSize: 20, marginLeft: 10 }}>/</Text>
            <Text
              style={{
                height: 15,
                width: 15,
                border: "1px solid black",
                marginLeft: 10,
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: 10 }}>NO</Text>
          </View>
        </View>
        {/* HOD FEEDBACK */}
        <View
          style={{
            border: "1px solid black",
            marginTop: 10,
            paddingBottom: 5,
          }}
        >
          <View style={[styles.headC1, { marginTop: 0, fontSize: 12 }]}>
            <Text>HOD / Incharge Feedback:</Text>
          </View>
          <Text style={{ fontSize: 10, padding: "4", margin: 2 }}>
            How would you rate the employee's overall performance during their
            previous tenure?
          </Text>
          {/* Bullet points section */}
          <View
            style={{
              //   marginTop: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                height: 15,
                width: 15,
                border: "1px solid black",
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: 10 }}>Excellent</Text>
            <Text style={{ fontSize: 20, marginLeft: 10 }}>/</Text>
            <Text
              style={{
                height: 15,
                width: 15,
                border: "1px solid black",
                marginLeft: 10,
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: 10 }}>Good</Text>
            <Text style={{ fontSize: 20, marginLeft: 10 }}>/</Text>
            <Text
              style={{
                height: 15,
                width: 15,
                border: "1px solid black",
                marginLeft: 10,
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: 10 }}>Satisfactory</Text>
            <Text style={{ fontSize: 20, marginLeft: 10 }}>/</Text>
            <Text
              style={{
                height: 15,
                width: 15,
                border: "1px solid black",
                marginLeft: 10,
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: 10 }}>
              Need Improvement
            </Text>
            <Text style={{ fontSize: 20, marginLeft: 10 }}>/</Text>
            <Text
              style={{
                height: 15,
                width: 15,
                border: "1px solid black",
                marginLeft: 10,
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: 10 }}>Poor</Text>
          </View>
        </View>
        {/* HR & MANGERS APPROVAL */}
        <View
          style={{
            border: "1px solid black",
            marginTop: 10,
            paddingBottom: 10,
          }}
        >
          <View style={[styles.headC1, { marginTop: 0, fontSize: 12 }]}>
            <Text>HR & Manager Approval:</Text>
          </View>

          {/* Bullet points section */}
          <View
            style={[
              styles.bulletPointsContainer,
              {
                padding: "4",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              },
            ]}
          >
            <BulletPoint text="HR Manager Name: __________________________" />
            <BulletPoint text="HR Signature: _______________________________" />
          </View>
          <View
            style={[
              styles.bulletPointsContainer,
              {
                padding: "4",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <BulletPoint text="Date: ______________________________________" />
            <BulletPoint text="Incharge Name: ______________________________" />
          </View>
          <View
            style={[
              styles.bulletPointsContainer,
              {
                padding: "4",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <BulletPoint text="Incharge Signature: ___________________________" />

            <BulletPoint text="Date: ______________________________________" />
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
    height: 50,
    marginTop: 3,
    width: 300,
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
    fontSize: 10,
  },
  footer: {
    left: 8,
    right: 0,
    bottom: 30,
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "black",
  },
  headC1: {
    border: "1px solid #858585",
    color: "white",
    backgroundColor: "#858585",
    textAlign: "center",
    padding: 2,
    marginTop: 10,
  },
  bulletPointsContainer: {
    // marginTop: 5,
  },
  bulletPoint: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 2,
    fontSize: 10,
    textAlign: "left",
    width: "50%",
  },
  bullet: {
    marginRight: 5,
  },
});

export default RehiringPdf;
